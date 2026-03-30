export const sendSuccess = ({
    res,
    statusCode = 200,
    message    = 'Operación exitosa',
    data       = null,
    meta       = undefined,
    location   = undefined
}) => {
    if (location) res.location(location);

    const payload = { status: 'success', code: statusCode, message };
    if (data !== null)      payload.data = data;
    if (meta !== undefined) payload.meta = meta;

    return res.status(statusCode).json(payload);
};

export const sendError = ({
    res,
    statusCode = 500,
    message    = 'Ocurrió un error en el servidor',
    details    = undefined
}) => {
    const payload = { status: 'error', code: statusCode, message };
    if (details !== undefined && details !== null) payload.details = details;

    return res.status(statusCode).json(payload);
};
