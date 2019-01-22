var db = require("../models");

module.exports = function(app) {
  app.post("/api/register", function(req,res){
    console.log(req.body);
    db.bike.create(req.body);
  });
  app.get("/api/findStolen/All", function(req, res){
    db.bike.findAll({
      where: { stolen: true }
    }).then(function(data) {
      res.json(data);
    });
  });
  //process general search requests
  app.get("/api/findStolen/:searchQuery",function(req,res){
    let searchQuery = req.params.searchQuery;
    let searchObject={}
    searchQuery = searchQuery.split("&");
    for (let searchTerm of searchQuery){
      console.log(searchTerm)
      let tempSearchTerm = searchTerm.split("=");
      searchObject[tempSearchTerm[0]] = tempSearchTerm[1];  
    }
    db.bike.findAll({
      where: searchObject
    }).then(function(data){
      res.json(data)
    });
  })
};

//module.exports = app => {
// Get all examples
// app.get("/api/examples", (req, res) => {
//   db.Example.findAll({}).then(dbExamples => {
//     res.json(dbExamples);
//   });
// });
// // Create a new example
// app.post("/api/examples", (req, res) => {
//   db.Example.create(req.body).then(dbExample => {
//     res.json(dbExample);
//   });
// });
// Delete an example by id
// app.delete("/api/examples/:id", (req, res) => {
//   db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
//     res.json(dbExample);
//   });
// });
//};
