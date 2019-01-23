$(document).ready(function() {
  //allows the user to search by any combination of terms
  $("#searchbtn").on("click",function(event) {
    event.preventDefault();
    let terms = ["nickname","color","brand","serialNumber","model","terms"];
    let searchQuery = "/api/findStolen/";
    for (let term of terms) {
      let formValue = $(`#${term}`).val().trim() 
      //check that each term isn't null
      if (! formValue == ""){
        searchQuery += ( "&" + term + "=" + formValue );
      }
    }
    console.log(searchQuery);
  });
});
