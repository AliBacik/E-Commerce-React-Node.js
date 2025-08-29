const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {}
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ err: "Invalid category ID" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ err: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
});

router.put("/:categoryId",async (req,res)=>{
    try{
        const categoryId = req.params.categoryId;
        const updates = req.body;

        const existingCategory = await Category.findById(categoryId);
        if(!existingCategory){
            return res.status(404).json({error: "Category is not found."})
        }

        const updatedCategory = await Category.findByIdAndUpdate
        (
            categoryId,
            updates,
            {new:true}
        )
        res.status(200).json(updatedCategory);
    }
    catch(err)
    {

    }
});


router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
