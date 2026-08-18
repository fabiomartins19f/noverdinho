import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Segurança básica
  app.use(helmet());

  // CORS restrito
  const origins = (config.get<string>('CORS_ORIGINS') ?? '').split(',').map((o) => o.trim()).filter(Boolean);
  app.enableCors({
    origin: origins.length > 0 ? origins : true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key'],
  });

  // API versionada e prefixada
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Validação global: remove campos desconhecidos e transforma tipos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  app.enableShutdownHooks();

  // Swagger / OpenAPI
  const swaggerConfig = new DocumentBuilder()
    .setTitle('No Verdinho API')
    .setDescription(
      'Backend do No Verdinho — gestão financeira pessoal. "Organize. Quite. Evolua."\n\n' +
        'Autenticação: JWT Bearer. Obtenha o token em POST /api/v1/auth/login e envie em Authorization: Bearer <token>.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'No Verdinho — API Docs',
  });

  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port);
  logger.log(`No Verdinho API rodando em http://localhost:${port}/api/v1`);
  logger.log(`Swagger em http://localhost:${port}/api/docs`);
}

void bootstrap();