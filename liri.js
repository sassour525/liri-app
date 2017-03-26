var Twitter = require('twitter'); //node module to interact with Twitter API
var spotify = require('spotify'); //node module to interact with Spotify API
var request = require('request'); //node module to send request to console
var fs = require("fs"); //used to read file contents from file system
var keys = require('./keys.js'); //holds twitter API key values
var twitterKeysArray = []; //array to hold each key returned from keys file

//loop through obj returned from keys to populate array of keys to use later when calling twitter API
for (prop in keys.twitterKeys) {
    twitterKeysArray.push(keys.twitterKeys[prop]);
}

var appToRun = process.argv[2];
var userChoice = process.argv[3];

if (appToRun == 'my-tweets') {
    console.log('tweets');
    generateTwitterRequest();

} else if (appToRun == 'spotify-this-song') {
    console.log('spotify');
    generateSpotifyRequest(userChoice);

} else if (appToRun == 'movie-this') {
    console.log('movie');
    generateIMDBRequest(userChoice);

} else if (appToRun == 'do-what-it-says') {
    console.log('do what');
    doWhatItSays();

}

//uses Twitter node module to grab data from Twitter API using personal keys
function generateTwitterRequest() {

}

//uses Spoity node module to grab data from Spotify based on user input from cmd line
function generateSpotifyRequest(choice) {

}

//uses Request node module to make a request to IMDB to get movie details based on user input from cmd line
function generateIMDBRequest(choice) {

}

//reads from a text file on the file system to grab data from Spotify using hard coded value
function doWhatItSays() {
    var song;
    //read random.txt file
    fs.readFile('random.txt', 'utf8', function(err, data){
        var dataArray = data.split(',');
        var command = dataArray[0];
        song = dataArray[1];
    });
    generateSpotifyRequest(song);
}