// Example of operations array: [12, "+", 15, "*", 2, "/", 3]

var operations = []; // Will contain the sequence of input number and operations
var expectingNumber = false;  // True if the calculator is waiting for a number input (for example after selecting an operator), false if it can accept an "operation" input
var error = false;  // True if there was an error while processing the results of operations. Click on "clear" button is expected.

$(document).ready(function() {
  // Assign a function to all the calculator's buttons
  $(".keyboard button").on("click", function() {
    clicked(this.id); /* I have no idea why this works, but it works... */
    //console.log(JSON.stringify(this)); // Outputs a jQuery object while "this" is a HTMLButtonElement. What?
  })
});


/*********   FUNCTIONS   *********/


// Called when "equal" button is pressed - calculates the result of the sequence of operations.
function processOperations() {
  if(operations.length > 0) {
    // If there is at least one operation to process and we are not expecting a number input...
    if(lastOperation() !== null && !expectingNumber) {
      // Insert the last number into the main array
      operations.push(parseInt($("#scr-main").text(), 10));
      //console.log(operations + "");
      var a = null, b;  // "a" will be the result of the previous operation.
      
      // Loop until all operations are processed, but stop if an error happened
      for(var i=0; i<operations.length-2 && !error; i+=2) {
        if(a === null)
          a = operations[i];
        
        b = operations[i+2];
        switch(operations[i+1]) {
          case "+": a += b; break;
          case "-": a -= b; break;
          case "*": a *= b; break;
          case "/":
            if(b != 0) {
              a /= b;
            }
            else {
              $("#scr-top").text("You can't divide by zero!");
              error = true;  // Exit from the loop.
            }
            break;
          default: $("#scr-top").text("Error: unknown symbol");
        }
      }
      
      if(!error) {
        clear();
        $("#scr-main").text(a);
        expectingNumber = true;
      }
    }
  }
}

// Performs an action based on the id of the pressend button
function clicked(id) {
  //alert("Button id: " + id);
  if(!error) {
    switch(id) {
      case "btn0": insertNumber(0); break;
      case "btn1": insertNumber(1); break;
      case "btn2": insertNumber(2); break;
      case "btn3": insertNumber(3); break;
      case "btn4": insertNumber(4); break;
      case "btn5": insertNumber(5); break;
      case "btn6": insertNumber(6); break;
      case "btn7": insertNumber(7); break;
      case "btn8": insertNumber(8); break;
      case "btn9": insertNumber(9); break;

      case "btn-sum": insertOperator("+"); break;
      case "btn-diff": insertOperator("-"); break;
      case "btn-mul": insertOperator("*"); break;
      case "btn-div": insertOperator("/"); break;

      case "btn-equal": processOperations(); break;
      case "btn-clear": clear(); break;
      default:
        // It should be useless but I don't know what to expect from JS anymore...
        $("#scr-top").text("Error: unknown button");
        error = true;
    }
  }
  else {
    // Allow to press only the "clear" button if an error happened
    if(id === "btn-clear")
      clear();
    else  // That was not the "clear" button.
      $("#scr-top").text('Please press "C"');
  }
}

// Handles a number input
function insertNumber(num) {
  // If the current number is 0, or the last button pressed was an operator, substitute the value with the digit selected - prevents also to insert numbers starting with 0
  if($("#scr-main").text() === "0" || expectingNumber) {
    $("#scr-main").text(num);
    expectingNumber = false;
  }
  else  // Insert the selected digit after the number on the screen
    $("#scr-main").append(num);
}

// Inserts an operator in the operations array if some conditions are met
function insertOperator(symbol) {
  // If you can use an operator (i.e. if there's a number), add the entered number and the symbol of the selected operation to the array
  if(operations.length === 0 || !expectingNumber) {
    operations.push(parseInt($("#scr-main").text(), 10));
    operations.push(symbol);
    expectingNumber = true; // You should insert another number
  }
  else if(lastOperation() !== null) {
    // Replace the last operation with the new one
    operations[operations.length-1] = symbol;
  }
  // Show all the previous operations at the top of the screen
  $("#scr-top").text(operations.join(" "));
}

// Returns a symbol representing the last operation selected, null if no operation was selected
function lastOperation() {
  if(operations.length === 0) // If there's no input yet
    return null;
  else
    return operations[operations.length-1].match(/[+*/-]/);
}

// Clears screen and previous operations
function clear() {
  operations = [];
  $("#scr-main").text(0);
  $("#scr-top").text("");
  error = false;
}