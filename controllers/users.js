const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../errors/bad-request-err");
const ConflictError = require("../errors/conflict-err");
const NotFoundError = require("../errors/not-found-err");
const UnauthorizedError = require("../errors/unauthorized-err");

const { JWT_SECRET } = require("../utils/config");

// signup controller: creates a new user with hashed password
module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("User with this email already exists"));
        return;
      }

      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }

      next(err);
    });
};

// login controller: returns a JWT if email + password are correct
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      // Your findUserByCredentials might throw its own error,
      // but if it doesn't have a statusCode, we convert it to 401.
      if (err.statusCode === 401 || err.name === "UnauthorizedError") {
        next(new UnauthorizedError("Incorrect email or password"));
        return;
      }

      next(err);
    });
};

// returns the currently authenticated user
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(err);
    });
};

// updates the current user's name and avatar
module.exports.updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(err);
    });
};
