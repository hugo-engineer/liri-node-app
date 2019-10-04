var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'e24285ebb31d472684cdcf7668303b16',
  secret: '8191f429294448aa99de7c053dfd94b4'
});

 
spotify.search({ type: 'track', query: 'maestro the holiday' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data[0]); 
});