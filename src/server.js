"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");

const aclRouter = require("./routes/acl.route");

const signInRouter = require("./routes/signin");
const signUpRouter = require("./routes/signup");
const secretRouter = require("./routes/secret");
const getUsersRouters = require("./routes/allUsers");

app.get("/", handleHome);

const v1 = require("./routes/v1");
const v2 = require("./routes/v2");

app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);
app.use(secretRouter);
app.use(getUsersRouters);
app.use(aclRouter);

app.use("/api/v1", v1);
app.use("/api/v2", v2);

function handleHome(req, res) {
  res.send("welcome to heroku auth-api server");
}

app.use("*", notFoundHandler);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Listen and Running on port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
