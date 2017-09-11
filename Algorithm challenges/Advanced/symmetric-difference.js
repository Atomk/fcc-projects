function sym(args) {
    var common = [];
    var arr = Array.from(arguments);
    
    /** 1) Remove duplicates from every set */
    
    arr = arr.map(function(set) {
      return set.filter(function(val, index) { // Return a set without duplicates
        return set.indexOf(val) === index; // Returns true if this is the first occurence of this value in the set
      });
    });
    
    return arr.reduce(function(prev, curr) {
      // Keep element if it's in both arrays
      common = prev.filter(function(val) {
        return curr.indexOf(val) >= 0;
      });
      // Concatenate the sets without the common elements
      return prev.filter(deleteCommons).concat(curr.filter(deleteCommons));
    });
    
    function deleteCommons(val) {
      // Keep this element if it's not in the "common" array
      return common.indexOf(val) < 0;
    }
}
  
sym([1, 2, 3], [5, 2, 1, 4]);  