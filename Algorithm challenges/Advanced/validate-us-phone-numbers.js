var tests = [
  /\d{3}[- ]?\d{3}[- ]?\d{4}/,  // Variants 1, 4, 5
  /[(]\d{3}[)][ ]?\d{3}-\d{4}/,  // Variants 2 3
  /1[ ]\d{3}[- ]?\d{3}[- ]?\d{4}/, // Variant 6
  /1[ ]?[(]\d{3}[)][ ]?\d{3}-\d{4}/ // Third test
];

// 1) Test the string with every regular expression
// 2) Return true if at least one of the tests was passed

function telephoneCheck(str) {
  return tests.map(function(val) {
    // Returns true if matches are found, meaning the test is passed
    if(str.match(val) !== null) {
      // We want all the string to pass the test, not just a part.
      return str.match(val)[0].length === str.length;
    } else {
      return false;
    }
  }).reduce(function(prev, curr) {
    // Returns true if at least one of the two arguments is true
    return prev || curr;
  });
}

telephoneCheck("555-555-5555");