const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../modal/Admin")
const Order = require("../modal/Order")
const HotelDash = require("../modal/HotelDash")
// const Hotel = require("../modal/Hotel")


exports.adminRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)

    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "Admin register success" })

})
exports.adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await Admin.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Fount" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }
    const Token = jwt.sign({ userID: result._id }, process.env.JWT_KEY)
    res.cookie("admin", Token, { httpOnly: true })

    res.status(201).json({ message: "Admin login success", result })
})

exports.adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})


exports.getAllAdminOrders = asyncHandler(async (req, res) => {
    const result = await Order.find().populate("products")
    res.status(201).json({ message: "Admin Orders fetch success", result })
})
exports.getAllHotels = asyncHandler(async (req, res) => {
    const result = await HotelDash.find()
    res.status(201).json({ message: "getAllHotels fetch success", result })
})
exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await Admin.find()
    res.status(201).json({ message: "getAllUsers fetch success", result })
})

exports.activateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Admin.findByIdAndUpdate(id, { ...req.body, isactive: true })
    res.status(201).json({ message: "activateUser success" })
})
exports.deactivateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Admin.findByIdAndUpdate(id, { ...req.body, isactive: false })
    res.status(201).json({ message: "deactivateUser success" })
})


