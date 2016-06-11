var myId = 0;
var terms = 'food';
var latitude;
var longitude;
var max_radius = 1000;

// taken from http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    else {
       return results[1] || 0;
    }
}

function goToTrend() {
    window.location = "trends.html?id=" + myId;
}

// gets geolocation and sends the data to Yelp using a helper function
function initialize() {
    document.getElementById("loadingindicator").style.opacity = 1;
    document.getElementById("namediv").style.opacity = 1;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            talkToYelp();
        });
    } 
    else {
        console.log("Geolocation not supported in this browser.\n");
    }
    myId = $.urlParam('id');
}

// gets nearby restaurants from yelp for the user to select given the user's
// current location
function talkToYelp() {
    parameters = [];
    parameters.push(['lng', longitude]);
    parameters.push(['lat', latitude]);

    var message = {
        'action': 'getRestaurants',
        'method': 'GET',
        'parameters': parameters
    };

    var parameterMap = OAuth.getParameterMap(message.parameters);

    $.ajaxSetup({
        'cache': true
    })
    $.ajax({
        'url': message.action,
        'data': parameterMap,
        'success': function(data, textStats, XMLHttpRequest) {
            var places = data;
            var averageReviews = 0;
            var i = 0;
            for (i in places) {
                for (var j = Number(i) + 1; j < places.length; j++) {
                    if (j == places.length) { //when i is on the last element of array, nothing to compare
                        break;
                    }
                    if (places[i].id == places[j].id) {
                        places.splice(j, 1);
                    }
                }
                if (places[i].distance <= max_radius) {
                    averageReviews += places[i].review_count;
                }
                generateButton(i, places);
            }
            averageReviews /= i;

            document.getElementById("loadingindicator").style.opacity = 0;
            document.getElementById("mainBody").style.opacity = 1;
            setTimeout(function() {
                document.getElementById("loadingindicator").hidden = true;
            }, 1000);
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
    setTimeout(function() {
        document.getElementById("badge").style.opacity = 1;
        document.getElementById("badge").style.transform = "rotateY(0deg)";
        document.getElementById("hScoreText").innerHTML += Math.floor(score);
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

        $.post("sendScore", {
                login: myId,
                score: score
            },
            function(data, status) {});

    }, 1000);
}