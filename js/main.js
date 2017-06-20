// Remember XHMLHTTP requests are asynchronous!!
function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
	            var res = xhr.responseText;
	            // Executes your callback with the
	            // response already parsed into JSON
                callback(JSON.parse(res));
            } else { // Server responded with some error
                //console.error(xhr.statusText);
                
                
            } // End of verifying response status
        } // Please read: http://www.w3schools.com/ajax/...
          // .../ajax_xmlhttprequest_onreadystatechange.asp
    }; // End of what to do when the response is answered
    
    // What to do if there's an error with the request
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    }; // End of error handling
    
    // Send the request to the server
    xhr.send(null);
} // End of getJSON function

//================================================//
//        EXAMPLE OF USE WITH GITHUB API          //
//================================================//
var apiURL = "http://pcbbot-staging.mybluemix.net/statistics";

var sample = JSON.parse('{"status": "success", "command": "statistics", "errorMessage": "", "data": {"statistics": {"feedback": {"total": 32, "weekly": [0, 0, 13, 0, 0, 0, 19]}, "labels": {"distribution": [168, 11, 12, 9, 24, 12, 10, 10, 24, 0, 9, 19, 64, 45, 11, 1, 3, 8, 8, 7, 8, 5, 38, 6], "total": 512}, "agent": {"total": 11, "weekly": [0, 0, 4, 1, 1, 2, 3]}, "unmatched": {"total": 44, "weekly": [0, 0, 6, 0, 0, 4, 34]}, "matched": {"total": 468, "weekly": [0, 0, 102, 2, 3, 57, 304]}, "unique": {"total": 512, "weekly": [0, 0, 108, 2, 3, 61, 338]}, "users": {"total": 34, "weekly": [0, 0, 5, 1, 1, 5, 22]}}}, "statusCode": 200}');

/*getJSON(apiURL, function(apiURL) {
    console.log(apiURL.statistics.users.total);
}); // End of request*/

/*console.log(apiURL.data.statistics.users.weekly);*/

function myCallback(link) {
    console.log(link.data.statistics.users.weekly);
    //this will give total number of users
}
myCallback(sample);

//show a arr of a the last  7 week days like this [6, 0, 1, 2, 3, 4, 5](the last day is today, which is friday)
var week = [];
var getLastWeek = function () {
    var today = new Date();
    var todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    for (var i = 0; i < 7; i++) {
        var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);

        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        week.push(weekday[day.getDay()]);
    }
    week = week.reverse();

}();



//chart 1
var chartDataQ1, chartDataTotalQ1, chartDataA1, chartDataTotalA1;
var CHART1 = document.getElementById("lineChart1");
var lineChart1 = new Chart(CHART1, {

    type: 'line',
    data: {
        labels: week,
        datasets: [{
            label: 'Queries',
            data: chartDataQ1,
            backgroundColor: "rgba(41, 128, 185, 0.5)"
    }, {
            label: 'Answers',
            data: chartDataA1,
            backgroundColor: "rgba(22, 160, 133, 0.5)"
    }]
    }

})

document.getElementById('lineChart1-total').textContent = "Total: Queries " + chartDataTotalQ1 + ", Answers " + chartDataTotalA1;


//chart 2
var chartData2, chartDataTotal2;
var CHART2 = document.getElementById("lineChart2");
var lineChart2 = new Chart(CHART2, {

    type: 'bar',
    data: {
        labels: week,
        datasets: [{
            label: 'Bot-to-Agent Transfers',
            //agent.weekly
            data: chartData2,
            backgroundColor: "rgba(142, 68, 173, 0.6)"
    }]
    }
})
document.getElementById('lineChart2-total').textContent = "Total: " + chartDataTotal2;

//chart 3

var chartDataTotal3, chartData3;
var CHART3 = document.getElementById("lineChart3");
var lineChart3 = new Chart(CHART3, {

    type: 'line',
    data: {
        labels: week,
        //
        datasets: [{
            label: 'Number of Unique Users',
            data: chartData3,
            backgroundColor: "rgba(243, 156, 18, 0.6)"
    }]
    }
})
document.getElementById('lineChart3-total').textContent = "Total: " + chartDataTotal3;


//chart 4
var chartData4, chartDataTotal4;
var chartLabels4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var CHART4 = document.getElementById("lineChart4");
var lineChart4 = new Chart(CHART4, {

    type: 'bar',
    data: {
        labels: chartLabels4,
        datasets: [{
            label: 'Question Distribution',
            data: chartData4, //labels.distribution
            backgroundColor: "rgba(192, 57, 43, 0.6)"
    }]
    }
})
document.getElementById('lineChart4-total').textContent = "Total: " + chartDataTotal4;


function myCallback(link) {

    //chart1
    chartDataQ1 = link.data.statistics.unique.weekly;
    chartDataTotalQ1 = link.data.statistics.unique.total;
    chartDataA1 = link.data.statistics.matched.weekly;
    chartDataTotalA1 = link.data.statistics.matched.total;

    //chart2
    chartData2 = link.data.statistics.agent.weekly;
    chartDataTotal2 = link.data.statistics.agent.total;

    //chart3
    chartData3 = link.data.statistics.users.weekly;
    chartDataTotal3 = link.data.statistics.users.total;

    //chart4
    chartData4 = link.data.statistics.labels.distribution;
    chartDataTotal4 = link.data.statistics.labels.total;
    //this will give total number of users
}
myCallback(apiURL);
