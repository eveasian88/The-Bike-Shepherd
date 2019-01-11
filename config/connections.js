// dependencies
var Sequelize = require("sequelize");

// creates mySQL connection using Sequelize
var sequelize = new Sequelize("bikes_db", "root", "esperAnza#88", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;