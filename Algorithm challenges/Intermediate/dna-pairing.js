
function pairElement(str) {
    var arr = [];
    for(var i=0; i<str.length; i++) {
        switch(str[i]) {
            case "A": arr.push([str[i], "T"]); break;
            case "T": arr.push([str[i], "A"]); break;
            case "C": arr.push([str[i], "G"]); break;
            case "G": arr.push([str[i], "C"]); break;
        }
    }
    
    return arr;
}
  
function pairElementMap(str) {
    return str.split("").map(function(val, index) {
        switch(val) {
            case "A": return [str[index], "T"];
            case "T": return [str[index], "A"];
            case "C": return [str[index], "G"];
            case "G": return [str[index], "C"];
        }
    });
}
  
pairElement("GCG");  