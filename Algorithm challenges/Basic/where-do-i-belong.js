/* Return the lowest index at which a value (second argument) should be inserted
into an array (first argument) once it has been sorted. The returned value should be a number.*/


function getIndexToIns(arr, num) {
    var index = -1;
    
    arr.sort(function(a, b) {
        return a - b;
    });
    
    for(var i=0; i<arr.length; i++) {
        if(num <= arr[i]) {
            index = i;
            i = arr.length;  // Stops the loop
        }
    }

    // If the number is greater than all the elements of the array
    if(index === -1) {
        index = arr.length;
    }

    // Find my place in this sorted array.
    return index;
}
  
getIndexToIns([10, 20, 30, 40, 50], 30);