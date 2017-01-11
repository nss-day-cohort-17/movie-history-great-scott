








var movieText = "";

$('#new-movie').click( function(){

  movieTitle = $('#movieTitle').text()
  getMovie()
  console.log("hey")

})


//grabbing API JSON
function getMovie(){$.ajax( "https://www.omdbapi.com/?t='${movieTitle}'+&y=&plot=full&r=json")
  .done(function() {
    alert( "success" );
  })

}
