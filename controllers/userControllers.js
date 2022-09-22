const UserModel = require("../models/User")
const asyncError = require("../utilts/asyncError")
const ErrorClass = require("../utilts/ErrorClass")

exports.allUsers = asyncError(async(req,res,next)=>{
    const allUsers = await UserModel.findAndCountAll({attributes: ["email", "status", "name", "lastLoginTime", "createdAt", "updatedAt"]})

    res.status(200).json({
        status: "succesfull",
        message: "Barcha userlar ro`yhati",
        error: null,
        content: allUsers.rows,
        usersCount: allUsers.count
    })
})


exports.updateStatusUser = asyncError(async(req,res,next)=>{
    const {id} = req.params
    const {status} = req.body
    const userById = await UserModel.findByPk(id)
    if(!userById){
        return next(new ErrorClass(`${id} ID li user tizimda topilmadi`, 404))
    }
    userById.status = status
    await userById.save()
    

    res.status(203).json({
        status: "succesfull",
        message: "foydalanuvchi statusi o`zgardi",
        error: null,
        content: null
    })
    
})

    exports.deleteUsers = asyncError(async(req,res,next)=>{
        const {id} = req.params
        const userById = await UserModel.findByPk(id)
        if(!userById){
            return next(new ErrorClass(`${id} ID li user tizimda topilmadi`, 404))
        }
    
        await userById.destroy()
        
        res.status(202).json({
            status: "succesfull",
            message: `foydalanuvchi tizimdan o\`chirildi`,
            error: null,
            content: null
        })
    
    })