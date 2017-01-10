








var movieTitle = $('').click($('#movieTitle').text())

console.log(movieTitle)

//grabbing API JSON
function getJSON(url, cb) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', function(event){
          resolve(JSON.parse(event.target.responseText))
      }

    })
    xhr.open('GET','www.omdbapi.com/?t='${movieTitle}'&y=&plot=full&r=json')
    xhr.send()
  })
}

getJSON()
.then()
