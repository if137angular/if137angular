const express = require("express");
const app = express();
const logger = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
// TODO refresh browser on file changes

// Middlewares
app.use(logger("dev"));
app.use(express.static("dist/if137-flights-info"));

// Proxy
app.use(
  "/",
  createProxyMiddleware({
    target: "https://api.travelpayouts.com",
    changeOrigin: true,
  })
);

// Start server
app.listen(5000, () => console.log("Server started at: http://localhost:5000"));
