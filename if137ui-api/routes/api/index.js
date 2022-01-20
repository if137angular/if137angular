const express = require("express");
const router = express.Router();

router.use("/favorites", require("./favorites"));

module.exports = router;
