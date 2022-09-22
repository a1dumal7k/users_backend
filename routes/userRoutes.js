const router = require("express").Router()
const userControllers = require("../controllers/userControllers")
router
.get("/", userControllers.allUsers)
.patch("/:id/status", userControllers.updateStatusUser)
.delete("/:id", userControllers.deleteUsers)

module.exports = router