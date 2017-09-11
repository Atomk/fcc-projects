var copy;  // To avoid creating a new "help" variable every loop cycle

/* Well, this will be hard to explain without drawings...
Let's say we have A, B, C. Every permutation will have these 3 elements in a different order.
So every new permutation (the "currPermutation" array) starts with 3 free positions: in the first
I have 3 elements to choose from, (the ones in elemArr) so I can put A, B or C.
Let's say I choose A. Now I can't choose A anymore, so I have 2 elements to choose from.
I choose the first again, B. Then we are left with C: we have a complete permutation - ABC!
I add it to the list of all the permutations (allPermutations). I can't go further here,
so go back to the previous step where I had 2 elements to choose, B and C.
I'm finished with B, so I choose C for the second position, then only B is left...we have ACB,
add it to the main list. There's no more possible elements to choose from the third position,
nor the second, so we change the first one with B and go on...'*/



function permutate(elemArr, allPermutations, currPermutation) {
  if(elemArr.length === 1) {
    /* If we have only one element to choose from, complete the current permutation
    and add it to the main permutation list as a string */
    allPermutations.push(currPermutation.concat(elemArr[0]).join(""));
  }
  else {
    // For every element I can put in this position...
    elemArr.forEach(function(val, pos) {
      // "Choose" the current element for this position in the permutation
      currPermutation.push(val);   
      copy = elemArr.slice();  // Create a copy of the elements array (to avoid removing an element from the original one, I'll need it in later loop cycles!)
      copy.splice(pos, 1);     // Remove the current element from the ones you can choose from
      permutate(copy, allPermutations, currPermutation);
      currPermutation.pop();  // You are the key! This "removes" the current element from the current permutation, so I can put another one in this place
    });
  }
}



function permAlone(str) {
  var allPerms = [];  // Contains all permutations of the string
  var elements = str.split("");
  
  permutate(elements, allPerms, []);
 
  return allPerms.filter(function(val) {
    /* Keep only permutations with no repeating characters
       Every char has to be followed by a different one
       (for example, no "aa" or "bb" in the string) */
    return val.match(/([a-z])\1+/) === null;
  }).length;
}

permAlone('aab');