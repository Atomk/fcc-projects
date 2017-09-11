
/* NOTE - You'll see a lot of *100, this is to turn
  this -> 0.25
  to this -> 25
allowing to prevent errors (accuracy errors) when doing operations with floating point numbers. See:
- http://stackoverflow.com/questions/5153061/simple-subtraction-bug-in-javascript
- http://floating-point-gui.de/
Since we just need double precision (.xx) multiplication by 100 is enough. At the end the results will be divided by 100 to get the original result.
It was a struggle fixing everything but now I am so proud I made this you can't even imagine. */



// Turns the cid (2d array) input in a array of objects
function cidToObj(arraycid) {
    var values = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    };

    var obj = new Array(arraycid.length);
    var remainder;
    var howMany;

    for(var i=0; i<arraycid.length; i++) {
        obj[i] = {};
        obj[i].type = arraycid[i][0];  // "TWENTY"
        obj[i].value = values[arraycid[i][0]]*100; // 20
        obj[i].count = (arraycid[i][1]*100) / (values[arraycid[i][0]]*100); // 60/20 = cid has 3 bills/coins of this value
    }

    return obj;
}



function checkCashRegister(price, cash, arraycid) {
    cash*=100; price*=100;
    var change = cash-price;
    // Find the amount of money in the drawer.
    var cidTotal = arraycid.reduce(function(prev, curr) {
        // Every element is an array, so we should return an array
        return [0, prev[1] + curr[1]*100];
    }, [0, 0])[1];

    var cid = cidToObj(arraycid);
    var given = 0, givenArray = [];
    var changeleft, remainder, howManyNeeded, howMuch;

    /*** 1) Find the biggest bill/coin you can give ***/
    /*** 2) Find how many of them you can give without exceeding the change ***/
    /*** 3) If it's not enough, look for a smaller bill/coin (repeat loop) **/

    for(var i=cid.length-1; i>=0 && given<change; i--) {
        if(change >= cid[i].value) { // Is this the biggest bill/coin I can give?
            if(cid[i].count>0) { // Do I have at least a bill/coin of this value?

                changeleft = change - given;  // Amount of change not yet given
                // for example: 46 % 20 = 6
                remainder = changeleft % cid[i].value;
                // (46-6) / 20 = 2 --> You can give at most 2 "TWENTY" bills without giving too much
                howManyNeeded = (changeleft - remainder) / cid[i].value;

                /* Check what is the maximum amount of bills/coins
                I can give of the current value */
                if(howManyNeeded >= cid[i].count)
                    howMuch = cid[i].count * cid[i].value;  // If I have 5 but 7 would be needed, give all you have, we'll provide the missing change with smaller coins
                else
                    howMuch = howManyNeeded * cid[i].value;  // If I have 10 but just 2 are needed, I give 2

                if(howMuch > 0) {
                    // Parsefloat thing: 50/100 = 0.5 -> "0.50" -> 0.50
                    // Because FCC tests sometimes suck
                    givenArray.push([cid[i].type, parseFloat((howMuch/100).toFixed(2))]);
                }

                given += howMuch;

                /*console.log("Change left: " + changeleft +
                        "\nType: " + cid[i].type +
                        " (" + cid[i].value + ") // Count: " + cid[i].count +
                        "\nRemainder: " + remainder +
                        "\nNeeded: " + howManyNeeded +
                        " // #given: " + (howMuch / cid[i].value) +
                        " // Given: " + howMuch);*/
            }
        }
    } /* END for*/

    if(given < change) {
        return "Insufficient Funds";
    }
    if(given === cidTotal) {
        return "Closed";
    }
    // Here is your change, ma'am.
    //return cidTotal + " " + change;
    return givenArray;
}



checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);