const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "get all items" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "item add" });
});

router.delete("/:favoritesId", async (req, res, next) => {
  res.json({ message: "item removed" });
});

module.exports = router;
