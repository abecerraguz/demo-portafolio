export const requestInfo = (req, res, next) => {
    const startedAt = Date.now();
    res.on('finish', () => {
        const ms = Date.now() - startedAt;
        console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms} ms)`);
    });
    next();
};
