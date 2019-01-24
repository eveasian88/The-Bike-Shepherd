const db = require("../models");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");

// Configure the local strategy for use by Passport.
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  "local",
  new Strategy((username, password, cb) => {
    findByUsername(username, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      // password is the one entered by the client
      // user.password is the hashed password stored on the server
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // if res, passwords match
          console.log("LOGIN SUCCESSFUL!!!");
          return cb(null, user);
        } else {
          console.log(`LOGIN for ${user.username} FAILED - INCORRECT PASSWORD`);
          return cb(null, false);
        }
      });
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
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", { user: req.user });
  });

  app.get("/login", (req, res) => {
    res.redirect("/"); // if you try to view profile when not logged in, it's sending to /login which no longer exists - redirecting to / which allows login instead.
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.get(
    "/profile",
    require("connect-ensure-login").ensureLoggedIn(),
    (req, res) => {
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

  app.get("/register", (req, res) => {
    res.redirect("/");
  });

  app.get("/resources", (req, res) => {
    res.render("resources");
  });

  app.get("/services", (req, res) => {
    res.render("services");
  });

  app.get("/signup", (req, res) => {
    res.redirect("/"); // if timeout occurs during post and we try to get this non-existent route, reroute to /
  });

  app.get("/team", (req, res) => {
    res.render("team");
  });

  app.get("/stolen", (req, res) => {
    res.render("stolen");
  });

  app.post("/bikestolen/:bikeID", (req, res) => {
    id = req.params.bikeID;
    db.bike.update({ stolen: true }, { where: { id: id } }).then(() => { res.redirect("/stolen");
});
});

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res) => {
      console.log("REDIRECTING TO PROFILE NOW");
      res.redirect("/profile");
    }
  );
  // app.post("/login", (req, res) => {
  //   console.log("REQ.BODY IS:");
  //   console.log(req.body);

  // });

  app.post("/register", (req, res) => {
    console.log("REGISTERING A BIKE");
    console.log(req.body);
    db.bike.create(req.body).then(() => {
      res.redirect("/profile");
    });
  });

  app.post("/signup", (req, res) => {
    db.user.findOne({ where: { username: req.body.username } }).then(user => {
      //console.log("req is");
      //console.log(req);
      const { password, confirmPassword } = req.body;
      if (user) {
        console.error("USER ALREADY EXISTS");
        res.send("ERROR, this user already exists!");
      } else if (password !== confirmPassword) {
        res.send("ERROR, PASSWORDS DON'T MATCH");
      } else {
        bcrypt.hash(req.body.password, 8, (err, hash) => {
          req.body.password = hash;
          // req.body.confirmPassword = hash;
          console.log("AFTER HASHING:");
          console.log(req.body);
          db.user.create(req.body).then(() => {
            req.body.password = req.body.confirmPassword; // now send the unhashed password to the login function
            passport.authenticate("local", (err, user) => {
              req.logIn(user, errLogIn => {
                if (errLogIn) {
                  return res.send(errLogIn);
                }
                return res.redirect("/profile");
              });
            })(req, res);
          });
        });
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};

function findByUsername(username, cb) {
  db.user
    .find({
      where: {
        username: username
      }
    })
    .then(data => {
      let record;
      if (data) {
        record = data.dataValues;
        if (username === record.username) {
          console.log("FOUND USER:", username);
          return cb(null, record);
        }
      }
      console.log("USER NOT FOUND.");
      return cb(null, null);
    });
}

function findById(id, cb) {
  db.user
    .find({
      where: {
        id: id
      }
    })
    .then(data => {
      if (data) {
        const user = data.dataValues;
        console.log(user);
        return cb(null, user);
      }
      return cb(new Error("User does not exist"));
    });
}
