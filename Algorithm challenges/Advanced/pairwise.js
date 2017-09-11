
// Not the smartest solution but it works and it was written in under 10 minutes, so...

function pairwise(arr, arg) {
    var notAgain = [];
    var sum = 0;

    // The array has to contain at least 2 elements...
    for(var i=0; i<arr.length-1; i++) {
      for(var j=0; j<arr.length; j++) {
        if(i != j) {  // You can't pair an item with itself
          // If the two elements have never been used for a pair
          if(notAgain.indexOf(i) === -1 && notAgain.indexOf(j) === -1) {
            if(arr[i] + arr[j] === arg) {
              sum += i+j;
              notAgain.push(i);
              notAgain.push(j);
            }
          }
        }
      }
    }

    return sum;
}

pairwise([1, 4, 2, 3, 0, 5], 7);
