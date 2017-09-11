function truncateString(str, num) {
    var newStr;
    if(str.length > num) {
        if(num<=3)
            return str.slice(0, num) + "...";
        else
         return str.slice(0, num-3) + "...";
    }
    else {
        return str;
    }
}
  
truncateString("A-tisket a-tasket A green and yellow basket", 11);