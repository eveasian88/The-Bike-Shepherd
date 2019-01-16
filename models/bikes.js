// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Bike" model that matches up with DB
var Bike = sequelize.define("bike", {
  userID: Sequelize.STRING,
  nickname: Sequelize.STRING,
  color: Sequelize.STRING,
  brand: Sequelize.STRING,
  serialNumber: Sequelize.STRING,
  model: Sequelize.STRING,
});

// Syncs with DB
Bike.sync();

// Makes the Bike Model available for other files (will also create a table)
module.exports = Bike;
