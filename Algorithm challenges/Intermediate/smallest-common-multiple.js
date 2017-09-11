
function smallestCommons(arr) {
    /***** 1) Create an array with all the numbers in the range *****/

    var range = [];
    // Sorts array numerically to pass the third test
    arr.sort(function(a, b) { return a-b; });
    var min = arr[0];  // Let's make the code more readable.
    var max = arr[1];

    for(var i=min; i<=max; i++) {
        range.push(i);
    }

    /***** 2) Find the smallest common number *****/

    var scm = 0;
    var count=1;
    var ok = false;

    while(true) {
        scm = max*count;  // The smallest common multiple has to be a multiple of the biggest number too, so we use it as it allows to find the result with less loop cycles.
        ok = true;
        // Check if the SCM is multiple of all the numbers in the range
        for(var j=0; j<range.length; j++) {
            if(scm%range[j] !== 0)
                ok = false;
        }
        /* If the common multiple is divisible for every number
            in the range, here "ok"" is true */
        if(ok)
            return scm;
        count++;
    }
}


smallestCommons([1, 5]);