
function addTogether(x) {
    // Make sure the parameter(s) are numbers
    for(var i=0; i<arguments.length; i++)
        if(typeof arguments[i] !== "number")
            return undefined;
    
    if(arguments.length == 2)
        return arguments[0] + arguments[1];
    else
        return function(y) {
            if(typeof y !== "number")
                return undefined;
            else
                return x + y;
        };
}
  
addTogether(2,3);  