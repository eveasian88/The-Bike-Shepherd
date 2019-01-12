"use strict";
module.exports = function(sequelize, DataTypes) {
  var bike = sequelize.define("bike",
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
  bike.associate = function(models) {
    models.test = "blah"; // todo: delete later
    // associations can be defined here
  };
  return bike;
};
