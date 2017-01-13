// firebase

  firebase.initializeApp(
    // Initialize Firebase
{
    apiKey: "AIzaSyBK4Liq6H97r8LIEYpr3hyqR4l77zkrQXI",
    authDomain: "movie-history-great-scott.firebaseapp.com",
    databaseURL: "https://movie-history-great-scott.firebaseio.com",
    storageBucket: "movie-history-great-scott.appspot.com",
    messagingSenderId: "176272090400"

  });

//check logged in status

//listens for changes  from login/signout
firebase.auth().onAuthStateChanged(() => {
  if (firebase.auth().currentUser != null) {
  //logged in
  var email = firebase.auth().currentUser.email
    $("#loginPage").addClass('hidden')
    $(".main ").removeClass('hidden')
    $('.main  h1').text(`Welcome ${email}`)

  }
  else {
      $("#loginPage").removeClass('hidden')
      $(".main").addClass('hidden')
    }
})

//logout
$('#logout').click(() => {
  firebase.auth().signOut()

});

//login when hit login button
$('#loginPage form').submit((e) => {
 var email = $('#userEmail').val()
 var password=$('#userPassword').val()


 firebase.auth().createUserWithEmailAndPassword(email, password)
     firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      $('form')[0].reset()
     })
e.preventDefault()
});




//adding items to  firebase
// //
// $('#save-movie').submit((e) => {
//     var uid = firebase.auth().currentUser.uid
// //SAVE MOVIE OBJECT AS VAR

//     // var task = $('.movie-page input[type="text"]').val()

//   $.post(`https://auth-proj-a6516.firebaseio.com/${uid}.json`,
//   JSON.stringify({ //task: task})
//   ).then(console.log)

//   e.preventDefault()

// })


var newMovieData = {}

function getMovie(){
    var movieTitle = $('#movieTitle').val()
    // console.log(movieTitle)

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

$('#new-movie').click(function(){
     // $('.main').show()
    getMovie()
})

function failMovie(data){

    $(".movie-body").append(`<h1>${data.Error}</h1>`)

    console.log("no movie")
}

//Loads movie card with basic info about movie
function loadMovie(data){

    var actors = data.Actors
    newMovieData = {
                        "title" : data.Title,
                        "poster" : data.Poster,
                        "year" : data.Year,
                        "actors" : actors.split(", "),
                        "rating" : Math.round(data.imdbRating/2),
                        "watched" : false,
                        "poster" : data.Poster
                    }
    console.log(JSON.stringify(newMovieData))
    //appends card to html

    $(".movie-body").append(`<div class="movie-card row col-md-4">
                                <img src="${data.Poster}" alt="${data.Title} movie poster" class="movie-poster">
                                <div class="title"> ${data.Title}</div>
                                <div class="year"> ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                            </div>`)
        validateRating(data)
        $(".movie-card").append(`<label for="watchedCheck">Check box if watched</label>
            <input id="watchedCheck" type="checkbox" class="watched">
            </button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`
        )
        $('#movieTitle').val('').focus()

}
//saving the movie
function saveMovie(e){
    // console.log("new log",newMovieData)
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


$("body").click(function(e){
    // console.log(e)
       if (e.target.id === "delete-movie") {
            deleteMovie()
        }
    })

//====my movie pages display/hide
$("#search-movie").click(function(){
    // $('.movie-body').hide()
    $( ".myMovies" ).show( "slow", function() {
            myMovies()
  });
})

$("body").on('click', '#save-movie', function(){
    saveMovie()
})

$("body").on('click', '#watchedChecked', function(){
    watched()
})


// go get saved  movies from firebase
function myMovies(){
    // console.log("new log",newMovieData)
    $.ajax({url: "https://movie-history-great-scott.firebaseio.com/.json"})
        .done(function(e) {

        populateMyMoviesPage(e) // <--send saved movies to function populateMyMoviesPage

        // console.log("your saved movies are:", e)
})

}

function populateMyMoviesPage(data) {
    console.log(data)
        for(var obj in data) {
                $(".myMovies").append(`<div class="movie-card">
                                            <img src="${data[obj].poster}" alt="'{data[obj].title}'' movie poster" class="movie-poster">
                                            <div class="title"> ${data[obj].title}</div>
                                            <div class="year"> ${data[obj].year}</div>
                                            <div class="actors">Main Actors: ${data[obj].actors}</div>
                                            <button id="delete-movie">Remove Movie</button>

                                    </div>`)

         }
    }

$('.delete').click(() => console.log("delete"))

function deleteMovie(e){
    console.log("delete")
    /// AJAX CALL HERE TO DELETE
}
//Valdates if there is a number rating and rounds it
function validateRating(data){
    if(data.imdbRating ==="N/A"){
        $(".movie-body").append(`<div class="rating-of-5">No ranking found</div>`)
    }else{
        $(".movie-body").append(`<div class="rating-of-5">Rating: ${Math.round(data.imdbRating/2)}</div>`)
    }
}


function clearMovie(){
    // $(".movie-body").empty()
    $('#movieTitle').val('').focus()
}
