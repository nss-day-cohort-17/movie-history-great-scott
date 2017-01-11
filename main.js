
var movieText = "";



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

      $(".movie-body").append(`
                                <div class="movie-card"><div class="title"> ${data.Title}</div>
                                <div class="rating-of-5">Rating: ${data.imdbRating/2}</div>
                                <div class="year">Year: ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                                <label class="watched">I've watched this</label><button type="checkbox" class="watched"></button>
                            <input class="btn btn-primary save-movie"  type="button" value="Add to My Movies"> </div>`)

  
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
    $(".movie-body").append(`<label>Check box if watched</label><button type="checkbox" class="watched">Watched?</button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`)



}
