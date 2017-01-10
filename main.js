








var movieTitle = $('#movieTitle').val()

$('#getMovieButton').click(getMovie)
function getMovie(){
    console.log(movieTitle)
}

//grabbing API JSON
$.ajax({url:"www.omdbapi.com/?t='${movieTitle}'&y=&plot=full&r=json"})
    .done(function(e) {
    console.log(e);
  })


  console.log()
