import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

/**
 * Middleware para rutas web del admin.
 * Lee el JWT desde la cookie httpOnly 'admin_token'.
 * Si no está autenticado, redirige al login.
 */
export const requireAdminAuth = (req, res, next) => {
    const token = req.cookies?.admin_token;

    if (!token) {
        return res.redirect('/admin/login?error=Debes+iniciar+sesión');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminUser = decoded;
        return next();
    } catch {
        res.clearCookie('admin_token');
        return res.redirect('/admin/login?error=Sesión+expirada,+inicia+sesión+nuevamente');
    }
};

/**
 * Middleware para rutas de la API REST.
 * Lee el JWT desde el header Authorization: Bearer <token>.
 */
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Token no proporcionado. Usa Authorization: Bearer <token>.'));
    }

    const token = authHeader.slice(7).trim();

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch {
        return next(new ApiError(401, 'Token inválido o expirado.'));
    }
};
