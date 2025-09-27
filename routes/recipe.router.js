const express = require("express");
const Recipe = require("../models/recipe.model");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(400).json({ error: "Error in getting recipes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id, {});
    if (!recipe) {
      return res.status(400).json({ error: "There is no recipe with this id" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json({ error: "Error in getting single recipe" });
  }
});

router.put("/:id", upload.single("coverImage"), async (req, res) => {
  const id = req.params.id;
  const { title, instructions, ingredients } = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        instructions,
        ingredients,
        coverImage: req.file?.filename,
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(400).json({ error: "No recipe with this id" });
    }

    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return res.status(400).json({ error: "Error in updating recipe" });
  }
});

router.post(
  "/add",
  upload.single("coverImage"),
  verifyToken,
  async (req, res) => {
    const { title, ingredients, instructions } = req.body;

    console.log(req.user);

    try {
      if (
        title == "undefined" ||
        ingredients == "undefined" ||
        instructions == "undefined"
      ) {
        return res.status(400).json({ error: "All Fields Are Required" });
      }
      const newRecipe = await Recipe.create({
        title,
        ingredients,
        instructions,
        coverImage: req.file?.filename,
        createdBy: req.user.id,
      });

      return res.status(200).json(newRecipe);
    } catch (error) {
      return res.status(400).json({ error: "Error in adding a recipe" });
    }
  }
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(400).json({ error: "No recipe with this id" });
    }
    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Error in deleting recipe" });
  }
});

module.exports = router;
