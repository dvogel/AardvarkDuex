var showHtml = function (elem) {};

var aardvark = {
  isBookmarklet: true,
  resourcePrefix: '/',

  // ------------------------------------------------
  // onload function for script elements
  loadObject: function (obj) {
    var c = 0;

    for (var x in obj) {
      if (aardvark[x] == undefined) { aardvark[x] = obj[x]; }
      c++;
    }
  }

};
