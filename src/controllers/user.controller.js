const jsonResponse = require("../libs/jsonResponse")

const getUser = (req, res) => {
    res.status(200).json(jsonResponse(200, req.user))
}

module.exports = getUser;