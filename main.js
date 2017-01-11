
var movieText = "";
var newMovieData = {}


function getMovie(){
    var movieTitle = $('#movieTitle').val()
    console.log(movieTitle)
    //grabbing API JSON
    $.ajax({url:`https://www.omdbapi.com/?t=${movieTitle}+&y=&plot=full&r=json`}).done(loadMovie)

}

$('#new-movie').click(getMovie)

function loadMovie(data){
    console.log(data)
    console.log(data.imdbRating)
    var actors = data.Actors
    newMovieData = {
                        "title" : data.Title,
                        "year" : data.Year,
                        "actors" : actors.split(", "),
                        "rating" : Math.round(data.imdbRating/2),
                        "watched" : false
                    }
    console.log(JSON.stringify(newMovieData))
    $(".movie-card").append(`<div class="title">Title: ${data.Title}</div>
                             <div class="year">Year: ${data.Year}</div>
                             <div class="actors">Main Actors: ${data.Actors}</div>
                             <div class="rating-of-5">Rating Out Of 5: ${data.imdbRating/2}</div>
                             <label>Check box if watched</label><button type="checkbox" class="watched"></button>
                            <input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`)

}

// firebase: https://movie-history-great-scott.firebaseio.com/.json
function saveMovie(e){
    console.log("new log",newMovieData)
    $.ajax({
        accept: "application/json",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "https://movie-history-great-scott.firebaseio.com/.json",
        data: JSON.stringify(newMovieData)
    });
}

$("body").click(function(e){
    console.log(e)
    if (e.target.id === "save-movie") {
        console.log('inside if')
        saveMovie();
    }
})
