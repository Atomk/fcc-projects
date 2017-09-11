function palindrome(str) {
    // The "match" returns an array containing the alphanumeric items found in the string
    // The "join" turns the array back into a string
    var cleanStr = str.match(/\w/g).join("");
    cleanStr = cleanStr.replace("_", ""); // Because \w thinks the underscore is alphanumeric...
    cleanStr = cleanStr.toLowerCase();

    // Used to iterate over the first half of the string
    var half = Math.floor(cleanStr.length/2);

    /* Checks if the first character is the same as the last one,
    then if the second and the second to last...and so on */
    for (var i=0; i < half; i++) {
    // If characters are different, it's not a palindrome
        if(cleanStr[i] != cleanStr[cleanStr.length-1-i]) {
            return false;
        }
    }

    return true;
}

palindrome("eye");