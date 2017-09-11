
function steamrollArray(arr) {
    var flattened = [];
    
    takeVal(arr, flattened);
    
    return flattened;
}

  
// When you find a numeric value, insert it into the flattened array
function takeVal(arr, flat) {
    for(var i=0; i<arr.length; i++) {
        if(Array.isArray(arr[i])) {
            takeVal(arr[i], flat);  // Yay recursion!
        }
        else
            flat.push(arr[i]); 
    }
}


/*function steamrollArray(arr) {
    return arr.map(function(val) {
        if(Array.isArray(val))
            return steamrollArray(val);  // Returns an array anyway, so nothing changes...
        else
            return val;
    });
}*/


steamrollArray([1, [2], [3, [[4]]]]);  