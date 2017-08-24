var playerSymbol;
var enemySymbol;
var win;  // TRUE if somebody won the game
var turn; // Number of the current turn
var row, column;  // Will contain "coordinates"for a specific cell
var cpuEnabled = true;  // Set this to false to play against a human

$(document).ready(function() {
  // Intro screen buttons
  $("#choose-x").on("click", function() {
    playerSymbol = "X";
    enemySymbol = "O";
    $("#intro-screen").fadeOut(300, showEnemyScreen);
  });
  $("#choose-o").on("click", function() {
    playerSymbol = "O";
    enemySymbol = "X";
    $("#intro-screen").fadeOut(300, showEnemyScreen);
  });
  
  // Enemy screen buttons
  $("#choose-human").on("click", function() {
    cpuEnabled = false;
    startGame();
  });
  $("#choose-cpu").on("click", function() {
    cpuEnabled = true;
    startGame();
  });
  
  // Game screen buttons
  $("#restart").on("click", function() {
    restartGame();
  });
  $(".cell").on("click", function() {
    // If nobody has won yet and clicked cell is empty
    if(!win && this.innerHTML === "") {
      if(turn%2 === 0) { // Even number = player turn
        insertSymbol(this, playerSymbol);
      }
      else { // Odd number = enemy turn
        insertSymbol(this, enemySymbol);
      }
    }
  });
});


/******  FUNCTIONS  ******/


// Inserts a symbol in the clicked cell
function insertSymbol(element, symbol) {
  element.innerHTML = symbol;
  
  if(symbol === enemySymbol)
    $("#" + element.id).addClass("player-two"); // Color enemy symbol differently
  $("#" + element.id).addClass("cannotuse");  // Show a "disabled" cursor on already occupied cells
  
  checkWinConditions(element);
  turn++;
  // Game end - If somebody has won or all cells are filled
  if(win || turn > 8) {
    $("#restart").addClass("btn-green");  // Highlights "restart" button
    $(".cell").addClass("cannotuse");  // Tells visually you can't interact anymore with the game grid
  }
  else if(cpuEnabled && turn%2 !== 0) {
    cpuTurn();
  }
}

/* Changes screen with a fade effect */
function startGame() {
  /* Shows the game screen when the intro screen is completely hidden */
  $("#enemy-screen").fadeOut(300, showGameScreen);
  restartGame();
}
function showGameScreen() {
  $("#game-screen").fadeIn(300);
}
function showEnemyScreen() {
  $("#enemy-screen").fadeIn(300);
}

/* Sets everything to its default value */
function restartGame() {
  turn = 0;
  win = false;
  $(".cell").text("");
  $(".cell").removeClass("wincell");
  $(".cell").removeClass("cannotuse");
  $(".cell").removeClass("player-two");
  $("#restart").removeClass("btn-green");
}

/* Check if there's a winning combination in the grid (3 equal symbols in a row/column/diagonal) */
function checkWinConditions(element) {
  // Retrieve cell coordinates from clicked button id
  row = element.id[4];
  column = element.id[5];
  
  // 1) VERTICAL (check if all the symbols in clicked cell's column are the same)
  
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + i + column).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      // Highlight the cells that form a winning combination
      $("#cell" + i + column).addClass("wincell");
    }
    return; // Exit from the function, to prevent "win" to be set to false by other checks
  }
  
  // 2) HORIZONTAL (check the clicked cell's row)
  
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + row + i).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + row + i).addClass("wincell");
    }
    return;
  }
  
  // 3) MAIN DIAGONAL (for the sake of simplicity it checks even if the clicked cell is not in the main diagonal)
  
  win = true;
  for(var i=0; i<3; i++) {
    if($("#cell" + i + i).text() !== element.innerHTML) {
      win = false;
    }
  }
  if(win) {
    for(var i=0; i<3; i++) {
      $("#cell" + i + i).addClass("wincell");
    }
    return;
  }
  
  // 3) SECONDARY DIAGONAL
  
  win = false;
  if($("#cell02").text() === element.innerHTML) {
    if($("#cell11").text() === element.innerHTML) {
      if($("#cell20").text() === element.innerHTML) {
        win = true;
        $("#cell02").addClass("wincell");
        $("#cell11").addClass("wincell");
        $("#cell20").addClass("wincell");
      }
    }
  }
}

// Simple AI (clicks a random empty cell)
function cpuTurn() {
  var ok = false;
  
  while(!ok) {
    row = Math.floor(Math.random() * 3);
    column = Math.floor(Math.random() * 3);
    if( $("#cell"+row+column).text() === "" ) {
      // We have found it! Stop looking for an empty cell
      ok = true;
    }
  }
  
  $("#cell"+row+column).click(); // Emulate a click on the cell
}