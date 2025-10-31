const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

// GET all clothing items
module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR)
        .send({ message: "An error occurred on the server" });
    });
};

// CREATE a new clothing item
module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
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

// DELETE clothing item by ID
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => item.deleteOne())
    .then(() => res.send({ message: "Item deleted successfully" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

// LIKE clothing item
module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};

// DISLIKE clothing item
module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
      } else if (err.statusCode === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: "Item not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error occurred on the server" });
      }
    });
};
