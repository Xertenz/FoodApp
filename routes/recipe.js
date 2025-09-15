const express = require("express");
const Recipe = require("../models/recipe.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({}, { _id: false, __v: false });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({ error: "Error in getting recipes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id, {
      _id: false,
      __v: false,
    });
    if (!recipe) {
      res.status(400).json({ error: "There is no recipe with this id" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: "Error in getting single recipe" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, instructions, ingredients } = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        instructions,
        ingredients,
      },
      { new: true }
    );

    if (!updatedRecipe) {
      res.status(400).json({ error: "No recipe with this id" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: "Error in updating recipe" });
  }
});

router.post("/add", async (req, res) => {
  const { title, ingredients, instructions, coverImage } = req.body;
  if (!title || !ingredients || !instructions || !coverImage) {
    res.status(400).json({ error: "All Fields Are Required" });
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    coverImage,
  });

  res.status(200).json(newRecipe);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRecipe = await Recipe.findOneAndDelete(id);
    if (!deletedRecipe) {
      res.status(400).json({ error: "No recipe with this id" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error in deleting recipe" });
  }
});

module.exports = router;
