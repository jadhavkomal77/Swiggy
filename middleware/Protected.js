const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


exports.hotelProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.hotel
    console.log(req.cookies.hotel);

    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    // decode= jwt sing object
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT Eoror" })
        }
        req.body.userId = decode.userID
        req.user = decode.userID
        next()
    })
})
exports.userProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.user
    console.log(req.cookies.user);

    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    // decode= jwt sing object
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT Eoror" })
        }
        req.body.userId = decode.userID
        req.user = decode.userID
        next()
    })
})
exports.adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.admin
    console.log(req.cookies.admin);

    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }
    // decode= jwt sing object
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT Eoror" })
        }
        req.body.userId = decode.userId
        req.user = decode.userId
        next()
    })
})
// exports.hotelProtected = asyncHandler(async (req, res, next) => {
//     const token = req.cookies.admin
//     console.log(req.cookies.admin);

//     if (!token) {
//         return res.status(401).json({ message: "No Cookie Found" })
//     }
//     // decode= jwt sing object
//     jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
//         if (err) {
//             return res.status(401).json({ message: err.message || "JWT Eoror" })
//         }
//         req.body.userId = decode.userId
//         req.user = decode.userId
//         next()
//     })
// })


