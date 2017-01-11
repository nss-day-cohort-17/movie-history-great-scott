
function getMovie(){
    var movieTitle = $('#movieTitle').val()
    console.log(movieTitle)

    //grabbing API JSON
 $.ajax({url:`https://www.omdbapi.com/?t=${movieTitle}=&plot=full&r=json`})
        .done(function(e) {
            //reset movie search
            $(".movie-body").empty()
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
    //appends card to html
    $(".movie-body").append(`<div movie-card row col-md-4>
                                <img src="${data.Poster}" alt="${data.Title} movie poster" class="movie-poster">
                                <div class="title">Title: ${data.Title}</div>
                                <div class="year">Year: ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                            </div>`)
        validateRating(data)
        watchedCheckbox(data)
        $('#movieTitle').val('').focus()
}
//Valdates if there is a number rating and rounds it
function validateRating(data){
    if(data.imdbRating ==="N/A"){
        $(".movie-body").append(`<div class="rating-of-5">No ranking found</div>`)
    }else{
        $(".movie-body").append(`<div class="rating-of-5">Rating Out Of 5: ${Math.round(data.imdbRating/2)}</div>`)
    }
}

//Valdates the watch or un-watched checkbox
function watchedCheckbox(data){
    $(".movie-body").append(`<label>Check box if watched</label><button type="checkbox" class="watched"></button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`)
}
