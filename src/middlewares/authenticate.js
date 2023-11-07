<<<<<<< HEAD
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const verifyToken = require("../auth/verifyToken");
=======
const jsonResponse = require("../libs/jsonResponse")
const getTokenFromHeader = require("../auth/getTokenFromHeader")
const { verifyAccessToken } = require("../auth/verifyToken")
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979

const authenticate = (requireAuth = true) => (req, res, next) => {

    if(!requireAuth) {
        next();
        return;
    }

    const token = getTokenFromHeader(req.headers);

    if (token) {
<<<<<<< HEAD
        const decoded = verifyToken(token);
        if (decoded) {
            req.user = { ...decoded };
            next();
        } else {
            res.status(401).json({
                message: 'No autorizado'
            })
        }
    } else {
        res.status(401).json({
            message: 'No autorizado'
        })
    }
}


module.exports = authenticate;
=======
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
>>>>>>> 20f8501567e5ef4831e3dd523beb31fd07f5e979
