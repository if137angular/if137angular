const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");
const livereload = require("livereload").createServer();

// Middlewares
app.use(logger("dev"));
app.use(cors());
app.use(compression());
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
const PORT = process.argv.length === 3 ? process.argv[2] : 5000;
app.listen(PORT, () =>
  console.log(`Server started at: http://localhost:${PORT}`)
);
