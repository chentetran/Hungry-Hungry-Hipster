
//dummy scores 
var name = "Nathan";
var scores = [32, 22, 31, 30, 25, 20, 16, 11, 4, 0];
var friendName = "Vincent";
var friendScores = [42, 38, 35, 26, 2, 0];

//uses google charts (in trends.html)
function loadChart(){
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {
	var formattedData = [['Checkin', name, friendName]];
	var i=0;
	if(scores.length > 10) //so max number of previous checkins displayed is 10
		i = scores.length - 10;
	for(i; i<scores.length; i++){
		var row = [i, scores[i], friendScores[i]];
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
