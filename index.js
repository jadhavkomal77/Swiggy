const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieparser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cookieparser())
app.use(express.static(path.join(__dirname, "dist")))
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.static("upload"))


app.use("/api/admin", require("./routes/admin.route"))
app.use("/api/user", require("./routes/user.route"))
app.use("/api/product", require("./routes/product.route"))
app.use("/api/order", require("./routes/order.route"))
app.use("/api/hotelDash", require("./routes/hotelDash.route"))


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "Resource Not Found" });
});
app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).json({ message: err.message || "Something Went Wrong" });
});

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, () => {
        console.log(`SERVER RUNNING on port ${process.env.PORT}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.error("MONGO CONNECTION ERROR:", err);
});
