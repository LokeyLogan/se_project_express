const router = require("express").Router();
const {
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateIdParam,
} = require("../middlewares/validation");

// these routes are protected by auth in routes/index
router.post("/", validateCreateItem, createClothingItem);
router.delete("/:itemId", validateIdParam, deleteClothingItem);
router.put("/:itemId/likes", validateIdParam, likeItem);
router.delete("/:itemId/likes", validateIdParam, dislikeItem);

module.exports = router;
