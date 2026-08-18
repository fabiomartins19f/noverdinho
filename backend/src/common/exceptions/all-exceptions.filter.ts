import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<{ method: string; url: string; user?: { id?: string } }>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let payload: { code: string; message: string; details?: unknown } = {
      code: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor.',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'object' && res !== null && 'code' in res) {
        payload = res as typeof payload;
      } else if (typeof res === 'string') {
        payload = { code: 'HTTP_ERROR', message: res };
      } else {
        const body = res as { message?: string | string[]; error?: string };
        payload = {
          code: 'VALIDATION_ERROR',
          message: Array.isArray(body.message) ? body.message.join('; ') : body.message ?? body.error ?? 'Requisição inválida.',
          details: body.message,
        };
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        payload = { code: 'DUPLICATE_RECORD', message: 'Registro duplicado.' };
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        payload = { code: 'NOT_FOUND', message: 'Registro não encontrado.' };
      } else {
        status = HttpStatus.BAD_REQUEST;
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
    } else {
      this.logger.warn(`${request.method} ${request.url} -> ${status} ${payload.code} (user=${request.user?.id ?? 'anon'})`);
    }

    response.status(status).json({
      success: false,
      error: payload,
    });
  }
}
