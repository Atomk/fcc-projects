$(document).ready(function() {
  getLocation();
  
  // Switches temp unit between Celsius/Fahrenheit
  $("#btn-switch-unit").on("click", function() {
    if(currentUnit == "c") {
      $("#btn-switch-unit").text("°F");
      currentUnit = "f";
      $("#temp").text(convertKelvin(temp, currentUnit));
    }
    else {
      $("#btn-switch-unit").text("°C");
      currentUnit = "c";
      $("#temp").text(convertKelvin(temp, currentUnit));
    }
  });
});

var temp = 0;
var currentUnit = "";

function getLocation() {
  // If the protocol is HTTP, getLocation() does not work on most browsers (deprecated on insecure connections). Changing HTTP to HTTPS in this pen's address worked as a temporary solution.
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
          // At this point we have access to user's location, let's send it to the API.
          requestWeather(position.coords.latitude, position.coords.longitude);
        },
        function(error) {
          // It seems my Android (Chrome) automatically denies every geolocation request if GPS is not active
          $("#pos").html("Something went wrong...<br><hr>"
                   + "Code: " + error.code + "<br>"
                   + "<em>" + error.message + "</em>");
        }
    );
  }
  else {
    $("#pos").text("Can't get location...");
  }
}

function apiKey() {
  return "93f3a303f36333c30313239333f343f3c3d393a3e303e3d3a343c373338303d".split("").filter(function(v, i) { return i%2 === 0; }).reverse().join("");
  /* I know you can't really hide a key like this, I made it just for fun.
     You can get a free API key for your own use at https://openweathermap.org/api */
}

// Retrieves a JSON with the current weather in user's location
function requestWeather(latitude, longitude) {
  // EDIT 2017-08-23 -- Code not relevant anymore, now the API can be accessed via HTTPS!
  //var url = "https://crossorigin.me/";  // If Codepen is on HTTPS, it does not allow to get resources from a HTTP address. The OpenWeatherMap API provides only HTTP so a workaround is needed. According to crossorigin.me info you have to keep the protocol (http://) in the following API request or it does not work.
  //url += "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey();
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + apiKey();
  $.getJSON(url, function(json) {
    processData(json);
	});
}

// Fills the page with data received from API
function processData(data) {
  //console.log(JSON.stringify(data));  // Outputs the raw JSON response in console
  if(data.cod == 200) {
    $("#pos").html('<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> '
                   + data.name + ", " + data.sys.country);
    temp = data.main.temp;
    currentUnit = "c";
    $("#temp").text(convertKelvin(temp, "c"));
    $("#btn-switch-unit").show();
    $("#weather").html("<em>" + data.weather[0].description + "</em>");
    $("#icon").prop("src", "https://openweathermap.org/img/w/"
                    + data.weather[0].icon + ".png");
    changeBackground(data.weather[0].main);
  }
  else {
    // If API responded with an error
    $("#pos").html("Something went wrong...<br><hr>"
                   + "Code: " + data.cod + "<br>"
                   + "<em>" + data.message + "</em>");
  }
}

// Converts a temperature expressed in Kelvin to Fahrenheit or Celsius
function convertKelvin(temp, unit) {
  switch(unit) {
    case "c":
    case "celsius": return Math.floor(temp - 273.15);
    case "f":
    case "fahrenheit": return Math.floor((temp * 1.8) - 459.67);
    default: return temp;
  }
}

// Loads a different background image according to the weather type received from API
function changeBackground(weatherCode) {
  var baseUrl = "img/";
  switch(weatherCode) {
    case "Clear": $("body").css("background-image", "url(" + baseUrl + "Clear.png)"); break;
    case "Thunderstorm": $("body").css("background-image", "url(" + baseUrl + "Thunder.png)"); break;
    case "Clouds": $("body").css("background-image", "url(" + baseUrl + "Clouds.png)"); break;
    case "Rain": $("body").css("background-image", "url(" + baseUrl + "Rain.png)"); break;
    default: $("body").css("background-image", "none");
  }
}