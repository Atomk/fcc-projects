function findLongestWord(str) {
    var array = str.split(" ");
    var max = -1;
    var index = -1;
    
    for (var i=0; i<array.length; i++) {
        if (array[i].length > max) {
            max = array[i].length;
            index = i;
        }
    }
    
    return array[index].length;
}

findLongestWord("The quick brown fox jumped over the lazy dog");