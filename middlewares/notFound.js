import { sendError } from '../utils/apiResponse.js';

export const notFoundHandler = (req, res) => {
    if (req.path.startsWith('/api/')) {
        return sendError({
            res,
            statusCode: 404,
            message: `La ruta ${req.method} ${req.originalUrl} no existe.`
        });
    }
    return res.status(404).render('error', {
        layout: req.path.startsWith('/admin') ? 'admin' : 'main',
        title: 'Página no encontrada',
        statusCode: 404,
        message: 'La página que buscas no existe.'
    });
};
