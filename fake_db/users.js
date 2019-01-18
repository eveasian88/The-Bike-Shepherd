var records = [
  {
    id: 1,
    username: "scott",
    password: "1234",
    displayName: "Scott",
    email: "scott@email.com"
  },
  {
    id: 2,
    username: "michael",
    password: "5678",
    displayName: "Michael",
    email: "michael@email.com"
  },
  {
    id: 3,
    username: "james",
    password: "9012",
    displayName: "James",
    email: "james@email.com"
  },
  {
    id: 4,
    username: "susye",
    password: "3456",
    displayName: "Susye",
    email: "susye@email.com"
  }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByUsername = function(username, cb) {
  console.log("Searching for ", username);
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
