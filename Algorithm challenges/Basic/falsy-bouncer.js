function bouncer(arr) {
    var nan = new Boolean(NaN);
    
    // Don't show a false ID to this bouncer.
    return arr.filter(function(val) {
        if(val != val) {
            // This is the most reliable way to determine if a number is NaN...
            // Source - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
            return false;
        }
        else {
            switch(val) {
                /* Case "NaN" does not work since "NaN compares unequal
                    (via ==, !=, ===, and !==) to any other value, including to another NaN",
                    making impossible to check if a value is NaN without isNaN() */
                case false:
                case null:
                case 0:
                case undefined:
                case "": return false;
                default: return true;
            }
        }
    });
}
  
bouncer(["a", "b", "c"]);