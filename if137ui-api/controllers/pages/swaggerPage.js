const path = require("path");

const swaggerPage = (_, res) => {
  const mainPage = path.join(__dirname, "../../routes/index.html");
  return res.sendFile(swaggerPage);
};

module.exports = swaggerPage;
