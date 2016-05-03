
//dummy scores 
var name = "Nathan";
var scores = [32, 22, 20, 16, 11, -2, -10, -9, 4, 0];
var friendName = "Vincent";
var friendScores = [42, 38, 35, 26, 2, 0];
var friends = [{name: "Vincent", scores: [42, 38, 35, 26, 2, 0]},
				{name: "Emily", scores: [55, 21, 29, 12, 11, 10, 4, 3, 2, 1, 0]},
				{name: "Liam", scores: [41, 22, 12, 2, 0]},
				{name: "Daniel", scores: [52, 38, 35, 26, 2, 0]}];

//uses google charts (in trends.html)
function loadCharts(){
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(function(){
		drawIndividualChart();
		drawFriendsChart();
	});
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
        title: "Recent Hipster Trend",
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
        title: "Recent Hipster Trend",
        hAxis: {title: '',  titleTextStyle: {color: '#333'}},
        vAxis: {title: "Hipster Points", minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

//draws a chart comparing the user's hipster score and number of checkins to that of their friends
function drawFriendsChart(){
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Checkins'); // Implicit domain label col.
	data.addColumn('number', 'Hipster Score'); // Implicit series 1 data col.
	data.addColumn({type:'string', role:'tooltip'}); //tooltip = shows up on mouseover
	data.addColumn({type:'string', role:'annotation'}); //annotation = data label

	//the user's data point (name is annotation)
	data.addRow([scores.length, scores[0], null, name]);
	//friends' data points (names are tooltip - mouseover)
	for(var i=0; i<friends.length; i++){
		data.addRow([friends[i]["scores"].length, friends[i]["scores"][0], friends[i]["name"], null]);
		//data.addRow([friends[i]["scores"].length, friends[i]["scores"][0], friends[i]["name"], friends[i]["name"]]);
	}

	var options = {
        title: 'You and Your Friends',
        hAxis: {title: 'Checkins', minValue: 0, maxValue: 10},
        vAxis: {title: 'Hipster Points', minValue: 0, maxValue: 15},
        legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div_2'));
	chart.draw(data, options);

}


