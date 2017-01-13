/*******************
Firebase
*******************/

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
    uid = firebase.auth().currentUser.uid
  }
  else {
      $("#loginPage").removeClass('hidden')
      $(".main").addClass('hidden')
    }
})


/*******************
Global Variable Declarations
*******************/

var newMovieData = {}
var uid



/*******************
Functions
*******************/


function getMovie(){
    var movieTitle = $('#movieTitle').val()
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
    // console.log(JSON.stringify(newMovieData))
    //appends card to html
    $(".movie-body").append(`<div class="movie-card col-md-5">
                                <img src="${data.Poster}" alt="${data.Title} movie poster" class="movie-poster">
                                <div class="title"> ${data.Title}</div>
                                <div class="year"> ${data.Year}</div>
                                <div class="actors">Main Actors: ${data.Actors}</div>
                            </div>`)
        validateRating(data)

        $(".movie-card").append(`<label for="watchedCheck">Check box if watched</label>
            <input id="watchedCheck" type="checkbox" class="watched">
            </button><input class="btn btn-primary" id="save-movie" type="button" value="Add to My Movies">`)
        $('#movieTitle').val('').focus()
}
//saving the movie
function saveMovie(e){
    //SAVE MOVIE OBJECT AS VAR
    // console.log(uid)
    // console.log(newMovieData);
    $.post(`https://movie-history-great-scott.firebaseio.com/${uid}.json`,
        JSON.stringify({movie : newMovieData})
    ).then(console.log)
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

// go get saved  movies from firebase
function myMovies(){
    // console.log("new log",newMovieData)
    $.ajax({url: `https://movie-history-great-scott.firebaseio.com/${uid}.json`})
        .done(function(e) {
        populateMyMoviesPage(e) // <--send saved movies to function populateMyMoviesPage
        // console.log("your saved movies are:", e)
    })
}

function populateMyMoviesPage(data) {
    // console.log(data)
        for(var obj in data) {
                $(".myMovies").append(`<div class="movie-card col-md-3" id="${obj}">
                                            <img src="${data[obj].movie.poster}" alt="'{data[obj].movie.title}'' movie poster" class="movie-poster">
                                            <div class="title"> ${data[obj].movie.title}</div>
                                            <div class="year"> ${data[obj].movie.year}</div>
                                            <div class="actors">Main Actors: ${data[obj].movie.actors}</div>
                                            <button class="delete-movie">Remove Movie</button>
                                    </div>`)
         }
}

function deleteMovie(e){
    console.log("delete")
    /// AJAX CALL HERE TO DELETE
}

//Valdates if there is a number rating and rounds it
function validateRating(data){
    if(data.imdbRating ==="N/A"){
        $(".movie-card").append(`<div class="rating-of-5">No ranking found</div>`)
    }else{
        $(".movie-card").append(`<div class="rating-of-5">Rating: ${Math.round(data.imdbRating/2)}</div>`)
    }
}


//clear movie
function clearMovie(){
    $(".movie-body").empty()
    $(".myMovies").empty()
    $('#movieTitle').val('').focus()
}

function showAdd() {
    $(".myMovies").addClass("hidden")
    $(".movie-body").removeClass("hidden")
}



/*******************
Event Handlers
*******************/

$('#new-movie').click(function(){
     // $('.main').show()
    getMovie()
    showAdd()
})

$("body").click(function(e){
    // console.log(e)
       if (e.target.id === "delete-movie") {
            deleteMovie()
        }
})

//====my movie pages display/hide
$("#search-movie").click(function(){
    $('.movie-body').hide()
    $( ".myMovies" ).show( "slow", function() {
        myMovies()
  });
})

//====CLICK EVENTS============

$("body").on('click', '#save-movie', function(){
    saveMovie()
})

$("body").on('click', '#watchedChecked', function(){
    watched()
})

$("body").click(function(e){
    // console.log(e)
       if (e.target.id === "delete-movie") {
            deleteMovie()
        }
})

$('body').on("click", ".delete-movie", (e) => {
    var parentId =e.target.parentNode.id
    $.ajax({
        url: `https://movie-history-great-scott.firebaseio.com/${uid}/${parentId}.json`,
        type:'DELETE'
    })
        .done(function(e) {
        clearMovie()
        myMovies() // <--send saved movies to function populateMyMoviesPage
        // console.log("your saved movies are:", e)
    })
})

//adds and removes animation class after animation is finished
$('body :button').click(()=>{
    $('.hidden-del').addClass('delorean').removeClass('hidden');
    $('.car-msg-wrapper').removeClass('hidden')
    $(".hidden-del").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',()=> {
        $(".hidden-del").removeClass('delorean').addClass('hidden');
        $(".car-msg-wrapper").addClass("hidden");
    });
});

//logout
$('#logout').click(() => {
  firebase.auth().signOut()
});



//login when hit login button
$('#loginPage form').submit((e) => {
    var email = $('#userEmail').val()
    var password=$('#userPassword').val()
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        $('form')[0].reset()
    })
    e.preventDefault()
});



//register
$('#register').click((e) => {
    var email = $('#userEmail').val()
    var password=$('#userPassword').val()
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        $('form')[0].reset()
    })
    e.preventDefault()
});
