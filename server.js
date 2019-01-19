//require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//var morgan = require("morgan");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
//var session = require("express-session");
//var bodyParser = require("body-parser");
//var env = require("dotenv").load();
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new Strategy(function(username, password, cb) {
    findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password !== password) {
        console.log(`LOGIN for ${user.username} FAILED - INCORRECT PASSWORD`);
        return cb(null, false);
      }
      console.log("LOGIN SUCCESSFUL!!!");
      return cb(null, user);
    });
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

var app = express();
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index", { user: req.user });
});

app.get("/login", function(req, res) {
  console.log("Rendering login page");
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/profile");
  }
);

app.get("/logout", function(req, res) {
  console.log("LOG OUT INVOKED");
  req.logout();
  res.redirect("/");
});

app.get("/profile", require("connect-ensure-login").ensureLoggedIn(), function(
  req,
  res
) {
  console.log(req.user);
  db.bike
    .findAll({
      where: {
        username: req.user.username
      }
    })
    .then(bikeData => {
      let bikeList = [];
      bikeData.forEach(bike => {
        // cleans up the results to parse easier
        bikeList.push(bike.dataValues);
      });

      const profileData = { user: req.user, bikes: bikeList };
      console.log("RENDERING PROFILE DATA:", profileData);
      res.render("profile", profileData);
    });
});

// Routes
//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: true
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true; // I've set force sync true here to make development easier - in case we update Schema. -Scott
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  db.bike
    .bulkCreate([
      {
        username: "scott",
        bikeNickname: "Silver Bullet",
        color: "silver",
        brand: "Upland",
        serialNumber: "123456",
        model: "Vulture"
      },
      {
        username: "scott",
        bikeNickname: "Rodeit",
        color: "gloss metallic red",
        brand: "Haro",
        serialNumber: "aksjdflkdsj",
        model: "Downtown"
      },
      {
        username: "michael",
        bikeNickname: "Fixie",
        color: "Barcelona",
        brand: "6KU",
        serialNumber: "465sfa4d",
        model: "Fixie"
      },
      {
        username: "james",
        bikeNickname: "Janky Jumper",
        color: "black",
        brand: "Norco",
        serialNumber: "jsalfkj32",
        model: "Sight Carbon"
      },
      {
        username: "susye",
        bikeNickname: "Road Bike",
        color: "turquoise",
        brand: "Bianchi",
        serialNumber: "lajksdhf23",
        model: "Via Nirone Dama Sora"
      }
    ])
    .then(bikes => {
      console.log(bikes);
      db.user
        .bulkCreate([
          {
            username: "scott",
            password: "1234",
            displayName: "Scott",
            email: "scott@email.com"
          },
          {
            username: "susye",
            password: "abcd",
            displayName: "Susye",
            email: "susye@email.com"
          },
          {
            username: "james",
            password: "5678",
            displayName: "James",
            email: "james@email.com"
          },
          {
            username: "michael",
            password: "password",
            displayName: "Michael",
            email: "michael@email.com"
          }
        ])
        .then(users => {
          console.log(users);
          app.listen(PORT, () => {
            console.log(
              "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
              PORT,
              PORT
            );
          });
        });
    });
});

module.exports = app;

function findByUsername(username, cb) {
  db.user
    .findAll({
      where: {
        username: username
      }
    })
    .then(data => {
      const record = data[0].dataValues;
      console.log("________________________");
      console.log(record);
      console.log("________________________");
      if (username === record.username) {
        console.log("FOUND USER:", username);
        return cb(null, record);
      } else {
        console.log("USER NOT FOUND.");
        return cb(null, null);
      }
    });
}

function findById(id, cb) {
  db.user
    .findAll({
      where: {
        id: id
      }
    })
    .then(data => {
      const user = data[0].dataValues;
      if (user) {
        cb(null, user);
      } else {
        cb(new Error("User does not exist"));
      }
    });
}

function findBikesByUsername(username) {
  return new Promise((resolve, reject) => {
    db.bike
      .findAll({
        where: {
          username: username
        }
      })
      .then(bikeData => {
        let bikeList = [];
        bikeData.forEach(bike => {
          bikeList.push(bike.dataValues);
        });
        console.log("*************************");
        console.log(bikeList);
        return bikeList;
      });
  });
}
