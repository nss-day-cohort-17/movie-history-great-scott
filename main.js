
function getMovie(){
    var movieTitle = $('#movieTitle').val()
    console.log(movieTitle)

    //grabbing API JSON
 $.ajax({url:`https://www.omdbapi.com/?t=${movieTitle}=&plot=full&r=json`})
        .done(function(e) {
            $(".movie-body").empty()
            if(e.Error){
                failMovie(e)
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

function loadMovie(data){
//     console.log(data)
//     console.log(data.imdbRating)
    $(".movie-body").append(`<div movie-card row col-md-4>

                                <img src="${data.Poster}" alt="${data.Title} movie poster" class="movie-poster">
                                <div class="title"> ${data.Title}</div>
                                <div class="year"> ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                            </div>`)
        vailidateRating(data)
        watchedCheckbox(data)
        $('#movieTitle').val('').focus()
}

function vailidateRating(data){
    if(data.imdbRating ==="N/A"){
        $(".movie-body").append(`<div class="rating-of-5">No ranking found</div>`)
    }else{
        $(".movie-body").append(`<div class="rating-of-5">Rating: ${Math.round(data.imdbRating/2)}</div>`)
    }
}


function watchedCheckbox(data){
    $(".movie-body").append(`<label>Check box if watched</label><button type="checkbox" class="watched"></button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`)
}
