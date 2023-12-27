require('dotenv').config
const jwt = require('jsonwebtoken')
const Tokens = require('../models/tokenModel.js')

exports.verifyToken = async (req, res, next) => {
const token = req.headers.authorization
const tokenInformation = await Tokens.findOne({ where: { token } })
    if (!token || tokenInformation) {
        res.status(401).json({ 
            message: 'Unauthorized: No token provided' 
        })
        return
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ 
                message: 'Unauthorized: Invalid token' 
            })
            return
        }
        req.user = decoded.user;
        next()
    })
}  