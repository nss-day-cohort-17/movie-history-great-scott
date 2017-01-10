



function getMovie(){
    var movieTitle = $('#movieTitle').val()
    console.log(movieTitle)
    //grabbing API JSON
    $.ajax({url:`https://www.omdbapi.com/?t=${movieTitle}+&y=&plot=full&r=json`})
        .done(function(e) {
        console.log(e);
      })

}

$('#new-movie').click(getMovie)

  console.log()
