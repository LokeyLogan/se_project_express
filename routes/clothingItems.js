const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const {
  validateCreateItem,
  validateIdParam,
} = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", validateCreateItem, createClothingItem);
router.delete("/:itemId", validateIdParam, deleteClothingItem);
router.put("/:itemId/likes", validateIdParam, likeItem);
router.delete("/:itemId/likes", validateIdParam, dislikeItem);

module.exports = router;
