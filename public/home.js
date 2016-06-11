var myId = 0;

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

function initialize() {
    document.getElementById("namediv").style.opacity = 1;
    myId = $.urlParam('id');
    setScoreText();
}

function setScoreText() {
    $.get("trendSelf", {
            login: myId,
        },
        function(data, status) {
            var total = data.score.reduce((a, b) => a + b, 0);
            document.getElementById("scoreTxt").innerHTML += Math.floor(total);
        });
}

function goToCheckin() {
    window.location = "checkin.html?id=" + myId;
}

function goToTrend() {
    window.location = "trends.html?id=" + myId;
}