//DOM element refs
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("btn");
var searchHistory = document.getElementById("output");
var displayCity = document.getElementById('main-city');
var displayTime = document.getElementById("date")
var tempMain = document.getElementById("temp"); 
var windMain = document.getElementById("wind");
var humidityMain = document.getElementById("humidity");
var uvindex = document.getElementById("uvindex");

var temp1 = document.getElementById("temp1"); 
var wind1 = document.getElementById("wind1");
var humidity1 = document.getElementById("humidity1");
var date1 = document.getElementById("date1");

var temp2 = document.getElementById("temp2"); 
var wind2 = document.getElementById("wind2");
var humidity2 = document.getElementById("humidity2");
var date2 = document.getElementById("date2");

var temp3 = document.getElementById("temp3"); 
var wind3 = document.getElementById("wind3");
var humidity3 = document.getElementById("humidity3");
var date3 = document.getElementById("date3");

var temp4 = document.getElementById("temp4"); 
var wind4 = document.getElementById("wind4");
var humidity4 = document.getElementById("humidity4");
var date4 = document.getElementById("date4");

var temp5 = document.getElementById("temp5"); 
var wind5 = document.getElementById("wind5");
var humidity5 = document.getElementById("humidity5");
var date5 = document.getElementById("date5");

var searchHistoryArray = [];
var rootURL = 'https://api.openweathermap.org';
var apiKey = 'a4320e7ddf4416fbab75f470420a3965'

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    var searchHistoryArray = searchBar.value.trim();
    localStorage.setItem('search-history', JSON.stringify(searchHistoryArray));
    fetchApiCoords(searchHistoryArray);
    searchHistoryRender()
});

var savedCity = JSON.parse(localStorage.getItem("search-history"))

function searchHistoryRender() {
    searchHistory.innerHTML ='';
    savedCity = searchHistoryArray
    for (var i = 0; i <= searchHistoryArray.length; i++) {
        var btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.textContent = searchHistoryArray[i];
        searchHistory.append(btn)
    }
}

// two functions that will do setitem and getitem 
// function saveToLocal(search){

//     searchHistoryArray.push(search)
//     localStorage.setItem('search-history', JSON.stringify(searchHistoryArray))
// }

// create a function to display search history. 
// button.addEventListener('click', displayCity)

var currentDate = moment();
$("#date").text(currentDate.format("(MM/DD/YYYY)"));


function fetchApiCoords(city) {
    var apiURL = rootURL + "/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            // create a variable to grab data for the lat and lon
            var lon = data.coord.lon;
            var lat = data.coord.lat;

            displayCity.innerHTML = data.name;
            
            var mainURL = rootURL +"/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(mainURL)
            .then(function (response) {
                return response.json()
            })
            .then (function (data) {
                console.log(data)
                showWeather(data)
            })
        })
        
};   

function showWeather(data) {
    tempMain.innerHTML = " Temp: " + data.current.temp + " F";
    windMain.innerHTML = "Wind: " + data.current.wind_speed + " MPH";
    humidityMain.innerHTML = " Humidity: " + data.current.humidity + " %";
    uvindex.innerHTML = " UV index: " + data.current.uvi + "";

    $("#date1").text(moment().add(1, "days").format("(MM/DD/YYYY)"))
    temp1.innerHTML = " Temp: " + data.daily[1].temp.max + " F";
    wind1.innerHTML = " Wind: " + data.daily[1].wind_speed + " MPH";
    humidity1.innerHTML = " Humidity: " + data.daily[1].humidity + " %";

    $("#date2").text(moment().add(2, "days").format("(MM/DD/YYYY)"))
    temp2.innerHTML = " Temp: " + data.daily[2].temp.max + " F";
    wind2.innerHTML = " Wind: " + data.daily[2].wind_speed + " MPH";
    humidity2.innerHTML = " Humidity: " + data.daily[2].humidity + " %";

    $("#date3").text(moment().add(3, "days").format("(MM/DD/YYYY)"))
    temp3.innerHTML = " Temp: " + data.daily[3].temp.max + " F";
    wind3.innerHTML = " Wind: " + data.daily[3].wind_speed + " MPH";
    humidity3.innerHTML = " Humidity: " + data.daily[3].humidity + " %";

    $("#date4").text(moment().add(4, "days").format("(MM/DD/YYYY)"))
    temp4.innerHTML = " Temp: " + data.daily[4].temp.max + " F";
    wind4.innerHTML = " Wind: " + data.daily[4].wind_speed + " MPH";
    humidity4.innerHTML = " Humidity: " + data.daily[4].humidity + " %";

    $("#date5").text(moment().add(5, "days").format("(MM/DD/YYYY)"))
    temp5.innerHTML = " Temp: " + data.daily[5].temp.max + " F";
    wind5.innerHTML = " Wind: " + data.daily[5].wind_speed + " MPH";
    humidity5.innerHTML = " Humidity: " + data.daily[5].humidity + " %";
}

