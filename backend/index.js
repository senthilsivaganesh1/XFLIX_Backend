require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
// const userRoutes = require("./routes/v1/user.route");




mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => console.log("Connected to DB at", config.mongoose.url))
  .catch((error) => console.log("Failed to connect to DB\n", error));

  
// app.use("/v1/users", userRoutes);

  app.listen(config.port, () => {
    console.log("Server Listening at", config.port);
  });


