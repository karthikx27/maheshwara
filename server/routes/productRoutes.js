const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/add", async (req, res) => {
    try {

        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image
        });

        res.status(201).json({
            message: "Product Added Successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.delete("/:id", async (req, res) => {

    try {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.put("/:id", async (req, res) => {

    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Product Updated Successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.get("/test", (req, res) => {
    res.send("Products Route Working");
});
module.exports = router;    