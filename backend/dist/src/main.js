"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: false });
    const config = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('Bootstrap');
    app.use((0, helmet_1.default)());
    const origins = (config.get('CORS_ORIGINS') ?? '').split(',').map((o) => o.trim()).filter(Boolean);
    app.enableCors({
        origin: origins.length > 0 ? origins : true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key'],
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI, defaultVersion: '1' });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: false },
    }));
    app.enableShutdownHooks();
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('No Verdinho API')
        .setDescription('Backend do No Verdinho — gestão financeira pessoal. "Organize. Quite. Evolua."\n\n' +
        'Autenticação: JWT Bearer. Obtenha o token em POST /api/v1/auth/login e envie em Authorization: Bearer <token>.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'No Verdinho — API Docs',
    });
    const port = config.get('PORT') ?? 3000;
    await app.listen(port);
    logger.log(`No Verdinho API rodando em http://localhost:${port}/api/v1`);
    logger.log(`Swagger em http://localhost:${port}/api/docs`);
}
void bootstrap();
//# sourceMappingURL=main.js.map