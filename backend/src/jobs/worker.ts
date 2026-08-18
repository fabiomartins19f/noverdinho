import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { JobsModule } from './jobs.module';

/**
 * Worker standalone para processar filas BullMQ em um processo separado.
 * Uso: npm run start:worker
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(JobsModule, {
    logger: ['log', 'warn', 'error'],
  });
  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

void bootstrap();