
function updateInventory(invArr, newArr) {
    /* If an array is empty, I just return the other one (really optional, it's just to save some processing time) */
    // For the sorting logic see -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Sorting_non-ASCII_characters
    if(invArr === [])
        return newArr.sort(function(a, b) {
            return a[1].localeCompare(b[1]);
        });
    if(newArr === [])
        return invArr.sort(function(a, b) {
            return a[1].localeCompare(b[1]);
        });
    
    var itemIndex;

    // For every item in the delivery array...
    newArr.forEach(function(newitem) {
        itemIndex = -1;
        // Loops in inventory until I find the delivered item or the array is finished
        for(var i=0; i<invArr.length && itemIndex<0; i++) {
            if(invArr[i][1] === newitem[1])
                itemIndex = i;  // The delivered item is in the inventory, remember its position in the array
        }
  
        if(itemIndex >= 0) {  // If I have the item in inventory
            invArr[itemIndex][0] += newitem[0];  // Update the item quantity in inventory
        }
        else {
            invArr.push(newitem);  // Add the item to inventory if it's not already there
        }
    });
    
    invArr.sort(function(a, b) {
        return a[1].localeCompare(b[1]);
    });

    // All inventory must be accounted for or you're fired!
    return invArr;
}
  
function sortInventory(a, b) {
    return 0;
}
  
// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];
  
var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];
  
updateInventory(curInv, newInv);  