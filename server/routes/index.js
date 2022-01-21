const express = require("express");
const swaggerUi = require("swagger-ui-express");
const router = express.Router();

router.all("/");

const swaggerDocument = require("../swagger/swagger.json");
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
