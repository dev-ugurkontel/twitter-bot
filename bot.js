// Twitter Bot (Retweet and Add Favorite) ==========================

// Extras ==========================
// most popular twitter hashtags for coding, programing, developers and more
// #coding, #programming, #programmer, #developer, #python, #code, #javascript, #coder, #software, #webdesign, #computerscience
// #technology, #codinglife, #java, #html, #webdeveloper, #tech, #webdevelopment, #css, #softwaredeveloper, #programmers
// #linux, #softwareengineer, #php, #programmingmemes, #machinelearning, #programminglife, #codingisfun, #development, #bhfyp

// Dependencies =========================
var twit = require('twit'), config = require('./config');

var twitterApi = new twit(config);

// General Functions =========================
function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 

    if (month.toString().length == 1) {
        month = ('0' + month);
    }

    if (day.toString().length == 1) {
        day = ('0' + day);
    }   

    if (hour.toString().length == 1) {
        hour = ('0' + hour);
    }

    if (minute.toString().length == 1) {
        minute = ('0' + minute);
    }

    if (second.toString().length == 1) {
        second = ('0' + second);
    }   

    var dateTime = (year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second);   

    return dateTime;
}

function randomIndex (arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
};

// retweet request counts
var countRetweet = 1;

// favorite request counts
var countFavorite = 1;

// get program start date
var startDate = getDateTime();

// api request result types
const resultTypes = [
    "recent", "mixed", "popular"
];

// most popular twitter hashtags for coding, programing, developers and more
const hashtags = [    
    "#coding", "#programming", "#programmer", "#developer", "#python", "#code", "#javascript", "#coder", "#software", "#webdesign", "#computerscience",
    "#technology", "#codinglife", "#java", "#html", "#webdeveloper", "#tech", "#webdevelopment", "#css", "#softwaredeveloper", "#programmers",
    "#linux", "#softwareengineer", "#php", "#programmingmemes", "#machinelearning", "#programminglife", "#codingisfun", "#development", "#bhfyp" 
];

// Retweet Program =========================
var retweet = function() {

    // get current date
    let date = getDateTime();

    console.log(date + ' - ######### Retweet, ' + startDate + ' tarihinde başladığından beri ' + countRetweet++ + '. istek yapıldı. #########');

    // params
    var params = {
        q: (randomIndex(hashtags) + ', ' + randomIndex(hashtags)),
        //result_type: randomIndex(resultTypes),
        result_type: 'recent',
        lang: 'en'
    }

    // get tweets with params
    twitterApi.get('search/tweets', params, function(err, data) {

        // find tweets
        var tweet = data.statuses;
        var randomRetweet = randomIndex(tweet);

        // for retweet
        // if randomRetweet tweet exists
        if (typeof randomRetweet != 'undefined') {

            // for retweet
            twitterApi.post('statuses/retweet/:id', { id: randomRetweet.id_str }, function(err, response) {

                if (err)
                    console.log(date + ' - Aynı tweet tekrar retweet yapılmaya çalışıldı.');                    
                else
                    if (response)
                        console.log(date + ' - Retweet başarıyla yapıldı.');

            });

        } else 
            console.log(date + ' - Retweet için tweetler alınırken bir hata oluştu.');

    });

};

// Favorite Program =========================
var favorite = function() {

    // get current date
    let date = getDateTime();

    console.log(date + ' - @@@@@@@@@ Favorite, ' + startDate + ' tarihinde başladığından beri ' + countFavorite++ + '. istek yapıldı. @@@@@@@@@');

    // params
    var params = {
        q: (randomIndex(hashtags) + ', ' + randomIndex(hashtags)),
        //result_type: randomIndex(resultTypes),
        result_type: 'recent',
        lang: 'en'
    }

    // get tweets with params
    twitterApi.get('search/tweets', params, function(err, data) {

        // find tweets
        var tweet = data.statuses;
        var randomFavorite = randomIndex(tweet);

        // for add favorite
        // if randomFavorite tweet exists
        if (typeof randomFavorite != 'undefined') {

            // for add favorite
            twitterApi.post('favorites/create', { id: randomFavorite.id_str }, function(err, response) {

                if (err) 
                    console.log(date + ' - Tweet favoriye eklenirken hata oluştu.');
                 else 
                    if (response)
                        console.log(date + ' - Tweet başarıyla favoriye alındı.');                

            });

        } else 
            console.log(date + ' - Favoriye eklenecek tweet için tweetler alınırken bir hata oluştu.');

    });

};

// retweet in startup
retweet();

// retweet in every random 40 seconds
setInterval(retweet, (40 * 1000));

// favorite in startup
favorite();

// favorite in every random 90 seconds
setInterval(favorite, (90 * 1000));