
function translatePigLatin(str) {
    if(isVowel(str[0])) {
        return str + "way";
    } else {
        for(var i=1; i<str.length; i++) {
            if(isVowel(str[i])) { // When we find the first vowel...
                return str.substr(i, str.length-i) +  // Part after the first consonant(s)
                    str.substr(0, i) +  // Consonant(s) at the beginning of the word
                    "ay";
            }
        }
  
        return str + "ay";  // If all letters are consonants...
    }
}
  
/** Returns true if a letter is a vowel */
function isVowel(letter) {
    switch(letter) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u': return true;
        default: return false;
    }
}

translatePigLatin("consonant");