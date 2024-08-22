const router = require("express").Router()

const adminController = require("../controller/admin.controller")

router

    .post("/register", adminController.adminRegister)
    .post("/login", adminController.adminLogin)
    .post("/logout", adminController.adminLogout)


    .get("/getAllOrders", adminController.getAllAdminOrders)
    .get("/getAllUsers", adminController.getAllUsers)
    .get("/getAllHotels", adminController.getAllHotels)
    .put("/deactivate/:id", adminController.deactivateUser)
    .put("/activate/:id", adminController.activateUser)

module.exports = router