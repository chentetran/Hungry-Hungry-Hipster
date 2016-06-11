var myId = 0;
var friendName = "";

// taken from http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    else {
       return results[1] || 0;
    }
}

//uses google charts (in trends.html)
function loadCharts() {
        myId = $.urlParam('id');
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(function(){
        showScores();
		drawIndividualChart();
		drawFriendsChart();
        getFriend();
	});
}

var options = {
    title: "Recent Hipster Trend",
    hAxis: {
        textPosition: 'none',
        gridlines: {color: 'transparent'},
        baselineColor: '#FFF'
    },
    vAxis: {
        textPosition: 'none',
        gridlines: {color: 'transparent'},
        baselineColor: '#FFF'
	},
    titleTextStyle: { color: '#FFF' },
    legendTextStyle: { color: '#FFF' },
    backgroundColor: { fill:'transparent' },
    colors: ['#60c2b1', '#ecad00', '#05ed90']
};

var optionsScatter = {
    title: "Average Hipster Score",
    hAxis: {
        gridlines: {color: 'transparent'},
        textStyle:{color: '#FFF'},
        titleTextStyle: {color:'#FFF'},
        title: "number of checkins",
        baselineColor: '#FFF'
    },
    vAxis: {
        gridlines: {color: 'transparent'},
        color: '#FFF',
        textStyle:{color: '#FFF'},
        titleTextStyle: {color:'#FFF'},
        title: "average score",
        baselineColor: '#FFF'
    },
    titleTextStyle: { color: '#FFF' },
    legendTextStyle: { color: '#FFF' },
    backgroundColor: { fill:'transparent' },
    colors: ['#60c2b1', '#ecad00', '#05ed90']
};

function showScores() {
    $.get("trendSelf", {
            login: myId,
        },
        function(data, status) {
            var total = 0;
            var numElems = data.score.length;
            for(var i = 0; i < numElems; i++) {
                total += data.score[i];
            }

            $(document).ready(function(){
                $("#total_score").append(Math.floor(total));
                $("#avg_score").append((total / numElems).toFixed(2));
            });
    });
}

//draws a chart of the user's points over previous checkins
function drawIndividualChart() {
    $.get("trendSelf", {
            login: myId,
        },
        function(data, status) {
            var formattedData = [['Checkin', data.name]];

            //the chart displays at most 10 checkins
            var earliest = 10;
            if(data.score.length < 10){
                earliest = data.score.length;
            }
            
            for(var i = earliest; i >= 0; i--){
                var row = [earliest - i, Math.floor(data.score[i])];
                formattedData.push(row);
            }

            var data = google.visualization.arrayToDataTable(formattedData);
            var chart = new google.visualization.AreaChart(document.getElementById('chart_div_line'));
            chart.draw(data, options);
    });
}

function getFriend() {
    $(document).ready(function(){
        $( "#comp_friend" ).keypress(function() {
            if ( event.which == 13 ) {	//enter key
                var friend = $("#comp_friend").val();
                friendName = friend;
                $('#comp_friend').val('');
                drawComparativeChart();
            }
        });
    });
}

//draws a chart comparing the user's points over previous checkins to that of one of their friends
function drawComparativeChart() {
    $.get("trendCompare", {
        	login: myId,
        	friend: friendName
    	},
	    function(data, status){
	    	var formattedData = [['Checkin', data.name, friendName]];

	    	//the earliest value displayed is 10 at most. If neither the user nor the user's friend
	    	//have 10 logins, it displayes the number of logins of whichever has the most
	    	var earliest = 10;
	    	if(data.score[0].length > data.score[1].length){
	    		if(data.score[0].length < 10)
	    			earliest = data.score[0].length;
	    	}
	    	else if(data.score[1].length < 10)
	    		earliest = data.score[1].length;
	    	
	    	for(var i = earliest; i >= 0; i--){
	    		var row = [earliest - i, Math.floor(data.score[0][i]), Math.floor(data.score[1][i])];
	    		formattedData.push(row);
	    	}

	        var data = google.visualization.arrayToDataTable(formattedData);

	        var chart = new google.visualization.AreaChart(document.getElementById('chart_div_line'));
	        chart.draw(data, options);
	});
}

function drawFriendsChart(){
    $.get("trendEveryone", {},
	    function(data, status){
	    	var dataTable = new google.visualization.DataTable();
	    	dataTable.addColumn('number', 'Checkins'); // Implicit domain label col.
	    	dataTable.addColumn('number', 'Hipster Score'); // Implicit series 1 data col.
	    	dataTable.addColumn({type:'string', role:'tooltip'}); //tooltip = shows up on mouseover
	    	dataTable.addColumn({type:'string', role:'annotation'}); //annotation = data label

	    	//friends' data points (names are tooltip - mouseover)
	    	for(var i = 0; i < data.length; i++){
	            var totalScore = 0;
	            var numElems = data[i]["scores"].length
	            for(var j = 0; j < numElems; j++){
	                totalScore = totalScore + data[i]["scores"][j];
	            }

	            var avg = parseFloat((totalScore / numElems).toFixed(2));

	            if(data[i].facebookId == myId) {
	                dataTable.addRow([data[i]["scores"].length, avg, data[i]["scores"].length + " checkins. Hipster score: " + avg, data[i]["name"]]);
	            }
	            else {
	                dataTable.addRow([data[i]["scores"].length, avg, data[i]["name"], null]);
	            }
	    	}
	        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div_scatter'));
	    	chart.draw(dataTable, optionsScatter);
    });
}
