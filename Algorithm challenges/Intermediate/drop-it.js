
function dropElements(arr, func) {
    var cut = 0;  
    for(var i=0; i<arr.length && !func(arr[i]); i++) {
        cut = i+1;  // We add 1 because slice() keeps the element on the specified position, but we don't want to
    }
    
    return arr.slice(cut);
}
  
// Lesson learned, NEVER USE SHIFT IN A LOOP
// This is why it does not work -> http://jsbin.com/pakorusuka/1/edit?js,console
// You thought you were looking in the original array?
function dropElementsFirstTry(arr, func) {
    for(var i=0; i<arr.length && !func(arr[i]); i++) {
        arr.shift();
    }
    
    return arr;
}
  
dropElements([1, 2, 3, 4], function(n) {return n >= 3;});



/* *************
Just in case the link dies, here's the JsBin linked above:
****************

function dropElements(arr, func) {
  console.log("Array: " + arr);
  console.log("Length: " + arr.length);
  
  for(var i=0; i<arr.length; i++) {
    console.log("i = " + i + " // arr[" + i + "] = " + arr[i]);
    if(func(arr[i])) {
      console.log("End: " + arr);
      return arr;
    }
    else {
      arr.shift();
      console.log("Now array is: " + arr);
    }
  }
  
  return arr.slice(cut);
}

dropElements([1, 2, 3, 4], function(n) {
  var ok = n >= 3;
  console.log("Drop " + n + "? " + ok);
  return ok;
});

*/