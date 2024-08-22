const { placeOrder } = require("../controller/order.controller")

const router = require("express").Router()

router

    .post("/order", placeOrder)

module.exports = router