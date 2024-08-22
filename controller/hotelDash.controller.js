const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const HotelDash = require("../modal/HotelDash")
const { upload } = require("../utils/uploads")


exports.hotelRegister = asyncHandler(async (req, res) => {

    upload(req, res, async err => {
        const { name, email, password, hero } = req.body
        const hash = await bcrypt.hash(password, 10)
        if (err) {
            res.status(400).json({ message: "unable to upload iamge" })
        }
        console.log(req.file.filename);

        await HotelDash.create({ ...req.body, password: hash, hero: req.file.filename })
        res.status(201).json({ message: "Hotels create success" })
    })


    // await HotelDash.create({ ...req.body, password: hash })
    // res.json({ message: "hotel register success" })

})
exports.hotelLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await HotelDash.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Fount" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }
    const Token = jwt.sign({ userID: result._id }, process.env.JWT_KEY)
    res.cookie("hotel", Token, { httpOnly: true })

    res.status(201).json({ message: "hotel login success", result })
})

exports.hotelLogout = asyncHandler(async (req, res) => {
    res.clearCookie("hotel")
    res.json({ message: "hotel Logout Success" })
})


exports.getAllHotel = asyncHandler(async (req, res) => {
    const result = await HotelDash.find()
    res.status(201).json({ message: "product fetch success", result })

})

exports.addHotels = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "unable to upload iamge" })
        }
        console.log(req.user);

        await Hotel.create({ ...req.body, hero: req.file.filename })
        res.status(201).json({ message: "Hotels create success" })
    })
})