const asyncHandler = require("express-async-handler")
const fs = require("fs")
const path = require("path")
const { upload } = require("../utils/uploads")
const Products = require("../modal/Products")


exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Products.find()
    res.status(201).json({ message: "product fetch success", result })

})

exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Products.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    console.log(product);
    res.status(200).json(product);
})

exports.addProducts = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "unable to upload iamge" })
        }
        console.log(req.user);

        await Products.create({ ...req.body, hero: req.file.filename, hotel: req.user })
        // await Products.create({ ...req.body, hero: req.file.filename, hotel: req.user })
        res.status(201).json({ message: "blog create success" })
    })
})
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