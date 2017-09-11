
function convertHTML(str) {

     return str.replace(/[&<>"']/g, function(match) {
        switch(match) {
            case '&': return "&amp;";
            case '<': return "&lt;";
            case '>': return "&gt;";
            case '"': return "&quot;";
            case "'": return "&apos;";
        }
    });
     
    // &colon;&rpar;
}

convertHTML("Dolce & Gabbana");   