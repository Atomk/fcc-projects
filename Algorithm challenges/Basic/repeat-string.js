function repeatStringNumTimes(str, num) {
    var newString = "";

    for(var i=0; i<num; i++) {
        newString += str;
    }
        
    return newString;
}

repeatStringNumTimes("abc", 3);