var showHtml = function (elem) {};

aardvark.loadObject = function (obj) {
  var c = 0;

  for (var x in obj) {
    if (aardvark[x] == undefined) { aardvark[x] = obj[x]; }
    c++;
  }
};

