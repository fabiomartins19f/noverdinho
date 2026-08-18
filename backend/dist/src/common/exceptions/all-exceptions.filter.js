"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
let AllExceptionsFilter = class AllExceptionsFilter {
    logger = new common_1.Logger('Exceptions');
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let payload = {
            code: 'INTERNAL_ERROR',
            message: 'Erro interno do servidor.',
        };
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'object' && res !== null && 'code' in res) {
                payload = res;
            }
            else if (typeof res === 'string') {
                payload = { code: 'HTTP_ERROR', message: res };
            }
            else {
                const body = res;
                payload = {
                    code: 'VALIDATION_ERROR',
                    message: Array.isArray(body.message) ? body.message.join('; ') : body.message ?? body.error ?? 'Requisição inválida.',
                    details: body.message,
                };
            }
        }
        else if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (exception.code === 'P2002') {
                status = common_1.HttpStatus.CONFLICT;
                payload = { code: 'DUPLICATE_RECORD', message: 'Registro duplicado.' };
            }
            else if (exception.code === 'P2025') {
                status = common_1.HttpStatus.NOT_FOUND;
                payload = { code: 'NOT_FOUND', message: 'Registro não encontrado.' };
            }
            else {
                status = common_1.HttpStatus.BAD_REQUEST;
                payload = { code: 'DATABASE_ERROR', message: 'Erro no banco de dados.', details: exception.code };
            }
        }
        const logCtx = {
            status,
            code: payload.code,
            method: request.method,
            url: request.url,
            userId: request.user?.id,
        };
        if (status >= 500) {
            this.logger.error(exception instanceof Error ? exception.stack : String(exception), logCtx);
        }
        else {
            this.logger.warn(`${request.method} ${request.url} -> ${status} ${payload.code} (user=${request.user?.id ?? 'anon'})`);
        }
        response.status(status).json({
            success: false,
            error: payload,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map