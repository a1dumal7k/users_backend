const express = require("express")
const errorController = require("./controllers/errorControllers")
const authToken = require("./middlewares/authToken")
const userStatus = require("./middlewares/userStatus")

// ROUTES
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
// ERROR CLASS
const ErrorClass = require("./utilts/ErrorClass")
// CREATE SERVER
const app = express()
// MIDDLEWARES
app.use(express.json())
app.use(require("cors")())

// ROADS
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", authToken ,userStatus ,userRoutes)


// WRONG PATHS
app.all("*", (req,res,next)=>{
    return next(new ErrorClass(`${req.path} bunday yo\`l yo\`q`, 404))
})
// ERROR MIDDLEAWARES
app.use(errorController)


module.exports = app