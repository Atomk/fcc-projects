function mutation(arr) {
    var myArr = [arr[0].toLowerCase(),
                 arr[1].toLowerCase()];
    
    for(var i=0; i<myArr[1].length; i++) {
        if(myArr[0].indexOf(myArr[1][i]) === -1)
            return false;
    }
    return true;
}
  
mutation(["Mary", "Aarmy"]);