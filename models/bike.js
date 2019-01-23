module.exports = function(sequelize, DataTypes) {
  var Bike = sequelize.define("bike", {
    username: DataTypes.STRING,
    bikeNickname: DataTypes.STRING,
    color: DataTypes.STRING,
    brand: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    model: DataTypes.STRING,
    stolen: DataTypes.BOOLEAN
  });
  return Bike;
};
