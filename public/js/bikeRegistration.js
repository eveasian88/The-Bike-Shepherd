$(document).ready(function() {
  //on submission we post to the server with all the relevant
  //bike registration data

  apiroute1
  //this log is to verify that the JS loads at all
  console.log("I loaded sucessfully!");
  //it seems like the file isn't loading for some reason and
  //I'm getting a weird error in the browser console log
  $("#signupbtn").on("click", function(event) {
    event.preventDefault();
    let userID = ""; //TODO grab from local storage
    let nickname = $("#nickname").val().trim();
    let color = $("#color").val().trim();
    let brand = $("#brand").val().trim();
    let serialNumber = $("#serialNumber").val().trim();
    let model = $("#model").val().trim();

alert("loaded");

$("#signupbtn").on("click", function(event) {
  event.preventDefault();
  let username = $("#loginUsername").val().trim();
  let nickname = $("#nickname").val().trim();
  let color = $("#color").val().trim();
  let brand = $("#brand").val().trim();
  let serialNumber = $("#serialNumber").val().trim();
  let model = $("#model").val().trim();
  //the html forms should have the "required" tag to ensure that
  //they are filled out
 master

    //create a object and then post it to the server via ajex where
    //it will be sequlized into the database
    let newBike = {
      userID: userID,
      nickname: nickname,
      color: color,
      brand: brand,
      serialNumber: serialNumber,
      model: model
    };
    $.post("/api/register", newBike, function(data) {
      //console log to verify that we posted to server sucessfully
      console.log("Sent bike data to server \n");
      console.log(newBike);
    });
  });
});
