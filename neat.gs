function neat(numToFormat, prefThousands, prefDecimals) {
  var thousandSep = prefThousands === undefined ?  "." : prefThousands; 
  var decimalSep = prefDecimals === undefined ?  "," : prefDecimals;  
  
  function parseInput(numToFormat) {
    if(numToFormat.indexOf(",") > -1) {
      numToFormat = numToFormat.replace(",", ".");
    }
    
    return parseFloat(numToFormat).toFixed(2);
  }

  function placeThousands(wholesPart, thousandSep, decimalSep) {
    var wholesLength = wholesPart.length;
    // benefits from the modulo of the length mod 3 equaling the slice end size needed
    // and if mod === 0 firstChunk = ""
    var wholesModulo =  wholesLength % 3;
    var firstChunk = wholesPart.slice(0, wholesModulo);

    //initiates thousand separator placing
    var initPlacing = function(wholesPart, wholesModulo) {
      var placed;
      if((wholesModulo !== 0 && wholesPart >= 0) 
         || (wholesModulo !== 1 && wholesPart < 0)) {
         placed = firstChunk + thousandSep;
      } else {
         placed = firstChunk
      }
      return placed;
    }
    
    var placed =  initPlacing(wholesPart, wholesModulo);
    for (var i = wholesModulo; i < wholesLength; i += 3) {
      var nextLoop = i + 3;
      if(nextLoop < wholesLength) {
        var sliceBy = wholesPart.slice(i, nextLoop);
        placed += sliceBy + thousandSep;
      } else {
          sliceBy = wholesPart.slice(i, wholesLength);
          placed += sliceBy;
      }
    }  
    return placed;
  }

  var numberToFixed = parseInput(numToFormat);
  var decimalPart = numberToFixed.slice(-3).replace('.', decimalSep);
  var wholesPart = numberToFixed.slice(0, (numberToFixed.length - 3));
  var needThousands = false;
  var gtEqThousand = wholesPart >= 1000;
  var ltEqMinusThousand = wholesPart <= -1000;
  if (gtEqThousand || ltEqMinusThousand) {
    needThousands = true;
  }
  var neat = needThousands ? placeThousands(wholesPart, thousandSep, decimalSep) + decimalPart : wholesPart + decimalPart;
  return neat;
}
