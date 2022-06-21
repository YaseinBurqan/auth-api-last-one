"use strict";
require("dotenv").config();
const foodModel = require("./food.models");

const Collection = require("./collection");
const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./user.model");

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const foodTable = foodModel(sequelize, DataTypes);
const foodCollection = new Collection(foodTable);

const userTable = UserModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,

  food: foodCollection,
  Users: userTable,
};
