const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// GET all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// GET user by ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

// POST create new user
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};
