function confirmEnding(str, target) {
    // "-2" is like "str.length - 2"
    return str.substr(-target.length) === target;
}

confirmEnding("Bastian", "n");