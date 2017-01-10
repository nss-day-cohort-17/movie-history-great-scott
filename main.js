








var movieText = "";

$('#new-movie').click( function(){

  movieTitle = $('#movieTitle').text()

  console.log("hey")

})


//grabbing API JSON
var getMovie = $.ajax( "www.omdbapi.com/?t='${movieTitle}'&y=&plot=full&r=json")
  .done(function() {
    alert( "success" );
  })
