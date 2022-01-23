require("dotenv").config();

const app = require("../app");

const { MONGO_URI, PORT = 4000 } = process.env;

async function run() {
  try {
    app.listen(PORT, () => {
      console.log(`Server running: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

run();
