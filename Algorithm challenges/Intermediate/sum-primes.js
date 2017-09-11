
function sumPrimes(num) {
  var sum = 0;
  for(var i=2; i<= num; i++) {  // 1 is not prime, so the counter starts from 2
    if(isPrime(i))
      sum += i;
  }
  return sum;
}

// Returns false if the number is divisible for any number between 1 and the number itself, because it would mean it has more than 2 divisors
function isPrime(prime) {
  for(var i=2; i<prime; i++) {
    if(prime%i === 0)
      return false;
  }
  return true;
}

sumPrimes(10);