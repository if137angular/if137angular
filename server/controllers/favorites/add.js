const { Favorites } = require("../../models/favorites");

const add = async (req, res, next) => {
  const result = await Favorites.create(req.body);
  res.status(201).json({ result });
};

module.exports = add;
