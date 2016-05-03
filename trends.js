
//dummy scores 
var name = "Nathan";
var scores = [32, 22, 20, 16, 11, -2, -10, -9, 4, 0];
var friendName = "Vincent";
var friendScores = [42, 38, 35, 26, 2, 0];

//uses google charts (in trends.html)
function loadCharts(){
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawIndividualChart);
}

//draws a chart of the user's points over previous checkins
function drawIndividualChart() {
	var formattedData = [['Checkin', name]];

	//the earliest value displayed is 10 at most. If neither the user nor the user's friend
	//have 10 logins, it displayes the number of logins of whichever has the most
	var earliest = 10;
	if(scores.length > friendScores.length){
		earliest = scores.length;
	}
	
	for(var i = earliest; i >= 0; i--){
		var row = [earliest - i, scores[i]];
		formattedData.push(row);
	}

    var data = google.visualization.arrayToDataTable(formattedData);

    var options = {
        title: name,
        hAxis: {title: '',  titleTextStyle: {color: '#333'}},
        vAxis: {title: "Hipster Points", minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

//draws a chart comparing the user's points over previous checkins to that of one of their friends
function drawComparativeChart() {
	var formattedData = [['Checkin', name, friendName]];

	//the earliest value displayed is 10 at most. If neither the user nor the user's friend
	//have 10 logins, it displayes the number of logins of whichever has the most
	var earliest = 10;
	if(scores.length > friendScores.length){
		if(scores.length < 10)
			earliest = scores.length;
	}
	else if(friendScores.length < 10)
		earliest = friendScores.length;
	
	for(var i = earliest; i >= 0; i--){
		var row = [earliest - i, scores[i], friendScores[i]];
		formattedData.push(row);
	}

    var data = google.visualization.arrayToDataTable(formattedData);

    var options = {
        title: name,
        hAxis: {title: '',  titleTextStyle: {color: '#333'}},
        vAxis: {title: "Hipster Points", minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

