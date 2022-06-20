"use strict";

const Clothes = (sequelize, DataTypes) =>
  sequelize.define("clothes", {
    ClothesType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ClothesSize: {
      type: DataTypes.STRING,
    },
    ClothesPrice: {
      type: DataTypes.STRING,
    },
  });

module.exports = Clothes;
