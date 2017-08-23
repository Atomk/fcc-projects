// Timer object
var tomatime = new function() {
  var timer = null; // Will be used to stop the timer
  var isRunning = false; // True if the timer is running
  var totalSeconds = 0; // Total seconds of the countdown
  var remainingSeconds = 0; // Seconds left until the countdown is finished
  var m = 0, s = 0; // minutes and seconds corresponding to the time left, used to represent time in a mm:ss format
  
  this.isTimerRunning = function() {
    return isRunning;
  };
  
  this.getSecondsString = function() {
    if(s < 10)
      return "0" + s; // Return "07" instead of "7" or "00" instead of "0"
    else
      return s;
  };
  this.getMinutesString = function() {
    if(m < 10) {
      return "0" + m;
    }
    else
      return m;
  };
  
  // Returns a percentage (1-100) based on timer progress (how much time has passed)
  this.getProgress = function() {
    // totalSeconds-remainingSeconds = passedSeconds
    // passedSeconds : x = totalSeconds : 100
    return ((totalSeconds-remainingSeconds)*100) / totalSeconds;
  };
  
  // Starts the timer, executes the callback function every second and the "finish" function at the end
  this.start = function(duration, callback, finish) {
    totalSeconds = duration;
    remainingSeconds = duration;
    m = Math.floor(totalSeconds/60);
    s = totalSeconds - (m*60);
    isRunning = true;
    callback(); // Because setInterval does not start immediately, but after 1000ms (in this case)
    
    // Thing to do once every second (1000ms)
    timer = window.setInterval(function() {
      remainingSeconds--;
      m = Math.floor(remainingSeconds/60);
      s = remainingSeconds - (m*60);
     
      callback();
      
      if(remainingSeconds === 0) {
        // Haven't found a way to call the stop() method here.
        // "this" returns the window object here (obviously, where did you think setInterval comes from?)
        isRunning = false;
        clearInterval(timer);
        finish();
      }
    }, 1000);
  };
  
  // Stops the timer.
  this.stop = function() {
    clearInterval(timer);
    isRunning = false;
  };
};


/******  VARIABLES  ******/


var sessionDuration = 25;
var breakDuration = 5;
var timerType = "session";
// Canvas stuff
var canvas = null;
var gr_ctx = null;
var sessionColor = "#E74C3C";
var breakColor = "#27AE60";
// Numbers required to draw the timer progress circle
var centerX = 0, centerY = 0, radius = 0;
var startAngle = 1.5 * Math.PI;
var progressAngle = 0;


/******  INITIALIZATION  ******/


$(document).ready(function() {
  $("#play-stop").on("click", function() {
    if($("#play-stop").hasClass("disabled") === false) {
      if(!tomatime.isTimerRunning()) {  // If timer is not already running
        startSession();
        $("#timertype").show();
        $("#showSettings").addClass("disabled");
        $("#play-stop").html('<i class="fa fa-stop" aria-hidden="true"></i>');
      }
      else { // If timer is running
        tomatime.stop();
        $("#time").text("00:00");
        $("#timertype").hide();
        
        drawTimerBackground();
        $("#showSettings").removeClass("disabled");
        $("#play-stop").html('<i class="fa fa-play" aria-hidden="true"></i>');
      }
    }
  });
  // Show/hide settings menu
  $("#showSettings").on("click", function() {
    // Show only if the button is not disabled
    if($("#showSettings").hasClass("disabled") === false) {
      $("#settings").fadeIn(80);
      $("#play-stop").addClass("disabled");  // You shouldn't be able to strart the timer while the settings menu is visible
    }
  });
  $("#closeSettings").on("click", function() {
    $("#settings").fadeOut(80);
    $("#play-stop").removeClass("disabled");
  });
  // Handle when "+" or "-" is pressed in the settings menu
  $(".btn-session").on("click", function() {
    // "this" is a DOM element
    if(this.innerHTML === "+") {
      if(sessionDuration < 60) {
        sessionDuration++;
      }
    }
    else {
      if(sessionDuration > 1) {
        sessionDuration--;
      }
    }
    
    $("#session-duration").text(sessionDuration);
  });
  $(".btn-break").on("click", function() {
    if(this.innerHTML === "+") {
      if(breakDuration < 30) {
        breakDuration++;
      }
    }
    else {
      if(breakDuration > 1) {
        breakDuration--;
      }
    }
    
    $("#break-duration").text(breakDuration);
  });
  
  $("#session-duration").text(sessionDuration);
  $("#break-duration").text(breakDuration);
  initializeCanvas();
  drawTimerBackground();
});


/******  FUNCTIONS  ******/


function initializeCanvas() {
  canvas = document.querySelector("canvas");
  gr_ctx = canvas.getContext("2d");
  gr_ctx.lineWidth = 5; // "size" of the line
  centerX = canvas.width/2;
  centerY = canvas.height/2;
  // Make the circle fill all the canvas
  radius = centerX - gr_ctx.lineWidth;
}

// Update the timer (will be called every second)
function update() {
  $("#time").text(tomatime.getMinutesString() +
                   ":" + tomatime.getSecondsString());
  /* Math.floor(tomatime.getProgress()) + "% completed" */
  
  drawTimerBackground();
  
  // Not really elegant to do this every second...
  if(timerType === "session")
    gr_ctx.strokeStyle = sessionColor; // Line color
  else
    gr_ctx.strokeStyle = breakColor;
  
  gr_ctx.beginPath();
  gr_ctx.arc(centerX, centerY, radius, startAngle,
             startAngle + progressToAngle(tomatime.getProgress()));
  gr_ctx.stroke();
}

// Draw the white "background" circle for the timer
function drawTimerBackground() {
  gr_ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas area
  gr_ctx.strokeStyle = $("body").css("color"); // Line color
  gr_ctx.beginPath();
  gr_ctx.arc(centerX, centerY, radius, 0, 2*Math.PI);
  gr_ctx.stroke();
}

// Turns a percentage value (0-100) into a angle (0-2*pi)
function progressToAngle(progress) {
  return (2*Math.PI * progress)/100;
}

function changeTimer() {
  if(timerType === "session")
    startBreak();
  else
    startSession();
}

function startSession() {
  timerType = "session";
  tomatime.start(sessionDuration*60, update, changeTimer);
  $("#timertype").css("color", sessionColor);
  $("#timertype").text("pomodoro");
}

function startBreak() {
  timerType = "break";
  tomatime.start(breakDuration*60, update, changeTimer);
  $("#timertype").css("color", breakColor);
  $("#timertype").text("break");
}