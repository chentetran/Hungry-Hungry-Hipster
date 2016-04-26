var yelpAuth = {
    //
    // Update with your auth tokens.
    //
    consumerKey : "at1SvYDKmyRuCiJlorSTwA",
    consumerSecret : "WQxFPhrek1o0mWi1qYb8Mgt1HHQ",
    accessToken : "jbVh62IqYFHRWaLVbGXQNBRSmBlRPfan",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret : "A5hnX_e2BFtYkTr1ozUqdZp_PN0",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

var terms = 'coffee';
var latitude;
var longitude;
var max_radius = 1000;

// gets geolocation and sends the data to Yelp using a helper function
function initialize() {
    document.getElementById("loadingindicator").style.opacity = 1;
    document.getElementById("namediv").style.opacity = 1;
    // document.getElementById("badge").hidden = true;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                // myLocation = position.coords;
                
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                talkToYelp();
        });
    } else {
            console.log("Geolocation not supported in this browser.\n");
    }
}

// gets nearby restaurants from yelp for the user to select given the user's
// current location
function talkToYelp() {

    var accessor = {
        consumerSecret : yelpAuth.consumerSecret,
        tokenSecret : yelpAuth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['sort', 1]);
    parameters.push(['radius_filter', max_radius]);
    // parameters.push(['limit', 5]);
    parameters.push(['ll', latitude + "," + longitude]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', yelpAuth.consumerKey]);
    parameters.push(['oauth_consumer_secret', yelpAuth.consumerSecret]);
    parameters.push(['oauth_token', yelpAuth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action' : 'http://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };

    // console.log(JSON.stringify(parameters)); // debug output

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);

    $.ajaxSetup({'cache':true})
    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
            // console.log(data); // debug output
            var places = data.businesses;
            var averageReviews = 0;
            var i = 0;
            for (i in places) {
                if (places[i].distance <= max_radius)
                    averageReviews += places[i].review_count;

                generateButton(i, places);
            }
            averageReviews /= i;
            // console.log(averageReviews); // debug output

            document.getElementById("loadingindicator").style.opacity = 0;
            document.getElementById("mainBody").style.opacity = 1;
            setTimeout(function(){ document.getElementById("loadingindicator").hidden = true; }, 1000);
        },
    });
}

// adds a button to the HTML page
function generateButton(i, places) {
        if (i < 5) {
            var brTag = document.createElement('br');
            var button = document.createElement("BUTTON");
            button.className = "btn btn-lg";
            button.style.position = 'static';
            var name = places[i].name;
            button.appendChild(document.createTextNode(places[i].name));
            button.onclick = function() {
                calculateScore(algorithm(places, places[i]));
            };
            document.getElementById("mainBody").appendChild(button);
            document.getElementById("mainBody").appendChild(brTag);
        }
}


function calculateScore(score) {
    document.getElementById("mainBody").style.opacity = 0;
    document.getElementById("badge").hidden = false;
    setTimeout(function(){
        document.getElementById("badge").style.opacity = 1;
        document.getElementById("badge").style.transform = "rotateY(0deg)";
        document.getElementById("badge").innerHTML += Math.floor(score);
        document.getElementById("mainBody").hidden = true;

        if (score < 0) {
            document.getElementById("badgeimg").src = "images/badge/7-hipstercrite.png";
        } else if (score < 10) {
            document.getElementById("badgeimg").src = "images/badge/0-none.png";
        } else if (score < 20) {
            document.getElementById("badgeimg").src = "images/badge/1-star.png";
        } else if (score < 30) {
            document.getElementById("badgeimg").src = "images/badge/2-star.png";
        } else if (score < 40) {
            document.getElementById("badgeimg").src = "images/badge/3-star.png";
        } else if (score < 50) {
            document.getElementById("badgeimg").src = "images/badge/4-hipster.png";
        } else if (score < 60) {
            document.getElementById("badgeimg").src = "images/badge/5-hipster.png";
        } else {
            document.getElementById("badgeimg").src = "images/badge/6-hipster.png";
        }
    }, 1000);
    console.log(score);
}