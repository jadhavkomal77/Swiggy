const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../modal/User")

exports.userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)

    await User.create({ ...req.body, password: hash })
    res.json({ message: "user register success" })

})
exports.userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Fount" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }
    const Token = jwt.sign({ userID: result._id }, process.env.JWT_KEY)
    res.cookie("User", Token, { httpOnly: true })

    res.status(201).json({ message: "user login success", result })
})

exports.userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("User")
    res.json({ message: "user Logout Success" })
})




