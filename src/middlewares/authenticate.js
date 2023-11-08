const jsonResponse = require("../libs/jsonResponse")
const getTokenFromHeader = require("../auth/getTokenFromHeader")
const { verifyAccessToken } = require("../auth/verifyToken")

const authenticate = (requireAuth = true) => (req, res, next) => {

    if(!requireAuth) {
        next();
        return;
    }

    const token = getTokenFromHeader(req.headers);

    if (token) {
        const decoded = verifyAccessToken(token);
        if (decoded) {
            req.user = { ...decoded.user };
            next();
        } else {
            res.status(401).json(jsonResponse(401, { message: "Token no proporcionado" }))
        }
    } else {
        res.status(401).json(jsonResponse(401, { message: "Token no proporcionado" }))
    }
}

module.exports = authenticate;