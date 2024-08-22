const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    hotel: {
        type: mongoose.Types.ObjectId,
        ref: "hotel",
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model("product", productSchema);


