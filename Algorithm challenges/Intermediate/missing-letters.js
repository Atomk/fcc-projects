
function fearNotLetter(str) {
    // Not required but prevents errors if the string has not at least 2 characters
    if(str.length < 2) { return undefined; }
    
    for(var i=1; i<str.length; i++) {
        // If the code of the current number isn't the successive of the previous character, return the missing character
        if(str.charCodeAt(i) !== str.charCodeAt(i-1) + 1)
            return String.fromCharCode(str.charCodeAt(i-1) + 1);
    }
    // If all the letters in the range are present
    return undefined;
}
  
fearNotLetter("abce");  