const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let des = "upload"
        console.log(des);
        cb(null, des)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        console.log(fn);
        cb(null, fn)
    }
})

exports.upload = multer({ storage: profileStorage }).single("hero")