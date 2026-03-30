import { loginService } from '../services/auth.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 horas en ms

// ──────────────────────────────────────────────────────────────────────────────
// Admin Web — Login / Logout (sesión con cookie httpOnly)
// ──────────────────────────────────────────────────────────────────────────────

export const showLoginPage = (req, res) => {
    if (req.cookies?.admin_token) return res.redirect('/admin/dashboard');
    // layout: false porque login.hbs es una página HTML completa independiente
    res.render('admin/login', {
        layout: false,
        title: 'Iniciar sesión — Admin',
        error: req.query.error || null,
        success: req.query.success || null
    });
};

export const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token } = await loginService({ email, password });

        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: COOKIE_MAX_AGE
        });

        return res.redirect('/admin/dashboard');
    } catch (err) {
        if (err.statusCode === 401 || err.statusCode === 400) {
            return res.redirect(`/admin/login?error=${encodeURIComponent(err.message)}`);
        }
        return next(err);
    }
};

export const handleLogout = (req, res) => {
    res.clearCookie('admin_token');
    return res.redirect('/admin/login?success=Sesión+cerrada+correctamente');
};

// ──────────────────────────────────────────────────────────────────────────────
// API REST — Login con JWT en body de respuesta
// ──────────────────────────────────────────────────────────────────────────────

export const apiLogin = async (req, res, next) => {
    try {
        const result = await loginService(req.body);
        return sendSuccess({ res, statusCode: 200, message: 'Sesión iniciada.', data: result });
    } catch (err) {
        return next(err);
    }
};
