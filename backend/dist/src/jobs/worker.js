"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const jobs_module_1 = require("./jobs.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(jobs_module_1.JobsModule, {
        logger: ['log', 'warn', 'error'],
    });
    process.on('SIGTERM', async () => {
        await app.close();
        process.exit(0);
    });
}
void bootstrap();
//# sourceMappingURL=worker.js.map