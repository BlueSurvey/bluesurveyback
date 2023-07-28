const { generateAccessToken } = require('../auth/generateTokens');
const getTokenFromHeader = require('../auth/getTokenFromHeader');
const { verifyRefreshToken } = require('../auth/verifyToken');
const jsonResponse = require('../libs/jsonResponse');
const Token = require('../models/token');

const refreshToken = async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers);
    if (refreshToken) {
        try {
            const found = await Token.findOne({ token: refreshToken });
            if (!found) {
                return res.status(401).send(jsonResponse(401, { error: "No autorizado" }))
            }
            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);

                return res.status(200).json(jsonResponse(200, { accessToken }));
            } else {
                return res.status(401).send(jsonResponse(401, { error: "No autorizado" }))
            }
        } catch (error) {
            return res.status(401).send(jsonResponse(401, { error: "No autorizado" }))
        }
    } else {
        res.status(401).send(jsonResponse(401, { error: "No autorizado" }))
    }
}

module.exports = refreshToken;