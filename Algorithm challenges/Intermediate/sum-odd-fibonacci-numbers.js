/** As you can see there are two versions of this solution. They both pass all tests. */

function sumFibs(num) {
    var fibonacci = [1, 1];  // The first two numbers are always the same
    
    // Add to the array all the Fibonacci numbers less than or equal to "num"
    for(var i=0; fibonacci[i] + fibonacci[i+1] <= num; i++) {
        fibonacci.push(fibonacci[i] + fibonacci[i+1]);
    }
    
    // Calculate the sum of all the odd numbers
    return fibonacci.reduce(function(prev, curr) {
        if(curr%2 !== 0)  // If the current value is odd
            return prev + curr;
        else
            return prev;
    });
}


// This the same thing but the sum fibonacci[i] + fibonacci[i+1] is computed one time per cycle instead of two, maybe it's faster (it is if updating the variable in memory is faster than processing the sum)
function sumFibsFaster(num) {
    var fibonacci = [1, 1];
    var sum = fibonacci[0] + fibonacci[1];
    
    for(var i=1; sum <= num; i++) {
        fibonacci.push(sum);
        sum = fibonacci[i] + fibonacci[i+1];
    }
    
    return fibonacci.reduce(function(prev, curr) {
        if(curr%2 !== 0)
            return prev + curr;
        else
            return prev;
    });
}


sumFibs(4);  