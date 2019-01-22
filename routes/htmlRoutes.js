var db = require("../models");

var passport = require("passport");
var Strategy = require("passport-local").Strategy;

// Configure the local strategy for use by Passport.
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

module.exports = app => {
  app.get("/", function(req, res) {
    res.render("index", { user: req.user });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/services", (req, res) => {
    res.render("services");
  });

  app.get("/team", (req, res) => {
    res.render("team");
  });

  app.get("/login", (req,res) => {
    res.redirect("/"); // if you try to view profile when not logged in, it's sending to /login which no longer exists - redirecting to / which allows login instead.
  });

  app.get(
    "/profile",
    require("connect-ensure-login").ensureLoggedIn(),
    function(req, res) {
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
          res.render("profile", profileData);
        });
    }
  );

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/" }),
    function(req, res) {
      console.log("REDIRECTING TO PROFILE NOW");
      res.redirect("/profile");
    }
  );

  app.post(
    "/signup",
    /*passport.authenticate("local", { failureRedirect: "/" }),*/
    function(req, res) {
      console.log("*********** req is **********", req);
      res.redirect("/");
    }
  );

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};

function findByUsername(username, cb) {
  // console.log("SEARCHING FOR:", username, "!!!");
  db.user
    .findAll({
      where: {
        username: username
      }
    })
    .then(data => {
      const record = data[0].dataValues;
      // console.log("________________________");
      // console.log(record);
      // console.log("________________________");
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
      console.log(user);
      if (user) {
        cb(null, user);
      } else {
        cb(new Error("User does not exist"));
      }
    });
}
