const router = require("express").Router();
const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

// public route for signing in
router.post("/signin", validateLogin, login);

// public route for signing up
router.post("/signup", validateCreateUser, createUser);

// public route: anyone can view items
router.get("/", (req, res) => {
  res.send({ message: "WTWR API is running" });
});

// all routes below this require a valid JWT
router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingRouter);

module.exports = router;
