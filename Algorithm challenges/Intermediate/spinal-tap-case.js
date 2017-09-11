function spinalCase(str) {
    return str
        .replace(/[a-z][A-Z]/g, function(match) {
            return match[0] + " " + match[1];
        })
        .replace(/\W|[_]/g, "-")
        .toLowerCase();
    // 1) Separate lowercase letters from uppercase letters
    // 2) Replace every non-alphanumeric character (symbols, spaces) with a dash
    // 3) Turn all the letters lowercase
}
  
spinalCase('This Is Spinal Tap');