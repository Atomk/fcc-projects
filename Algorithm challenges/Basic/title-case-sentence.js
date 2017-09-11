function titleCase(str) {
    var array = str.split(" ");  // Now every array element is a word.
    var help;  // Strings are immutable, I need an extra variable.
    
    for (var i=0; i<array.length; i++) {
        help = array[i].toLowerCase().split("");  // Turn the word in lowercase and split it into an array
        help[0] = help[0].toUpperCase();  // Uppercase the first letter of the word
        array[i] = help.join("");  // Update the word in the main array
    }
    
    return array.join(" ");  // Put everything back into a string
}
  
titleCase("I'm a little tea pot");  