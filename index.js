

// luxon stuff
var DateTime = luxon.DateTime;
var localTime = DateTime.local();



//OpenWeather API stuff
//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=7e21c0e4de09b26addc591a869df87b6
var apiKey = "7e21c0e4de09b26addc591a869df87b6"
var unitType = "imperial"
    var windUnit = "mph"
    var tempUnit = "F"

var storedInfo = localStorage.getItem("mostRecent")
console.log(storedInfo)


function openWeatherCurrent() {
    var city = "hong Kong";
    if (storedInfo !== undefined && storedInfo !== null) {
        city = storedInfo;
    }
    console.log(city)
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unitType + "&appid=" + apiKey;
    $.ajax({
        url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        openWeatherWeek();
        $("#city").text(response.name);
        $("#date").text(localTime.c.month + "/" + localTime.c.day + "/" + localTime.c.year);
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $("#weather").text(response.weather[0].description);
        $("#temp").text("Temp: " + response.main.temp + "° " + tempUnit);
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind: " + response.wind.speed + windUnit);
    });
}


$(document).ready(openWeatherCurrent)
$("#mainSearch").click(openWeatherCurrent2);


function openWeatherCurrent2() {
    var city = $("#userInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unitType + "&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        latitude = response.coord.lat;
        longitude = response.coord.lon;
        openWeatherWeek();
        $("#city").text(response.name);
        $("#date").text(localTime.c.month + "/" + localTime.c.day + "/" + localTime.c.year);
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $("#weather").text(response.weather[0].description);
        $("#temp").text("Temp: " + response.main.temp + "° " + tempUnit);
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind: " + response.wind.speed + windUnit);
        localStorage.setItem ("mostRecent", city);
    });
}

var latitude = "";           //response.coord.lat
var longitude = "";          //response.coord.lon


function openWeatherWeek() {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts" + "&units=" + unitType + "&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#uv").text("UV index: " + response.current.uvi)
        setUVColor(response.current.uvi)

        for (let i = 1; i < 6; i++) {
            var dd = localTime.plus({days: i}).c.day;
            var mm = localTime.plus({days: i}).c.month;
            var yy = localTime.plus({days: i}).c.year;
            $("#date" + i).text(`${mm}/${dd}/${yy}`);
            $("#icon" + i).attr("src", `http://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}@2x.png`);
            $("#weather" + i).text( response.daily[i].weather[0].description);
            $("#temp" + i).text(`Temp: ${response.daily[i].temp.day}° ${tempUnit}/ `);
            $("#humidity" + i).text(`Humidity: ${response.daily[i].humidity}%`);
            }
    });
}



function setUVColor(UV) {

    if (UV < 3) {$("#uv").attr("class", "green")}
    else if (UV < 6 && UV >= 3) {$("#uv").attr("class", "yellow")}
    else if (UV < 8 && UV >= 6) {$("#uv").attr("class", "orange")}
    else  {$("#uv").attr("class", "red")}
    }





