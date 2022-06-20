"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const userSchema = require("./users-models");
const food = require("./food-models");
const clothes = require("./clothes-models");
const usersModel = require("./users-models");
const Collection = require("./data-collection");

const DATABASE_URL = process.env.NODE_ENV === "test" ? "sqlite::memory" : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const users = usersModel(sequelize, DataTypes);

let foodModel = food(sequelize, DataTypes);
let foodCollection = new Collection(foodModel);

let clothesModel = clothes(sequelize, DataTypes);
let clothesCollection = new Collection(clothesModel);

module.exports = {
  users: users,
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
  foodCollection: foodCollection,
  clothesCollection: clothesCollection,
};
