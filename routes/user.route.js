const router = require("express").Router()

const userController = require("../controller/user.controller")

router
    .post("/user/register", userController.userRegister)
    .post("/user/login", userController.userLogin)
    .post("/user/logout", userController.userLogout)

module.exports = router


