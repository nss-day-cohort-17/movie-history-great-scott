








var movieTitle = $('#getMovieButton').click($('#movieTitle').text())

console.log(movieTitle)

//grabbing API JSON
var getMovie = $.ajax( "www.omdbapi.com/?t='${movieTitle}'&y=&plot=full&r=json")
  .done(function() {
    alert( "success" );
  })
