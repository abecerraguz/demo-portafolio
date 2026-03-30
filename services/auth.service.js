import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import { User } from '../database/index.js';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET debe estar definido en .env');
}

const JWT_SECRET     = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const loginService = async ({ email, password }) => {
    if (!email || !password) {
        throw new ApiError(400, 'Email y contraseña son obligatorios.');
    }

    const user = await User.findOne({ where: { email: String(email).toLowerCase().trim() } });

    // Siempre evalúa el password aunque el usuario no exista (previene timing attacks)
    const passwordValid = user ? await user.validatePassword(String(password)) : false;

    if (!user || !passwordValid) {
        throw new ApiError(401, 'Credenciales inválidas.');
    }

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return { token, user: payload };
};
