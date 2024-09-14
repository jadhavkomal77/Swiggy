const asyncHandler = require("express-async-handler")
const fs = require("fs")
const path = require("path")
const { upload } = require("../utils/uploads")
const Products = require("../modal/Products")
const cloudinary = require("../utils/cloudinary.confing")

exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Products.find()
    res.status(201).json({ message: "product fetch success", result })

})

exports.getProductById = asyncHandler(async (req, res) => {
    console.log("iddd", req.params.id);

    const product = await Products.findById(req.params.id);
    console.log(product);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
})
exports.addProducts = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload Error" })
        }

        if (req.file.hero) {
            return res.status(400).json({ message: "Hero Image Is Required" })
        }

        // console.log(req.file.path)
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        await Products.create({ ...req.body, hero: secure_url, hotel: req.user })
        res.json({ message: "hotel dash Add Success" })
    })
})

// exports.addProducts = asyncHandler(async (req, res) => {
//     upload(req, res, async err => {
//         if (err) {
//             res.status(400).json({ message: "unable to upload iamge" })
//         }
//         console.log(req.user);

//         await Products.create({ ...req.body, hero: req.file.filename, hotel: req.user })
//         // await Products.create({ ...req.body, hero: req.file.filename, hotel: req.user })
//         res.status(201).json({ message: "blog create success" })
//     })
// })

exports.updateProducts = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "unable to upload image" })
        }
        const { blogId } = req.params
        if (req.body.remove) {
            fs.unlinkSync(path.join(__dirname, "..", "uploads", req.body.remove))
            await Blog.findByIdAndUpdate(blogId, ({ ...req.body, hero: req.file.filename }))
            res.status(200).json({ message: "blog create success" })
        } else {
            await Blog.findByIdAndUpdate(blogId, req.body)
            res.status(200).json({ message: "blog update success" })
        }
    })
})
exports.deleteProducts = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Products.findById(id)
    let d = path.join(__dirname, "..", "uploads", result.hero)
    console.log(d)
    fs.unlinkSync(d)
    await Products.findByIdAndDelete(id)
    res.status(200).json({ message: "blog delete success" })
})
exports.getHotelMenu = asyncHandler(async (req, res) => {
    console.warn(req.params.hid);

    const result = await Products.find({ hotel: req.params.hid })
    console.log(result);

    res.status(200).json({ message: "menu fetch success", result })
})