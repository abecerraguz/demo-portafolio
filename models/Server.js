import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import fileUpload from 'express-fileupload';

import { requestInfo } from '../middlewares/requestInfo.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { notFoundHandler } from '../middlewares/notFound.js';

import portfolioRoutes from '../routes/portfolio.routes.js';
import adminRoutes from '../routes/admin.routes.js';
import apiRoutes from '../routes/api/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR  = path.resolve(__dirname, '..');

class Server {
    constructor() {
        this.app      = express();
        this.port     = Number(process.env.PORT) || 3000;
        this.apiBase  = `/api/v1`;

        this.#configureViewEngine();
        this.#configureMiddlewares();
        this.#configureRoutes();
        this.#configureErrorHandlers();
    }

    #configureViewEngine() {
        this.app.engine('hbs', engine({
            extname: '.hbs',
            defaultLayout: 'main',
            layoutsDir:  path.join(ROOT_DIR, 'views', 'layouts'),
            partialsDir: path.join(ROOT_DIR, 'views', 'partials'),
            helpers: {
                // Comparación de igualdad para {{#if (eq a b)}}
                eq: (a, b) => a === b,
                // Serializa JSON para pasar a scripts inline
                json: (ctx) => JSON.stringify(ctx),
                // Año actual
                currentYear: () => new Date().getFullYear(),
                // Une array con separador
                joinArray: (arr, sep = ', ') => Array.isArray(arr) ? arr.join(sep) : '',
                // Trunca texto
                truncate: (str, len = 120) => {
                    if (!str) return '';
                    return str.length > len ? str.slice(0, len) + '...' : str;
                }
            }
        }));
        this.app.set('view engine', 'hbs');
        this.app.set('views', path.join(ROOT_DIR, 'views'));
    }

    #configureMiddlewares() {
        this.app.disable('x-powered-by');
        this.app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(ROOT_DIR, 'public')));
        // Servir archivos subidos desde /uploads
        this.app.use('/uploads', express.static(path.join(ROOT_DIR, 'public', 'uploads')));
        // Middleware para manejo de subida de archivos
        this.app.use(fileUpload({
            useTempFiles: false,
            limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
            abortOnLimit: true,
            safeFileNames: true,
            preserveExtension: true
        }));
        this.app.use(requestInfo);
    }

    #configureRoutes() {
        this.app.use('/',          portfolioRoutes);
        this.app.use('/admin',     adminRoutes);
        this.app.use(this.apiBase, apiRoutes);
    }

    #configureErrorHandlers() {
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`✓ Servidor corriendo en http://localhost:${this.port}`);
            console.log(`✓ Admin:  http://localhost:${this.port}/admin`);
            console.log(`✓ API:    http://localhost:${this.port}${this.apiBase}`);
        });
    }
}

export default Server;
