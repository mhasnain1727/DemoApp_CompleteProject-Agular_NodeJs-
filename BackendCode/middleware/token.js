require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]

    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    req.userId = payload.subject
    req.email = payload.email;

    next()
}

module.exports = verifyToken;