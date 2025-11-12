const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

// returns the current user's profile
router.get("/me", getCurrentUser);

// updates current user's name and avatar
router.patch("/me", validateUpdateUser, updateCurrentUser);

module.exports = router;
