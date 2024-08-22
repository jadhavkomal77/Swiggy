const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: {
        type: [mongoose.Types.ObjectId],
        ref: "product",
        required: true
    },
    status: {
        type: String,
        enum: ["placed", "cancel", "deliverd"], default: "placed"
        // required: true
    },
}, { timestamps: true });


module.exports = mongoose.model("order", orderSchema);


// ALL USER
// ALL USERS ORDERS