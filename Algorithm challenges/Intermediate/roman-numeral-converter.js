
function convertToRoman(num) {
    roman = num.toString().split("");
    var len = roman.length;
    
    roman = roman.map(function(val, index) {
    switch(index) {
        case len-1:  // ones
            // Since switches check with (===) i have to turn the characters to numbers
            switch(parseInt(val, 10)) {
                case 0: return "";
                case 1: return "I";
                case 2: return "II";
                case 3: return "III";
                case 4: return "IV";
                case 5: return "V";
                case 6: return "VI";
                case 7: return "VII";
                case 8: return "VIII";
                case 9: return "IX";
            }
        case len-2:
            switch(parseInt(val, 10)) { // tens
                case 0: return "";
                case 1: return "X";
                case 2: return "XX";
                case 3: return "XXX";
                case 4: return "XL";
                case 5: return "L";
                case 6: return "LX";
                case 7: return "LXX";
                case 8: return "LXXX";
                case 9: return "XC";
            }
        case len-3:
            switch(parseInt(val, 10)) { // hundreds
                case 0: return "";
                case 1: return "C";
                case 2: return "CC";
                case 3: return "CCC";
                case 4: return "CD";
                case 5: return "D";
                case 6: return "DC";
                case 7: return "DCC";
                case 8: return "DCCC";
                case 9: return "CM";
            }
        default:
            switch(parseInt(val, 10)) { // thousands
                case 1: return "M";
                case 2: return "MM";
                case 3: return "MMM";
                default: return "?";
            }
        }
    });
    
    return roman.join("");
}

convertToRoman(36);
