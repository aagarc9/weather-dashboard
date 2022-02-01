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

searchButton.addEventListener('click', searchInput)

function searchInput() {
    var text = searchBar.value
    console.log(text)
    
}


function searchHistoryRender() {
    searchHistory.innerHTML ='';
    for (var i =searchHistoryArray.length-1; i>=0; i--) {
        var btn = document.createElement('button')
        btn.setAttribute('type', 'button')

        btn.setAttribute('data-search', searchHistoryArray[i]);
        btn.textContent = searchHistoryArray[i];
        searchHistory.append(btn)
    }
}

// two functions that will do setitem and getitem 
function saveToLocal(search){

    searchHistoryArray.push(search)
    localStorage.setItem('search-history', JSON.stringify(searchHistoryArray))
}

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


}

fetchApiCoords('london')
