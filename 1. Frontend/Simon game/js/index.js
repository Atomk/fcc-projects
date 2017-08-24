var winningSteps; // Contains the whole sequence required to win
var winAnimation = [3,2,0,1,3,2,0,1,3,2,0,1,3,2,0,1,3,2,0,1];
var level;  // Number of steps to guess
var toGuess; // Index of the step you are expected to guess 
var strictMode = false;
var inputAllowed = false; // FALSE if the game is showing the pattern to the user (the user shouldn't be able to press buttons)
var animSlow = 400;

$(document).ready(function() {
  disableInput();
  
  $("#start").on("click", function() {
    clearAllTimeouts(); // Avoids bugs if the start button is pressed while some animations or events are going on or are planned with the setTimeout (for example if the game is showing a pattern or the winning animation, or the timer to reset strict mode is running)
    initGame();    
    setTimeout(showPattern, 100);  // Start game (after 100ms, because 0ms (immediately) feels too fast)
  });
  
  $("#strict-check").on("change", function() {
    strictMode = this.checked;
  });
  
  $(".btn-simon").on("click", function() {
    if(inputAllowed) {
      // If I pressed the button I was expected to press
      // (I did not use === because one is a string and the other a number)
      if(this.id[3] == winningSteps[toGuess]) {
        msg("");
        // Highlight the button and play audio
        pressButton(this.id[3], true, 200);
        if(toGuess+1 === level) {// If I guessed the number of steps necessary for the level (level is also the number of steps to guess)
          disableInput(); // Trying to avoid in every way possible extra clicks
          nextLevel();
        }
        else {
          toGuess++;  // Now you have to guess the next step in the sequence
        }  
      }
      else { // If I pressed the wrong button
        // Highlight button but don't play audio
        pressButton(this.id[3], false, 200);
        disableInput();
        
        if(strictMode) {
          msg("Wrong button! Restarting from level 1.")
          setTimeout(helpClick, animSlow + 2500);  // Restarts game
        }
        else {
          msg("Wrong! Try again.");
          toGuess = 0; // You'll have to guess the sequence from the beginning
          // Waits for the pressButton animation to finish and then shows the pattern again
          setTimeout(showPattern, animSlow + 400);        
        }
      }
    }
  });
});


/****** FUNCTIONS ******/


function initGame() {
  winningSteps = randomWinSequence(20); // Pass a small number (like 3) instead of 20 for faster testing!
  level = 1;
  toGuess = 0;
  $("#count").text(level);
  msg("");
}

// Highlights a button for a certain amount of time, playing the corresponding sound
function pressButton(number, playAudio, animLength) {
  if(playAudio) // Plays a sound if the parameter is true
    document.querySelector("#audio" + number).play();
  // Highlight a button for a specific amount of time (animLength)
  $("#btn" + number).addClass("highlight");
  setTimeout(function() {
    $("#btn" + number).removeClass("highlight");
  }, animLength);
}

function nextLevel() {
  if(level === winningSteps.length) {
    // If I pressed correctly all the buttons in the sequence
    disableInput();
    msg("You won!");
    setTimeout(showWinAnimation, animSlow);
  }
  else {
    level++;
    $("#count").text(level);
    toGuess = 0;
    setTimeout(showPattern, 1500);  /* Wait a moment before showing pattern for the new level */
  } 
}


/******  ANIMATION  ******/


// Shows the buttons to press for this level, with an animation
function showPattern() {
  disableInput();
  for(var i=0; i<=level-1; i++) {
    help(i);
  }
  // Enable input only after the sequence animation is finished
  setTimeout(enableInput, (animSlow + 500)*level);
}

// Closure - "Don't create functions within a loop"
function help(i) {
  setTimeout(function() {
      pressButton(winningSteps[i], true, animSlow);
    }, (animSlow + 500)*i);
}

// Shows a simple animation when the player wins the game
function showWinAnimation() {
  for(var i=0; i<=winAnimation.length; i++) {
    helpWin(i, 100);
  }
}

function helpWin(i, animLength) {
  setTimeout(function() {
      // After (animLength*i)ms, highlight the button for "animLength" ms, don't play sound
      pressButton(winAnimation[i], false, animLength);
    }, animLength*i);
}


/******  HELPERS  ******/


function msg(message) {
  $("#message").text(message);
}

// Returns an array with the final sequence to guess
function randomWinSequence(length) {
  var arr = [];
  for(var i=0; i<length; i++) {
    arr.push(Math.floor(Math.random() * 4));
  }
  return arr;
}

// I can't pass the click function normally to the setTimeout (see strict mode reset)
function helpClick() {
  $("#start").click();
}

function enableInput() {
  inputAllowed = true;
  $(".btn-simon").removeClass("disabled");
}

function disableInput() {
  inputAllowed = false;
  $(".btn-simon").addClass("disabled");
}

// Thanks internet -> http://stackoverflow.com/a/8345814
function clearAllTimeouts() {
  var time = setTimeout(function() {}, 0);
  for(var i=0; i<time; i++)
    window.clearInterval(i);
}