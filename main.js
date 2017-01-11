
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
    $(".movie-body").append(`<div movie-card>
                                <img src="${data.Poster}" alt="${data.Title} movie poster">
                                <div class="title">Title: ${data.Title}</div>
                                <div class="year">Year: ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                            </div>    `)
        vailidateRating(data)
        watchedCheckbox(data)
}

function vailidateRating(data){
    if(data.imdbRating ==="N/A"){
        $(".movie-body").append(`<div class="rating-of-5">No ranking found</div>`)
    }else{
        $(".movie-body").append(`<div class="rating-of-5">Rating Out Of 5: ${Math.round(data.imdbRating/2)}</div>`)
    }
}

function watchedCheckbox(data){
    $(".movie-body").append(`<button type="checkbox" class="watched">Watched?</button>`)

}
