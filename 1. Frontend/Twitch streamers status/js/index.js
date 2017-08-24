$(document).ready(function() {
  handleEmptyList("all");
  /* Set the behaviour of the filter buttons:
  1) make the button "active",
  2) filter channels
  3) if the filtered list is empty show a message. */
  $("#filter-all").on("click", function() {
    makeActive(this);
    $("a.list-group-item").fadeIn(400);
    handleEmptyList("all");
  });
  $("#filter-online").on("click", function() {
    makeActive(this);
    $("a.list-group-item-success").fadeIn(400); // Shows online
    $("a.list-group-item-warning").fadeOut(400);  // Hides offline
    $("a.disabled").fadeOut(400); // Hides "broken" channels
    handleEmptyList("online");
  });
  $("#filter-offline").on("click", function() {
    makeActive(this);
    $("a.list-group-item-warning").fadeIn(400);
    $("a.list-group-item-success").fadeOut(400);;
    $("a.disabled").fadeOut(400);
    handleEmptyList("offline");
  });
  
  // Gather the data for every channel
  for(var i=0; i<channelsList.length; i++) {
    getData(channelsList[i], i);  // Yay closures! God bless MDN -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Creating_closures_in_loops_A_common_mistake
  }
});

/* UPDATE: due to changes in the Twitch API now an API key is required. FCC built a workaround.
  More info -> https://blog.twitch.tv/client-id-required-for-kraken-api-calls-afbb8e95f843#.f8hipkht1
  var baseUrl = "https://api.twitch.tv/kraken/"; */
var baseUrl = "https://wind-bow.gomix.me/twitch-api/";
var channelsList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
// Uncomment these one at a time to test the "empty state"
//channelsList = [];
//channelsList = ["OgamingSC2"];
//channelsList = ["storbeck", "comster404"];

// Loads "channel" JSON to set proper image and "display name" for every channel, then checks if the channel is streaming
function getData(name, index) {
  $("#channels-list").append('<a id="ch' + index + '" href="#" class="list-group-item"></a>\n');
  
  var id = "#ch" + index; // "ch" is to make sure the element's id starts with letters
  $(id).hide(); // List item will be hidden until it is filled with API's data, look for fadeIn() in the code
  $(id).append('<div class="media">'
      + '<div class="media-left media-middle">'
      + '<img class="media-object img-thumbnail"></div>'
      + '<div class="media-body"><h4 class="media-heading"></h4>'
      + '</div></div>');
  
  // "callback=?" is used to avoid CORS errors. See https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Front-End-Project-Use-Twitchtv-JSON-API)
  $.getJSON(baseUrl + "channels/" + name + "?callback=?", function(c) {
    if(c.hasOwnProperty("error")) { // If channel does not exist
      $(id + " .media-heading").append(name);
      $(id + " .media-body").append("Channel not available.");
      $(id).addClass("disabled"); // Disable link since channel does not exist
      $(id + " img").prop("src", "http://i.imgur.com/8fzfrJ2.jpg");
      $(id + " img").prop("alt", "Channel logo not available");
      $(id).fadeIn(200);  // We are finished with this channel, show it
    }
    else { // If channel exists
      $(id + " .media-heading").text(c.display_name);
      //$(id + " img").prop("src", s.stream.preview.small);
      if(c.logo !== null) {
        $(id + " img").prop("src", c.logo);
      } else {
        // If the channel does not have an image
        $(id + " img").prop("src", "http://i.imgur.com/8fzfrJ2.jpg");
      }
      
      $(id + " img").prop("alt", "Channel logo");
      $(id).prop("href", c.url);
      $(id).prop("target", "_blank");
      getStream(name, id); // Check if the channel is streaming (another closure?)
    }
  });
}

// Checks if a channel is streaming and sets proper item color and description
function getStream(name, id) {
  $.getJSON(baseUrl + "streams/" + name + "?callback=?", function(s) {
      if(s.stream !== null) { // If the channel is streaming
        $(id).addClass("list-group-item-success");
        $(id + " .media-body").append(s.stream.game + " - " + s.stream.channel.status);
      }
      else { // If the channel is not streaming
        $(id).addClass("list-group-item-warning");
        $(id + " .media-body").append("Offline");
      }
    
      $(id).fadeIn(200); // Show the list item with an animation
    });
}

// Highlights the pressed button graphically (and resets the one previously active)
function makeActive(buttonId) {
  $(".btn-group .active").removeClass("active");
  $(buttonId).addClass("active");
}

// If the channel list is empty, shows a message
function handleEmptyList(filter) {
  if(isListEmpty(filter))
      $("#msg-empty").fadeIn(600);
    else
      $("#msg-empty").hide();
}

// Returns true if the channel list with the current filter is empty.
function isListEmpty(filter) {
  /* I'm not checking for "display: none" elements with jQuery because due to how animations work this function may be called when elements are still not considered hidden, and then not counted. */
  switch(filter) {
    case "online":
      return $("a.list-group-item-success").length == 0;
    case "offline":
      return $("a.list-group-item-warning").length == 0;
    case "all":
      return channelsList.length == 0;
    default:
      console.log("Unexpected 'filter' parameter");
  }
}