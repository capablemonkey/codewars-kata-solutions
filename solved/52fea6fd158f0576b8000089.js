function Converter(){
  this.toAscii = function(hex){
    var ascii = '';

    for (var x = 0; x < hex.length; x += 2) {
      num = parseInt(hex.slice(x, x + 2), 16);
      ascii += String.fromCharCode(num);
    }

    return ascii;
  };

  this.toHex = function(ascii){
    var hex = '';
    ascii.split("").forEach(function(c) {
      hex += c.charCodeAt(0).toString(16);
    });
    return hex;
  };
}

var c = new Converter();
console.log(c.toAscii("666f6f"));