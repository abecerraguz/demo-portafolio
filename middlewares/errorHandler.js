import { sendError } from '../utils/apiResponse.js';

// Exactamente 4 parámetros → Express lo reconoce como error handler
export const errorHandler = (err, req, res, next) => {
    console.error('[ERROR]', err.message || err);

    const statusCode    = err.statusCode || err.status || 500;
    const isServerError = statusCode >= 500;

    // Si la petición espera HTML (admin/portfolio), renderiza la vista de error
    const acceptsHtml = req.accepts('html') && !req.path.startsWith('/api/');
    if (acceptsHtml) {
        return res.status(statusCode).render('error', {
            layout: req.path.startsWith('/admin') ? 'admin' : 'main',
            title: `Error ${statusCode}`,
            statusCode,
            message: isServerError ? 'Error interno del servidor' : err.message
        });
    }

    return sendError({
        res,
        statusCode,
        message: err.message || 'Ocurrió un error en el servidor',
        details: isServerError ? undefined : err.details
    });
};
