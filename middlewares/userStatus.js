const ErrorClass = require("../utilts/ErrorClass")
const userStatus = require("../utilts/userStatus")
module.exports = (req,res,next)=>{
    const {status} = req.user
    if(status !== userStatus.STATUS_ACTIVE){
        return next(new ErrorClass("tizimga kirishga ruxsat yo`q", 401))
    } 
    next()
}