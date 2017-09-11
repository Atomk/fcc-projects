/* You will be provided with an initial array (the first argument in the
destroyer function), followed by one or more arguments. Remove all
elements from the initial array that are of the same value as these arguments. */


function destroyer(arr) {
    var myArgs = Array.from(arguments); // Turn arguments into an array
    myArgs.shift(); // Removes first argument
    
    return arr.filter(function(val) { 
        // If the array element isn't in the list of values to destroy...
        if(myArgs.indexOf(val) === -1) {
            return true; // ...keep the element.
        }
        else
            return false;
    });
}

destroyer([1, 2, 3, 1, 2, 3], 2, 3);