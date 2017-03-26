var Twitter = require('twitter'); //node module to interact with Twitter API
var spotify = require('spotify'); //node module to interact with Spotify API
var request = require('request'); //node module to send request to console
var fs = require("fs"); //used to read file contents from file system
var keys = require('./keys.js'); //holds twitter API key values
var twitterKeysArray = []; //array to hold each key returned from keys file
var userChoice= [];

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'file', filename: 'logs/liriLog.log', category: 'liriLogs' }
  ]
});

var logger = log4js.getLogger('liriLogs');

//loop through obj returned from keys to populate array of keys to use later when calling twitter API
for (prop in keys.twitterKeys) {
    twitterKeysArray.push(keys.twitterKeys[prop]);
}

var appToRun = process.argv[2];
for (i = 3; i < process.argv.length; i++) {
    userChoice.push(process.argv[i]);
}

var choice = userChoice.join(' ');

if (appToRun == 'my-tweets') {
    logger.info('Tweets:');
    generateTwitterRequest(twitterKeysArray);

} else if (appToRun == 'spotify-this-song') {
    console.log('Spotify:');
    generateSpotifyRequest(choice);

} else if (appToRun == 'movie-this') {
    console.log('Movie:');
    generateIMDBRequest(choice);

} else if (appToRun == 'do-what-it-says') {
    console.log('Do what it says:');
    doWhatItSays();

}

//uses Twitter node module to grab data from Twitter API using personal keys
function generateTwitterRequest(twitterKeysArray) {
    var client = new Twitter({
        consumer_key: twitterKeysArray[0],
        consumer_secret: twitterKeysArray[1],
        access_token_key: twitterKeysArray[2],
        access_token_secret: twitterKeysArray[3]
    });

    var params = {screen_name: 'h0ptimum'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log('=======================');
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log('=======================');
                console.log('');
                //redirect to log file
                logger.info('=======================');
                logger.info(tweets[i].text);
                logger.info(tweets[i].created_at);
                logger.info('=======================');
                logger.info('');
            }
        }
    });
}

//uses Spoity node module to grab data from Spotify based on user input from cmd line
function generateSpotifyRequest(choice) {

    if (choice == '') {
        choice = 'Ace of Base The Sign';
    }

    spotify.search({ type: 'track', query: choice}, function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('=======================');
        console.log("Artist: " + data.tracks.items[1].artists[0].name);
        console.log("Song Name: " + data.tracks.items[1].name);
        console.log("Link to Song: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[1].album.name);
        console.log('=======================');
        //redirect to log file
        logger.info('=======================');
        logger.info("Artist: " + data.tracks.items[1].artists[0].name);
        logger.info("Song Name: " + data.tracks.items[1].name);
        logger.info("Link to Song: " + data.tracks.items[0].external_urls.spotify);
        logger.info("Album: " + data.tracks.items[1].album.name);
        logger.info('=======================');
    });
}

//uses Request node module to make a request to IMDB to get movie details based on user input from cmd line
function generateIMDBRequest(choice) {
    if (choice == '') {
        choice = 'Mr. Nobody';
    }
    request('http://www.omdbapi.com/?t=' + choice + '&tomatoes=true&r=json', function (error, response, body) {
        var movieResponse = JSON.parse(body);
        console.log('=======================');
        console.log('Title: ' + movieResponse.Title);
        console.log('Year: ' + movieResponse.Year);
        console.log('IMDB Rating: ' + movieResponse.imdbRating);
        console.log('Country: ' + movieResponse.Country);
        console.log('Language: ' + movieResponse.Language);
        console.log('Plot: ' + movieResponse.Plot);
        console.log('Actors: ' + movieResponse.Actors);
        console.log('Rotten Tomatoes Rating: ' + movieResponse.tomatoRating);
        console.log('Rotten Romatoes URL: ' + movieResponse.tomatoURL);
        console.log('=======================');
        //redirect to log file
        logger.info('=======================');
        logger.info('Title: ' + movieResponse.Title);
        logger.info('Year: ' + movieResponse.Year);
        logger.info('IMDB Rating: ' + movieResponse.imdbRating);
        logger.info('Country: ' + movieResponse.Country);
        logger.info('Language: ' + movieResponse.Language);
        logger.info('Plot: ' + movieResponse.Plot);
        logger.info('Actors: ' + movieResponse.Actors);
        logger.info('Rotten Tomatoes Rating: ' + movieResponse.tomatoRating);
        logger.info('Rotten Romatoes URL: ' + movieResponse.tomatoURL);
        logger.info('=======================');
        
    });
}

//reads from a text file on the file system to grab data from Spotify using hard coded value
function doWhatItSays() {
    var song;
    //read random.txt file
    fs.readFile('random.txt', 'utf8', function(err, data){
        var dataArray = data.split(',');
        song = dataArray[1];
        generateSpotifyRequest(song);
    });
}