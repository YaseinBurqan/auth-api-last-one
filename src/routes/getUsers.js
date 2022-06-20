"use strict";
const express = require("express");
const allUsersRouter = express.Router();
const { users } = require("../models/users-models");
const bearer = require("../middleware/bearer");
const logger = require("../middleware/logger");
const acl = require("../middleware/acl");
const Collection = require("../models/data-collection");

allUsersRouter.get("/users", bearer, acl("delete"), async (req, res, next) => {
  const allUsers = await Collection.readRecord();
  const list = userRecords.map((user) => user.username);
  res.status(200).json(list);
});

allUsersRouter.use(logger);

module.exports = allUsersRouter;
