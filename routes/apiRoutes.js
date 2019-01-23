var db = require("../models");

module.exports = function(app) {
  //route for registering a bike
  app.post("/api/register", function(req, res) {
    console.log(req.body);
    db.bike.create(req.body);
  });
  //find all stolen bikes
  app.get("/api/findStolen/All", function(req, res) {
    db.bike
      .findAll({
        where: { stolen: true }
      })
      .then(function(data) {
        res.json(data);
      });
  });
  //process general search requests
  app.get("/api/findStolen/:searchQuery", function(req, res) {
    let searchQuery = req.params.searchQuery;
    let searchObject = {};
    searchQuery = searchQuery.split("&");
    for (let searchTerm of searchQuery) {
      let tempSearchTerm = searchTerm.split("=");
      searchObject[tempSearchTerm[0]] = tempSearchTerm[1];
    }
    db.bike
      .findAll({
        where: searchObject
      })
      .then(function(data) {
        res.json(data);
        console.log(data)  //delete me
      });
  });
};
