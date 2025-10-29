const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");
const {
  validateCreateUser,
  validateIdParam,
} = require("../middlewares/validation");

// GET /users — return all users
router.get("/", getUsers);

// GET /users/:userId — return specific user by ID
router.get("/:userId", validateIdParam, getUser);

// POST /users — create a new user
router.post("/", validateCreateUser, createUser);

module.exports = router;
