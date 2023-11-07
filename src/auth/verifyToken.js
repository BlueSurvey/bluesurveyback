const jwt = require('jsonwebtoken');

<<<<<<< HEAD
const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = verifyToken
=======
const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { verifyAccessToken, verifyRefreshToken }
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
