require('dotenv').config
const jwt = require('jsonwebtoken')
exports.verifyToken = (req, res, next) => {
const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
        }
        req.user = decoded.user;
        next()
    })
}  