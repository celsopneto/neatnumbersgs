function neat(numToFormat,prefThousands, prefDecimals) {
 
  var thousandSep = prefThousands; //"." or
  var decimalSep = prefDecimals;
  
  
  function parseInput(numToFormat) {
    var isNumber = typeof(numToFormat) == 'number';
    var numberToFixed;
      if(isNumber){
        numberToFixed = numToFormat.toFixed(2);
      } else {
          //replacing "," for parseFloat precision
          if(numToFormat.indexOf(",") >-1){
            numToFormat = numToFormat.replace(",",".");
          }
      numberToFixed = parseFloat(numToFormat).toFixed(2);
      }
    return numberToFixed;
  }


  function placeThousands(wholesPart){
    /* To add thousands separators.
     * it iterates throught the
     * number in chunks of len 3.
     * adding a the setted prefered thousand separator.
     * just needed if wholesPart.length >=4
     * 
     */
    var wholesLength = wholesPart.length;
    var wholesModulo = wholesLength % 3;
    //benefits from the mod equaling the slice end size needed
    //and if mod == 0 fstChunk = ""
    var fstChunk = wholesPart.slice(0,wholesModulo);
    var placed =wholesModulo !=0 ? fstChunk+thousandSep : fstChunk;
    for (var i=wholesModulo;i<wholesLength;i+=3) {
      var nextLoop = i+3;
      if(nextLoop<wholesLength) {
        var sliceBy = wholesPart.slice(i,nextLoop);
        placed += sliceBy +thousandSep;
      } else {
          sliceBy = wholesPart.slice(i,wholesLength);
          placed += sliceBy;
      }
    }  
    return placed;
  }
  var numberToFixed = parseInput(numToFormat);
  var decimalPart = numberToFixed.slice(-3).replace('.',decimalSep);
  var wholesPart = numberToFixed.slice(0,(numberToFixed.length - 3));
  var needThousands = wholesPart.length >=4;
  var neat = needThousands ? placeThousands(wholesPart) + decimalPart : wholesPart + decimalPart;
  if(numberToFixed>= 9007199254740991){
    neat= "This number is too big, neatnumbers can't handle it";
  } else if(neat == "NaN") {
      neat= "neatnumbers only deals with numbers";
    }
  return neat;
}
