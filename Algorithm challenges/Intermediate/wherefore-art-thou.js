
function whatIsInAName(collection, source) {
    // What's in a name?
    var arr = [];
    // Only change code below this line
    var sourcekeys = Object.keys(source);
    var allMatching;  // Will be true if the parameter has the same properties and values of an element of the collection
    
    for(var i=0; i<collection.length; i++) {
        allMatching = true;
        
        for(var j=0; j<sourcekeys.length && allMatching; j++) {
            if(collection[i].hasOwnProperty(sourcekeys[j])) {
                if(collection[i][sourcekeys[j]] !== source[sourcekeys[j]])
                    allMatching = false;
            }
            else
                allMatching = false;
        }
        
        if(allMatching) {
            arr.push(collection[i]);
        }
    }
    // Only change code above this line
    return arr;
}
  
whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 });  