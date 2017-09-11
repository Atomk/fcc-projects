function sumAll(arr) {
    // Sort from smallest to largest number, to put the smallest first
    arr.sort(function(a, b) {
        return a - b;
    });
    
    var sum = 0;
    for(var i=arr[0]; i<=arr[1]; i++) {
        sum += i;
    }
    
    return sum;
}
  
sumAll([1, 4]);