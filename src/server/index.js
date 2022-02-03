const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const livereload = require("livereload").createServer();
const logger = require("morgan");

// Middlewares
app.use(logger("dev"));
app.use(express.static("dist/if137-flights-info"));

// Proxy
app.use(
  "/",
  createProxyMiddleware({
    target: "https://api.travelpayouts.com",
    changeOrigin: true,
    followRedirects: true,
    pathRewrite: {
      "/*$": "&token=b482025a8bf39817b6b6f219686b4799",
    },
  })
);

// Live reload
livereload.watch("dist/if137-flights-info");

// Start server
app.listen(5000, () => console.log("Server started at: http://localhost:5000"));
