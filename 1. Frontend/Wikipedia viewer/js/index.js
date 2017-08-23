$(document).ready(function() {
  $("#searchbar").focus();  // Disable this to make editing code less annoying
  $("#results-list").hide();
  
  // Enable tooltips -> http://getbootstrap.com/javascript/#tooltips
  $("#btnsearch").tooltip({ container: "body" });
  $("#btnrandom").tooltip({ container: "body" });
  
  $("#btnrandom").on("click", function() {
    // Opens a new tab/window (depends on browser's settings) with a random Wikipedia page
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
  });
});

var baseUrl = "https://en.wikipedia.org/w/api.php";
var searchString = "";
var description = "";    // Used to handle empty article descriptions

/* Function called when the "search" button is pressed or ENTER is pressed while focus is in the form */
function checkForm() {
  // If user tries to search without writing anything in the search bar, put focus on the search bar
  if($("#searchbar").val() != "") {
    // Do nothing if user tries to search the same thing multiple times
    if(searchString != $("#searchbar").val()) {
      searchString = $("#searchbar").val();
      $("#results-list").hide(200); // Hides results with an animation
      $("#results-list").html("");  /* Deletes results of the previous search (otherwise new content would be appended to previous existing items) */
      $("#results-title").text("Searching...");
      searchWiki(searchString);
    }
  }
  else {
    $("#searchbar").focus();
  }
}

function searchWiki(search) {
  $.ajax({
    url: baseUrl,
    data: {
      action: "opensearch",
      format: "json",
      search: search, // Escaping the search string prevents from searching "Wolfgang Amadeus Mozart" and other strings with multiple words. It seems the API does not remove the percent-encoding and searches for "Wolfgang%20Amadeus%20Mozart" instead. My guess is jQuery encodes it automatically before the request so there's no need to do it. EDIT: checked the Network tab in the console, don't know if it is jQuery but the string is encoded anyway.
      //search: escape(search), /* Percent-encodes the search string */
      origin: "*" /* Needed for non-authenticated requests */
    },
    dataType: 'json',
    type: 'GET',
    headers: { 'Api-User-Agent': 'FccWikipediaViewer/1.0' },
    success: function(data) {
      //console.log(JSON.stringify(data));
      
      // data[0] contains the search string (percent-encoded)
      // data[1] is an array of titles of found pages
      // data[2] is an array of descriptions of found pages
      // data[3] is an array of links found pages
      var itemCount = data[1].length;
      
      if(itemCount > 0) {
        if(itemCount == 10) {
          // Since the API limits number of results to 10 by default
          $("#results-title").text('First 10 results for "' + searchString + '"');
        }
        else {
          $("#results-title").text(itemCount + ' results found for "' + searchString + '"');
        }
        console.log(JSON.stringify(data));
        for(var i=0; i<itemCount; i++) {
          description = data[2][i];
          if(description == "") {
            description = "<em>No description available.</em>";
          }
          // Info about this layout -> http://getbootstrap.com/components/#list-group-custom-content
          $("#results-list").append('<a href="' + data[3][i] + '" target="blank_" class="list-group-item">\n'
                                  + '<h4 class="list-group-item-heading">' + data[1][i] + '</h4>\n'
                                  + '<p class="list-group-item-text">' + description + '</p>\n'
                                  + '</a>\n');
        }
        
        $("#results-list").show(400); // Shows results with an animation
      }
      else {
        $("#results-title").text('No results for "' + searchString + '"...');
      }
    },
    error: function() {
      $("#results-title").text("Something went wrong...");
    }
  });
}