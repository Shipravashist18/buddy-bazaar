const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const upload = require("../middleware/upload");


// CREATE PRODUCT

router.post("/", upload.single("image"), async(req,res)=>{

    console.log(req.body);
    console.log(req.file);
    try{

        const newProduct = new Product({

            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            description:req.body.description,
            image:`http://localhost:5000/uploads/${req.file.filename}`,
            createdAt:new Date().toDateString()

        });

        await newProduct.save();

        res.status(201).json(newProduct);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


// GET ALL PRODUCTS

router.get("/", async(req,res)=>{

    try{

        const products = await Product.find();

        res.json(products);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

module.exports = router;