"use strict";

const express = require("express");
const dataModules = require("../models/index-models");
const bearer = require("../middleware/bearer");
const permissions = require("../middleware/acl");
const usersCollection = require("../models/data-collection");

const routerV2 = express.Router();

routerV2.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});

routerV2.get("/:model", bearer, permissions("read"), handleGetAll);
routerV2.get("/:model/:id", bearer, permissions("read"), handleGetOne);
routerV2.post("/:model", bearer, permissions("create"), handleCreate);
routerV2.put("/:model/:id", bearer, permissions("update"), handleUpdate);
routerV2.delete("/:model/:id", bearer, permissions("delete"), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await usersCollection.readRecord();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await usersCollection.readRecord(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await usersCollection.createRecord(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let foundId = await usersCollection.readRecord(id);

  if (foundId) {
    let updatedObj = await usersCollection.update(obj);
    res.status(201).json(updatedObj);
  } else {
    res.status(404).json({ message: "Object not found" });
  }
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await usersCollection.deleteRecord(id);
  res.status(204).json(deletedRecord);
}

module.exports = routerV2;
