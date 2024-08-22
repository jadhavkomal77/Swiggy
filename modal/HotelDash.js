const mongoose = require("mongoose");

const hotelDashSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        // required: true
    },
    isactive: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        default: "hotel"
    },
    location: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("hoteldash", hotelDashSchema)