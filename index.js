




//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=7e21c0e4de09b26addc591a869df87b6



var apiKey = "7e21c0e4de09b26addc591a869df87b6"
var unitType = "imperial"

function OpenWeatherCurrent() {
    var city = "beijing"           //$(this).attr("data-name");
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unitType + "appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)

    });
  }

  function OpenWeatherWeek() {
    var latitude = ""           
    var longitude = ""
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts" + "&units=" + unitType + "appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response.main.temp)

    });
  }



