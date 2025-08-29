const Coupon = require("../models/Coupon");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ error: "The coupon is already created." });
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error." });
  }
});

// All coupons
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Get by Id
router.get("/:couponId", async (req, res) => {
  const couponId = req.params.couponId;

  try {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Get by Coupon code
router.get("/code/:couponCode", async (req, res) => {
  const couponCode = req.params.couponCode;

  try {
    const coupon = await Coupon.findOne({ couponCode });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }

    const { discountPercent } = coupon;

    res.status(200).json({ discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Coupon Update

router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Category.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon is not found." });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });
    res.status(200).json(updatedCoupon);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error." });
  }
});

//Coupon delete

router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndRemove(couponId);
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon is not found." });
    }
    res.status(200).json(deletedCoupon);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
