"use strict";
module.exports = (sequelize, DataTypes) => {
  var bike = sequelize.define(
    "bike",
    {
      name: DataTypes.STRING,
      serialNumber: DataTypes.STRING,
      model: DataTypes.STRING,
      color: DataTypes.STRING,
      brand: DataTypes.STRING,
      purchasePrice: DataTypes.DECIMAL
    },
    {}
  );
  //bike.associate = function(models) {
  //  associations can be defined here
  //}; // associate is unnecessary because we only have 1 db currently - Scott
  return bike;
};
