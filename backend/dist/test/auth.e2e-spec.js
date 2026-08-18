"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
describe('Auth + Isolamento entre usuários (e2e)', () => {
    let app;
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({ imports: [app_module_1.AppModule] }).compile();
        app = moduleRef.createNestApplication();
        app.setGlobalPrefix('api');
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    const unique = () => `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    it('registra, autentica e usa o refresh token (rotação)', async () => {
        const email = `${unique()}@test.com`;
        const register = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/register').send({
            name: 'Teste',
            email,
            password: 'senha123',
        });
        expect(register.status).toBe(201);
        expect(register.body.success).toBe(true);
        expect(register.body.data.tokens.accessToken).toBeDefined();
        const refreshToken = register.body.data.tokens.refreshToken;
        const me = await (0, supertest_1.default)(app.getHttpServer())
            .get('/api/users/me')
            .set('Authorization', `Bearer ${register.body.data.tokens.accessToken}`);
        expect(me.status).toBe(200);
        expect(me.body.data.email).toBe(email);
        const rotated = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/auth/refresh')
            .send({ refreshToken });
        expect(rotated.status).toBe(200);
        expect(rotated.body.data.tokens.refreshToken).toBeDefined();
        expect(rotated.body.data.tokens.refreshToken).not.toBe(refreshToken);
        const replayed = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/refresh').send({ refreshToken });
        expect(replayed.status).toBe(401);
    });
    it('rejeita credenciais inválidas e protege contra enumeração', async () => {
        const login = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/login').send({
            email: 'nao_existe@test.com',
            password: 'qualquer',
        });
        expect(login.status).toBe(401);
        expect(login.body.success).toBe(false);
        expect(login.body.error.code).toBe('INVALID_CREDENTIALS');
    });
    it('valida DTOs (whitelist + erros consistentes)', async () => {
        const res = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/register').send({
            name: 'X',
            email: 'email_invalido',
            password: 'curta',
            campoSecreto: true,
        });
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
    it('um usuário nunca acessa dados de outro usuário', async () => {
        const emailA = `${unique()}@test.com`;
        const emailB = `${unique()}@test.com`;
        const a = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/register').send({
            name: 'Usuário A', email: emailA, password: 'senha123',
        });
        const b = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/register').send({
            name: 'Usuário B', email: emailB, password: 'senha123',
        });
        const tokenA = a.body.data.tokens.accessToken;
        const tokenB = b.body.data.tokens.accessToken;
        const accountB = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/accounts')
            .set('Authorization', `Bearer ${tokenB}`)
            .send({ name: 'Conta do B', type: 'CHECKING', initialBalance: 1000 });
        expect(accountB.status).toBe(201);
        const accountBId = accountB.body.data.id;
        const access = await (0, supertest_1.default)(app.getHttpServer())
            .get(`/api/accounts/${accountBId}`)
            .set('Authorization', `Bearer ${tokenA}`);
        expect(access.status).toBe(404);
        const tx = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/transactions')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({ accountId: accountBId, type: 'INCOME', amount: 500, description: 'invasão' });
        expect(tx.status).toBe(404);
        const listA = await (0, supertest_1.default)(app.getHttpServer())
            .get('/api/accounts')
            .set('Authorization', `Bearer ${tokenA}`);
        expect(listA.status).toBe(200);
        expect(listA.body.data.length).toBe(0);
    });
    it('transações são idempotentes com Idempotency-Key', async () => {
        const email = `${unique()}@test.com`;
        const reg = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/register').send({
            name: 'Idemp', email, password: 'senha123',
        });
        const token = reg.body.data.tokens.accessToken;
        const account = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/accounts')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Corrente', initialBalance: 0 });
        const accountId = account.body.data.id;
        const payload = { accountId, type: 'INCOME', amount: 100, description: 'Salário' };
        const first = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .set('Idempotency-Key', 'key-unica-123')
            .send(payload);
        const second = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .set('Idempotency-Key', 'key-unica-123')
            .send(payload);
        expect(first.status).toBe(201);
        expect(second.status).toBe(201);
        expect(second.body.data.transaction.id).toBe(first.body.data.transaction.id);
        expect(second.body.data.duplicated).toBe(true);
        const me = await (0, supertest_1.default)(app.getHttpServer())
            .get(`/api/accounts/${accountId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(me.body.data.currentBalance).toBe('100');
    });
    it('reverte o saldo ao cancelar uma transação', async () => {
        const email = `${unique()}@test.com`;
        const reg = await (0, supertest_1.default)(app.getHttpServer()).post('/api/auth/register').send({
            name: 'Cancel', email, password: 'senha123',
        });
        const token = reg.body.data.tokens.accessToken;
        const account = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/accounts')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Corrente', initialBalance: 1000 });
        const accountId = account.body.data.id;
        const tx = await (0, supertest_1.default)(app.getHttpServer())
            .post('/api/transactions')
            .set('Authorization', `Bearer ${token}`)
            .send({ accountId, type: 'EXPENSE', amount: 250, description: 'Mercado' });
        const txId = tx.body.data.transaction.id;
        await (0, supertest_1.default)(app.getHttpServer())
            .delete(`/api/transactions/${txId}`)
            .set('Authorization', `Bearer ${token}`);
        const me = await (0, supertest_1.default)(app.getHttpServer())
            .get(`/api/accounts/${accountId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(me.body.data.currentBalance).toBe('1000');
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map