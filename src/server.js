"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const logger = require("./middleware/logger");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("server is working on home page");
});

const signInRoutes = require("./routes/signIn");
const signUpRoutes = require("./routes/signUp");
app.use(signInRoutes);
app.use(signUpRoutes);

const secretRouter = require("./routes/secret");
const getUsersRouter = require("./routes/getUsers");
app.use(secretRouter);
app.use(getUsersRouter);

const foodRoutes = require("./routes/food");
const clothesRoutes = require("./routes/clothes");

app.use(foodRoutes);
app.use(clothesRoutes);

const notAuthRouter = require("../src/routes/v1");
const authRouter = require("../src/routes/v2");
app.use("/api/v1", notAuthRouter);
app.use("/api/v2", authRouter);

const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
app.use("*", notFoundHandler);
app.use(errorHandler);

app.use(logger);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
