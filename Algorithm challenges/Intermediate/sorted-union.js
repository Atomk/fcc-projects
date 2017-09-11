
function uniteUnique(arr) {
    var unique = Array.from(arguments);
    unique = unique.reduce(function(prev, curr) {
        return prev.concat(curr);
    });
    
    unique = unique.filter(function(val, index) {
        // Keep the element if there isn't the same element before it
        return unique.indexOf(val) == index;
    });
    
    return unique;
}
  
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);  