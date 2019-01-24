var bcrypt = require("bcryptjs");

// let password = process.argv[2];
// let password2 = process.argv[3];

// let myHash = "$2a$10$M5Fa3YdKdN5/0KygfpPrpO8ZzNf0/ZN8YBDxDVEsQdzqkqHgnu4Va";
// let myHash2 = "$2a$10$Byq8ImjrA3wvetgGMOqZseZwP97.LlIgNHecSVpV2btWnGvp5f8Zm";

// // getPasswordHash(password);
// // getPasswordHash(password2);

// function getPasswordHash(password) {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
// 	  console.log("Hash is:", hash);
// 	//   myHash = hash;
//     });
//   });
// }

// bcrypt.compare("password2", myHash, function(err, res) {
//     console.log(res);
// });

bcrypt.hash('password', 8, function(err, hash) {
	console.log(hash)
});