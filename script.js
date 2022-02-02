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
    var citySearch = searchBar.value.trim();
    // savedCity.push(citySearch);
    localStorage.setItem('search-history', JSON.stringify(citySearch));
    fetchApiCoords(citySearch);
    searchHistoryRender()
});

var savedCity = JSON.parse(localStorage.getItem("search-history"))

function searchHistoryRender() {
    searchHistory.innerHTML ='';
    var savedCity = JSON.parse(localStorage.getItem("search-history"))
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
    temp1.innerHTML = data.daily[1].temp.max;
    wind1.innerHTML = data.daily[1].wind_speed;
    humidity1.innerHTML = data.daily[1].humidity;

    $("#date2").text(moment().add(2, "days").format("(MM/DD/YYYY)"))
    temp2.innerHTML = data.daily[2].temp.max;
    wind2.innerHTML = data.daily[2].wind_speed;
    humidity2.innerHTML = data.daily[2].humidity;

    $("#date3").text(moment().add(3, "days").format("(MM/DD/YYYY)"))
    temp3.innerHTML = data.daily[3].temp.max;
    wind3.innerHTML = data.daily[3].wind_speed;
    humidity3.innerHTML = data.daily[3].humidity;

    $("#date4").text(moment().add(4, "days").format("(MM/DD/YYYY)"))
    temp4.innerHTML = data.daily[4].temp.max;
    wind4.innerHTML = data.daily[4].wind_speed;
    humidity4.innerHTML = data.daily[4].humidity;

    $("#date5").text(moment().add(5, "days").format("(MM/DD/YYYY)"))
    temp5.innerHTML = data.daily[5].temp.max;
    wind5.innerHTML = data.daily[5].wind_speed;
    humidity5.innerHTML = data.daily[5].humidity;
}

