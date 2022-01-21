const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");

const { MONGO_URI, PORT = 4000 } = process.env;

async function run() {
  try {
    await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server running on port: ${PORT}`);
          console.log("Database connection successful");
        });
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

run();
