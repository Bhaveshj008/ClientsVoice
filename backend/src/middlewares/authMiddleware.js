const jwt = require('jsonwebtoken');


exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token format
    if (!token) return res.status(403).send("A token is required for authentication");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.client = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token",err.message);
    }
    return next();
};
