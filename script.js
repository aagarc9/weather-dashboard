//DOM element refs
let citySearch = document.getElementsByClassName("search-bar");
let searchButton = document.getElementById("btn");
let searchHistory = document.getElementById("output");

var searchHistoryArray = [];
var rootURL = 'https://api.openweathermap.org';
var apiKey = 'a4320e7ddf4416fbab75f470420a3965'


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

// function displayCity() {
//     let cityName = cityInput.value;
//     searchHistory.innerHTML = cityName
//  console.log(cityName)

//     localStorage.setItem('city', cityName)
// }
// work on local storage

function fetchApiCoords(city) {
    var apiURL = rootURL + "/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    fetch(apiURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // create a variable to grab data for the lat and lon
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            
            var mainURL = rootURL +"/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
            fetch(mainURL)
            
        })
        
};   

fetchApiCoords('Irvine')