
function truthCheck(collection, pre) {
    // Is everyone being true?
    for(var i=0; i<collection.length; i++) {
        if(!collection[i][pre])  // If the property evaluates to a falsy value
            return false;
    }
    
    return true;
}

truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");