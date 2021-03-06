$(document).ready(function() {
  console.log("loaded") //DELETEME
  //allows the user to search by any combination of terms
  $("#searchbtn").on("click", function(event) {
    event.preventDefault();
    let terms = ["color", "brand", "serialNumber", "model"];
    let searchQuery = "";
    for (let term of terms) {
      let formValue = $(`#${term}`)
        .val()
        .trim();
      //check that each term isn't null
      //changing == to === causes an error
      if (!formValue == "") {
        searchQuery += `${term}=${formValue}&`;
      }
    }
    //remove the last "&"
    searchQuery = searchQuery.slice(0, -1);
    console.log(searchQuery);
    window.location.replace("/api/findStolen/" + searchQuery);
  });
});
