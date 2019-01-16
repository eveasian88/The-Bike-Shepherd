//on submission we post to the server with all the relveant 
//bike registration data

$("#signupbtn").on("click",function(event){
    event.preventDefault();
    let userID=""; //TODO grab from local storage
    let nickname=$("#nickname").val().trim();
    let color=$("#color").val().trim();
    let brand=$("#brand").val().trim();
    let serialNumber=$("#serialNumber").val().trim();
    let model=$("#model").val().trim();
    //the html forms should have the "required" tag to ensure that
    //they are filled out
  
    //create a object and then post it to the server via ajex where
    //it will be sequlized into the database
    let newBike={
      userID:userID,
      nickname:nickname,
      color:color,
      brand:brand,
      serialNumber:serialNumber,
      model:model,
    }
     $.post("api/register",newBike,function(data){
      //console log to verify that we posted to server sucessfully
      console.log("Sent bike data to server \n")
      console.log(newBike)
     })
  })
