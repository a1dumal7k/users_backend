const UserModel = require("../models/User")
const {compare} = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncError = require("../utilts/asyncError")
const ErrorClass = require("../utilts/ErrorClass")
const { Op } = require("sequelize")

    const generatorToken = (payload, JWT_SECRET_CODE, option)=>{
       return new Promise((resolve, rejact)=>{
        jwt.sign(payload, JWT_SECRET_CODE, option, (error, token)=>{
            if(error){
                return rejact(error)
            }else if(token){
                return resolve(token)
            }
        })
       })
    }


exports.register =  asyncError(async(req,res,next)=>{
    const {email} = req.body

    const existedUsername = await UserModel.findOne({where: {email: {[Op.eq]: email}}})
    if(existedUsername){
        return next(new ErrorClass("bunday foydalanuvchi tizmida mavjud", 409))
}
await UserModel.create(req.body)
    res.status(201).json({
        status: "succesfull",
        message: "Foydalanuvchi ro`yhatga olindi",
        error: null,
        content: null
    })
})


exports.login = asyncError(async(req,res,next)=>{
    const {email, password} = req.body
    const existedUser = await UserModel.findOne({where: {email: {[Op.eq]: email}}})
    if(!existedUser){
        return next(new ErrorClass("password yoki email noto`gri kiritilgan", 403))
}


    const correctPassword = await compare(password, existedUser.password)
    if(!correctPassword){
        return next(new ErrorClass("password yoki email noto`gri kiritilgan", 403))
    }

    
    existedUser.lastLoginTime = new Date().toISOString()
    await existedUser.save()
    
    
    
    const token = await generatorToken({
        id: existedUser.id,
        username: existedUser.username,
        lastLoginTime: existedUser.lastLoginTime,
        email: existedUser.email,
        status: existedUser.status
    }, process.env.JWT_SECRET, {
        algorithm: "HS512", expiresIn: "24h"
    })
 

    res.status(203).json({
        status: "succesfull",
        message: "Foydalanuvchi tizimga kirdi",
        content: {
            username: existedUser.username,
            email: existedUser.email
        },
        token
    })
})
