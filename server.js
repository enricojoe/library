const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Connecting to the database and then starting the server
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err);
  });