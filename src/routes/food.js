"use strict";

const express = require("express");
const { foodCollection } = require("../models/index-models");
const FoodRouter = express.Router();

FoodRouter.get("/food", getFood);
FoodRouter.get("/food/:id", getOneFood);
FoodRouter.post("/food", addFood);
FoodRouter.put("/food/:id", updateFood);
FoodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
  const allFood = await foodCollection.readRecord();
  res.status(200).json(allFood);
}

async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);
  let foodName = await foodCollection.readRecord(foodId);
  res.status(200).json(foodName);
}

async function addFood(req, res) {
  let newFood = req.body;
  let food = await foodCollection.createRecord(newFood);
  res.status(201).json(food);
}

async function updateFood(req, res) {
  let foodId = parseInt(req.params.id);
  let updateFood = req.body;
  let foundFood = await foodCollection.readRecord(foodId);
  if (foundFood) {
    let updatedFood = await foundFood.update(updateFood);
    res.status(201).json(updatedFood);
  } else {
    res.status(404).json({ message: "Food not found" });
  }
}

async function deleteFood(req, res) {
  let foodId = parseInt(req.params.id);
  let deleteFood = await foodCollection.deleteRecord(foodId);
  res.status(204).json(deleteFood);
}

module.exports = FoodRouter;
