const router = require("express").Router();

// GET /items — return all clothing items
router.get("/", (req, res) => {
  res.send("GET all clothing items");
});

// POST /items — create a new clothing item
router.post("/", (req, res) => {
  res.send("POST create clothing item");
});

// DELETE /items/:itemId — delete an item by ID
router.delete("/:itemId", (req, res) => {
  res.send(`DELETE item with ID: ${req.params.itemId}`);
});

module.exports = router;
