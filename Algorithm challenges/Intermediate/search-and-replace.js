
function myReplace(str, before, after) {
    /* console.log("Abc".match(/[A-Z]/));  // ["A"]
       console.log("abc"[0].match(/[A-Z]/)); // null
    */
    var arr = [];
    
   
    return str.replace(before, function() {
        // If the first letter of the word to be replaced is uppercase, turn uppercase the first letter of the second word
        if(before[0].match(/[A-Z]/) !== null) {
            arr = after.split("");  // Strings are immutable, we have to use an array
            arr[0] = arr[0].toUpperCase();
            return arr.join("");
        }
        // Like above but for lowercase
        else {
            arr = after.split("");
            arr[0] = arr[0].toLowerCase();
            return arr.join("");
        }
    });
}
  
myReplace("Let us get back to more Coding", "Coding", "algorithms");  