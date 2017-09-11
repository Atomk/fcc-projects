
function orbitalPeriod(arr) {
    var newarr = arr;
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    var orbPeriod;
    
    newarr.forEach(function(val) {
        // Darn you semiaxis, I knew I forgot to add something.
        orbPeriod = 2*Math.PI * Math.pow(Math.pow(earthRadius+val.avgAlt, 3)/GM, 0.5);
        val.orbitalPeriod = Math.round(orbPeriod);
        delete val.avgAlt;
    });
    
    return newarr;
}

// It looks like the result is in seconds.
// Envisat orbital period = 1h40m = 100m ~= 6039s
orbitalPeriod([{name: "Envisat", avgAlt: 800}]);
//orbitalPeriod([{name : "sputnik", avgAlt: 35873.5553}]);