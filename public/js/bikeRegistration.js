//on submission we post to the server with all the relevant
//bike registration data

//alert("loaded");

// $("#addbike").on("click", function(event) {
//   event.preventDefault();
//   alert("ADDING A BIKE");
//   let username = $("#username").val().trim();
//   let nickname = $("#nickname").val().trim();
//   let color = $("#color").val().trim();
//   let brand = $("#brand").val().trim();
//   let serialNumber = $("#serialNumber").val().trim();
//   let model = $("#model").val().trim();
//   //the html forms should have the "required" tag to ensure that
//   //they are filled out

//   //create a object and then post it to the server via ajex where
//   //it will be sequlized into the database
//   let newBike = {
//     username: username,
//     userID: userID,
//     nickname: nickname,
//     color: color,
//     brand: brand,
//     serialNumber: serialNumber,
//     model: model,
//     stolen: false
//   };

//   $.post("api/register", newBike, data => {
//     //console log to verify that we posted to server sucessfully
//     console.log("*******************");
//     console.log("Sent bike data to server \n");
//     console.log(newBike);
//     console.log(data);
//   });
// });
