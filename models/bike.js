module.exports = function(sequelize, DataTypes) {
  var Bike = sequelize.define("bike", {
    userID: DataTypes.STRING,
    nickname: DataTypes.STRING,
    color: DataTypes.STRING,
    brand: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    model: DataTypes.STRING
  });
  return Bike;
};
