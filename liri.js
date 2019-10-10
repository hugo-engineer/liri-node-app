require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
const axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');

var search1 = process.argv[2];
var search2 = process.argv.slice(3).join(" ");

var movie = () => {

  axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${search2}`)
    .then(function (response) {

      var data = response.data;
      console.log(data.Title,
        data.Year,
        data.imdbID);
    })

    
}

switch (search1) {
  case
    "concert-this": concertFun();
    break;
  case
    "spotify-this-song": spotFun();
    break;
  case
    "movie-this": movie();
    break;
  case
    "do-what-it-says": random();
    break;

}
// -----------------------------------------------------//
function concertFun() {

  axios.get(`https://rest.bandsintown.com/artists/${search2}/events?app_id=codingbootcamp`)
    .then(function (response) {

      var data = response.data;
      //TODO: console log data[0], for some reason is undefinde
      var dataDisplay = data[0].venue.name + ", " + data[0].venue.country + ", " + moment(data[0].datetime).format("D MMM YYYY") 
      console.log(dataDisplay);

      fs.appendFile("log.txt", dataDisplay, () => {});
    })
}
// -----------------------------------------------------//
function spotFun() {
  if (search2 == " ") {
    search2 = "The Sign Ace of Base";
  }
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: search2 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.tracks.items[0].artists[0].name,
      "\n",
      data.tracks.items[0].name,
      "\n",
      data.tracks.items[0].external_urls.spotify
    );
    
  });
};
// -----------------------------------------------------//


// -----------------------------------------------------//
function random() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var newData = data.split(", ");
    search2 = newData[1];
    spotFun()
  });
};
