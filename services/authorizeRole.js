export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (allowedRoles.includes(req.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }
    };
};