import 'dotenv/config';
import { initDatabase } from './database/index.js';
import Server from './models/Server.js';

const bootstrap = async () => {
    // Diagnóstico rápido de variables críticas al arrancar
    console.log('[CONFIG] NODE_ENV       :', process.env.NODE_ENV || '(no definido)');
    console.log('[CONFIG] DATABASE_URL   :', process.env.DATABASE_URL ? '✓ definida' : '✗ NO DEFINIDA');
    console.log('[CONFIG] JWT_SECRET     :', process.env.JWT_SECRET  ? '✓ definida' : '✗ NO DEFINIDA');
    console.log('[CONFIG] PORT           :', process.env.PORT || 3000);

    try {
        await initDatabase();

        const server = new Server();
        server.listen();
    } catch (err) {
        console.error('[FATAL] No se pudo iniciar la aplicación:', err.message);
        console.error('[FATAL] Stack:', err.stack);
        process.exit(1);
    }
};

bootstrap();
