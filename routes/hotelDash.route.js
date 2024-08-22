const { hotelRegister, hotelLogin, hotelLogout, getAllHotel, addHotels } = require("../controller/hotelDash.controller")

const router = require("express").Router()

router
    .post("/hotelregister", hotelRegister)
    .post("/hotellogin", hotelLogin)
    .post("/hotellogout", hotelLogout)

    .get("/hotel", getAllHotel)
    .post("/addhotel", addHotels)
module.exports = router


