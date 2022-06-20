"use strict";

const express = require("express");
const { clothesCollection } = require("../models/index-models");
const ClothesRouter = express.Router();

ClothesRouter.get("/clothes", getClothes);
ClothesRouter.get("/clothes/:id", getOneClothes);
ClothesRouter.post("/clothes", createClothes);
ClothesRouter.put("/clothes/:id", updateClothes);
ClothesRouter.delete("/clothes/:id", deleteClothes);

async function getClothes(req, res) {
  const allClothes = await clothesCollection.readRecord();
  res.status(200).json(allClothes);
}

async function getOneClothes(req, res) {
  const clothesId = parseInt(req.params.id);
  let clothesName = await clothesCollection.readRecord(clothesId);
  res.status(200).json(clothesName);
}

async function createClothes(req, res) {
  let newClothes = req.body;
  let person = await clothesCollection.createRecord(newClothes);
  res.status(201).json(person);
}

async function updateClothes(req, res) {
  let clothesId = parseInt(req.params.id);
  let updateClothes = req.body;
  let foundClothes = await clothesCollection.readRecord(clothesId);
  if (foundClothes) {
    let updatedClothes = await foundClothes.update(updateClothes);
    res.status(201).json(updatedClothes);
  } else {
    res.status(404).json({ message: "Clothes not found" });
  }
}

async function deleteClothes(req, res) {
  let clothesId = parseInt(req.params.id);
  let deleteClothes = await clothesCollection.deleteRecord(clothesId);
  res.status(204).json(deleteClothes);
}

module.exports = ClothesRouter;
