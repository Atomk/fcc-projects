function rot13(str) {
    var myArr = [];
    // Helper variables for code clarity
    var newChar = 0;
    var char = 0;  
    
    for(var i=0; i<str.length; i++) {
        char = str.charCodeAt(i);
        // If the character is somewhere between A-Z
        if(char >= 65 && char <= 91) {
            if(char < 78)
                newChar = char + 13;
            else
                newChar = char - 13;
        }
        else
            newChar = char;  // Do not transform other characters
      
        myArr.push(String.fromCharCode(newChar));
    }
    
    // Return decoded string
    return myArr.join("");
}
  
// Change the inputs below to test
rot13("SERR PBQR PNZC");