var db = require("../models");

app.post("/api/register", function(req, res) {
  console.log("***************************** POSTING???");
  console.log(req.body);
  db.bike.create(req.body);
  return res.redirect("/profile"); // re-render the page to display the newly-added bike
});
