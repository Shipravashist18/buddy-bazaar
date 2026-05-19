require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});

app.use("/api/products", productRoutes);

app.get("/", (req,res)=>{
    res.send("API Running");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});