const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          required: true,
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error loading categories");
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryIDdata = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          required: true,
        },
      ],
    });

    if (!categoryIDdata) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json(categoryIDdata);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error loading category by selected ID.");
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
    console.log("You got it but make the connection to product or whatever.");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: "No category found matching that ID." });
    }
    console.log("You got it but make the connection to product or whatever.");
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
// });

module.exports = router;
