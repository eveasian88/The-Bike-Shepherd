'use strict';
module.exports = (sequelize, DataTypes) => {
  const bike = sequelize.define('bike', {
    name: DataTypes.STRING,
    serial_number: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    brand: DataTypes.STRING,
    purchase_price: DataTypes.DECIMAL
  }, {});
  bike.associate = function(models) {
    // associations can be defined here
  };
  return bike;
};