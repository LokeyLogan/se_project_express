const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UNAUTHORIZED } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Avatar must be a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure no two users share the same email
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Email must be valid",
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // hide password hash from all queries by default
  },
});

// custom method used during login to verify email + password
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.statusCode = UNAUTHORIZED;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.statusCode = UNAUTHORIZED;
          throw error;
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
