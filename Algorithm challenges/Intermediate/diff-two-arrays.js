function diffArray(arr1, arr2) {
    var newArr = [];
    
    // Note, I would have used a much more elegant "for" solution but I wanted to try to do it this way.
    
    newArr = arr1.filter(function(val, index) {
        // If you can't find this element in the other array, keep it.
        return arr2.indexOf(val) < 0;
    }).concat(arr2.filter(function(val) {
        return arr1.indexOf(val) < 0;
    }));
    
    // Same, same; but different.
    return newArr;
}
  
diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
  