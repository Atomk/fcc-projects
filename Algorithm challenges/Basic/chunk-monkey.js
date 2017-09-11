function chunkArrayInGroups(arr, size) {
    var myArr = [];
    for(var i=0; i<arr.length; i+=size) {
        myArr.push(arr.slice(i, i+size));
    }
    
    return myArr;
}
  
chunkArrayInGroups(["a", "b", "c", "d"], 2);