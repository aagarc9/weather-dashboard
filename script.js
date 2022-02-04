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
var mainIcon = document.getElementById("mainIcon")

var temp1 = document.getElementById("temp1"); 
var wind1 = document.getElementById("wind1");
var humidity1 = document.getElementById("humidity1");
var date1 = document.getElementById("date1");
var icon1 = document.getElementById("icon1");

var temp2 = document.getElementById("temp2"); 
var wind2 = document.getElementById("wind2");
var humidity2 = document.getElementById("humidity2");
var date2 = document.getElementById("date2");
var icon2 = document.getElementById("icon2");

var temp3 = document.getElementById("temp3"); 
var wind3 = document.getElementById("wind3");
var humidity3 = document.getElementById("humidity3");
var date3 = document.getElementById("date3");
var icon3 = document.getElementById("icon3");

var temp4 = document.getElementById("temp4"); 
var wind4 = document.getElementById("wind4");
var humidity4 = document.getElementById("humidity4");
var date4 = document.getElementById("date4");
var icon4 = document.getElementById("icon4");

var temp5 = document.getElementById("temp5"); 
var wind5 = document.getElementById("wind5");
var humidity5 = document.getElementById("humidity5");
var date5 = document.getElementById("date5");
var icon5 = document.getElementById("icon5");


var searchHistoryArray = [];
var rootURL = 'https://api.openweathermap.org';
var apiKey = 'a4320e7ddf4416fbab75f470420a3965'

// create an eventListener to start dashboard
searchButton.addEventListener('click', function() {
    var city = searchBar.value.trim();
    searchHistoryArray.push(city);
    localStorage.setItem('search-history', JSON.stringify(searchHistoryArray));
    fetchApiCoords(city);
    searchHistoryRender();
});

var savedCity = JSON.parse(localStorage.getItem("search-history"))
// create a function to display search history
function searchHistoryRender() {
    searchHistory.innerHTML ='';
    savedCity = searchHistoryArray
    for (var i = 0; i <= searchHistoryArray.length-1; i++) {
        var btn = document.createElement('button')
        btn.setAttribute('type', 'button')
        btn.textContent = searchHistoryArray[i];
        searchHistory.appendChild(btn);
        
        for (let i = 0; i <= searchHistory.childElementCount; i++) {
            if (searchHistory.children.item(i) != null) {
                searchHistory.children.item(i).addEventListener('click', function () {
                // searchHistoryArray = searchHistory.children.item(i).textContent
                fetchApiCoords(searchHistory.children.item(i).textContent);
               });
            } 
        }
    }
}

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
    mainIcon.innerHTML = " src: " + data.daily[0].weather[0].icon
    
    console.log(data.daily[1].weather[0].icon)

    $("#date1").text(moment().add(1, "days").format("(MM/DD/YYYY)"))
    temp1.innerHTML = " Temp: " + data.daily[1].temp.max + " F";
    wind1.innerHTML = " Wind: " + data.daily[1].wind_speed + " MPH";
    humidity1.innerHTML = " Humidity: " + data.daily[1].humidity + " %";
    icon1.innerHTML = " src: " + data.daily[1].weather[0].icon

    $("#date2").text(moment().add(2, "days").format("(MM/DD/YYYY)"))
    temp2.innerHTML = " Temp: " + data.daily[2].temp.max + " F";
    wind2.innerHTML = " Wind: " + data.daily[2].wind_speed + " MPH";
    humidity2.innerHTML = " Humidity: " + data.daily[2].humidity + " %";
    icon2.innerHTML = " src: " + data.daily[2].weather[0].icon

    $("#date3").text(moment().add(3, "days").format("(MM/DD/YYYY)"))
    temp3.innerHTML = " Temp: " + data.daily[3].temp.max + " F";
    wind3.innerHTML = " Wind: " + data.daily[3].wind_speed + " MPH";
    humidity3.innerHTML = " Humidity: " + data.daily[3].humidity + " %";
    icon3.innerHTML = " src: " + data.daily[3].weather[0].icon

    $("#date4").text(moment().add(4, "days").format("(MM/DD/YYYY)"))
    temp4.innerHTML = " Temp: " + data.daily[4].temp.max + " F";
    wind4.innerHTML = " Wind: " + data.daily[4].wind_speed + " MPH";
    humidity4.innerHTML = " Humidity: " + data.daily[4].humidity + " %";
    icon4.innerHTML = " src: " + data.daily[4].weather[0].icon

    $("#date5").text(moment().add(5, "days").format("(MM/DD/YYYY)"))
    temp5.innerHTML = " Temp: " + data.daily[5].temp.max + " F";
    wind5.innerHTML = " Wind: " + data.daily[5].wind_speed + " MPH";
    humidity5.innerHTML = " Humidity: " + data.daily[5].humidity + " %";
    icon5.innerHTML = " src: " + data.daily[5].weather[0].icon
}

