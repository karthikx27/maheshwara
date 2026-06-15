const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/count", async (req, res) => {
    try {

        const totalCustomers = await User.countDocuments({
            role: "customer"
        });

        res.json({
            totalCustomers
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get("/", async (req, res) => {
    try {

        const customers = await User.find({
            role: "customer"
        }).select("-password");

        res.json(customers);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;