const { verify } = require("jsonwebtoken");
const ErrorClass = require("../utilts/ErrorClass")
// const userStatus = require("../utilts/userStatus")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return next(new ErrorClass("Avtorizatsiyadan o`ting", 401))
    }
    const token = authHeader.slice(7)
    const user = verify(token, process.env.JWT_SECRET)
    if (!user) {
        return next(new ErrorClass("Avtorizatsiyadan o`ting", 401))
    }
    console.log(user)
    req.user = user
    next()
}