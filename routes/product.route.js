const productController = require("../controller/Product.controller")
const { userProtected, hotelProtected } = require("../middleware/Protected")

const router = require("express").Router()

router
    .get("/product", productController.getAllProducts)
    .get("/product-product/:id", productController.getProductById)

    .post("/product-add-product", hotelProtected, productController.addProducts)
    .put("/product-update-product", productController.updateProducts)
    .delete("/product-delete-product", productController.deleteProducts)
    .get("/get-hotel-menu/:hid", productController.getHotelMenu)

module.exports = router



