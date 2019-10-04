// questions
// How work with one or two search terms



require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
const axios = require('axios');
var Spotify = require('node-spotify-api');

var search1 = process.argv[2];
var search2Word1 = process.argv[3];
var search2Word2 = process.argv[4];
var search2 = search2Word1 + " " + search2Word2;


switch (search1) {
  case 
  "concert-this" : concertFun();
  break;
  case 
  "spotify-this-song" : spotFun();
  break; 
  case 
  "movie-this" : console.log("movie-this");
  break; 
  case 
  "do-what-it-says" : console.log("do-what-it-says");
  break; 

}

function spotFun (){
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: search2 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log(data.tracks.items[0].artists[0].name); 
    console.log(data.tracks.items[0].artists[0]);    
   
    });
}


function concertFun () {
  axios.get(`https://rest.bandsintown.com/artists/${search2}/events?app_id=codingbootcamp`)
  .then(function (response) {
    
    console.log(response.test.offers);
  })
}






  // var moment = require('moment');
// moment().format();

// console.log(keys);
