require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var morgan = require("morgan");

// creating an express app instance
var app = express();

var PORT = process.env.PORT || 8080;


// set default directory to public
app.use(express.static("public"));

// parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// set handlebars
var exphbs = require("express-handlebars");


// prepares express app to use and layout handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// requiring routes specified in .js file
// var routes = require("./");


// tell express to use routes
app.use(routes);


// sets app to listen at specified port
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});