const express = require("express");
const router = express.Router();

router.get("/favorites", async (req, res, next) => {
  res.json({ message: "get all items" });
});

router.get("/favorites/:favoritesId", async (req, res, next) => {
  res.json({ message: "get item" });
});

router.post("/favorites", async (req, res, next) => {
  res.json({ message: "item added" });
});

router.delete("/favorites/:favoritesId", async (req, res, next) => {
  res.json({ message: "item removed" });
});

module.exports = router;
