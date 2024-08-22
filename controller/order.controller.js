const Order = require("../modal/Order")
const asyncHandler = require("express-async-handler")

exports.placeOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.status(201).json({ message: "order create success" })
})







