const router = require("express").Router();

// GET /users — return all users
router.get("/", (req, res) => {
  res.send("GET all users");
});

// GET /users/:userId — return one user by ID
router.get("/:userId", (req, res) => {
  res.send(`GET user by ID: ${req.params.userId}`);
});

// POST /users — create a new user
router.post("/", (req, res) => {
  res.send("POST create user");
});

module.exports = router;
