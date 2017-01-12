
var newMovieData = {}

function getMovie(){
    var movieTitle = $('#movieTitle').val()
    console.log(movieTitle)

    //grabbing API JSON
 $.ajax({url:`https://www.omdbapi.com/?t=${movieTitle}=&plot=full&r=json`})
        .done(function(e) {
            //reset movie search
            clearMovie()
            //if checks for movie error
            if(e.Error){
                failMovie(e)
            //else uses vaild movie info
            }else{
                loadMovie(e)
            }
        })
        .fail(failMovie)

}

$('#new-movie').click(getMovie)

function failMovie(data){

    $(".movie-body").append(`<h1>${data.Error}</h1>`)

    console.log("no movie")
}

//Loads movie card with basic info about movie
function loadMovie(data){

    var actors = data.Actors
    newMovieData = {
                        "title" : data.Title,
                        "year" : data.Year,
                        "actors" : actors.split(", "),
                        "rating" : Math.round(data.imdbRating/2),
                        "watched" : false,
                        "poster" : data.Poster
                    }
    console.log(JSON.stringify(newMovieData))
    //appends card to html
    $(".movie-body").append(`<div movie-card row col-md-4>
                                <img src="${data.Poster}" alt="${data.Title} movie poster" class="movie-poster">
                                <div class="title"> ${data.Title}</div>
                                <div class="year"> ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                            </div>`)
        validateRating(data)
        $(".movie-body").append(`<label for="watchedCheck">Check box if watched</label>
            <input id="watchedCheck" type="checkbox" class="watched">
            </button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`
        )
        $('#movieTitle').val('').focus()

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
    clearMovie()
}

function watched() {
    var watchedChx = $('#watchedCheck')
    console.log("newMovieData", newMovieData)
    if (watchedChx.checked) {
        newMovieData.watched = true
    } else {
        newMovieData.watched = false
    }
}

$("body").on('click', '#save-movie', function(){
    saveMovie()
})

$("body").on('click', '#watchedChecked', function(){
    watched()
})


//Valdates if there is a number rating and rounds it
function validateRating(data){
    if(data.imdbRating ==="N/A"){
        $(".movie-body").append(`<div class="rating-of-5">No ranking found</div>`)
    }else{
        $(".movie-body").append(`<div class="rating-of-5">Rating: ${Math.round(data.imdbRating/2)}</div>`)
    }
}

//Valdates the watch or un-watched checkbox
function watchedCheckbox(data){
    $(".movie-body").append(`<label>Check box if watched</label><button type="checkbox" class="watched"></button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`)

}

function clearMovie(){
    $(".movie-body").empty()
    $('#movieTitle').val('').focus()
}
