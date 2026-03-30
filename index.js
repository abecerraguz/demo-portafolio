import 'dotenv/config';
import { initDatabase } from './database/index.js';
import Server from './models/Server.js';

const bootstrap = async () => {
    try {
        await initDatabase();

        const server = new Server();
        server.listen();
    } catch (err) {
        console.error('[FATAL] No se pudo iniciar la aplicación:', err.message);
        process.exit(1);
    }
};

bootstrap();
