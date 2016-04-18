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

var terms = 'food';
var latitude;
var longitude;
var max_radius = 1000;

// gets geolocation and sends the data to Yelp using a helper function
function initialize() {
    document.getElementById("loadingindicator").style.opacity = 1;
    document.getElementById("namediv").style.opacity = 1;
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

    console.log(JSON.stringify(parameters)); // debug output

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
            console.log(data); // debug output
            var places = data.businesses;
            var averageReviews = 0;
            var i = 0;
            for (i in places) {
                if (places[i].distance <= max_radius)
                    averageReviews += places[i].review_count;

                generateButton(i, places);
            }
            averageReviews /= i;
            console.log(averageReviews); // debug output

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
                console.log(JSON.stringify(places[i])); // placeholder output
                console.log(algorithm(places, places[i]));
            };
            document.getElementById("mainBody").appendChild(button);
            document.getElementById("mainBody").appendChild(brTag);
        }
}