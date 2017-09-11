function factorialize(num) {
    if (num === 0)
        return 1;
    else {
        for (var i=num-1; i>1; i--) {
            num *= i;
        }

        return num;
    }
}
  
factorialize(5);