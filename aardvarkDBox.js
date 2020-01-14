aardvark.loadObject({

  killDbox: function (id) {
    var d = aardvark.doc.getElementById('aardvarkdbox-' + id);
    if (d) {
      aardvark.doc.body.removeChild(d);
      return true;
    }
    return false;
  },

  dboxMouseDown: function (evt) {
    if (!evt) { evt = this.window.event; }

    var s = 'aardvarkdbox-';
    var killDbox = false;
    var elem = aardvark.getElemFromEvent(evt);
    var doClose = false; var doSelect = false; var index;

    while (elem) {
      if (elem.isAardvarkSelectLink) { doSelect = true; } else if (elem.isAardvarkCloseButton) { doClose = true; }

      if (elem.id && elem.id.indexOf(s) == 0) {
        if (doSelect) {
          var e;
          for (var i = 0; i < elem.childNodes.length; i++) {
            e = elem.childNodes.item(i);
            if (e.isDboxInnerContainer) {
              highlightText(e);
            }
          }
        } else if (doClose) {
          aardvark.doc.body.removeChild(elem);
          aardvark.dBoxArray[parseInt(elem.id.substring(s.length))] = null;
        } else {
          aardvark.dragElement = elem;
          aardvark.dragStartPos = aardvark.getPos(elem);
          aardvark.dragClickX = aardvark.mousePosX;
          aardvark.dragClickY = aardvark.mousePosY;
        }
        if (evt.preventDefault) { evt.preventDefault(); } else { evt.returnValue = false; }
        return false;
      }
      elem = elem.parentNode;
    }
  },

  dBoxId: 0,
  dBoxArray: []
});

// todo:  remove use of prototype

function AardvarkDBox (bgColor, dragger, upperLeft, hideScrollbar, title, addSelectLink) {
  if (!aardvark.doc.didDboxCss) {
    aardvark.createCSSRule('div.aardvarkdbox div,div.aardvarkdbox table,div.aardvarkdbox td,div.aardvarkdbox tr,div.aardvarkdbox p,div.aardvarkdbox a', 'color: black; background-color: transparent; border: 0; font-family: arial; font-weight: normal; font-size: 13px; font-style: normal; text-align: left; text-decoration: none;  text-indent: 0;vertical-align: top; ');
    aardvark.createCSSRule('div.aardvarkdbox table', 'border-spacing:2px;border-collapse:separate;');
    aardvark.createCSSRule('div.aardvarkdbox td', 'text-align: center; vertical-align: middle');
    aardvark.createCSSRule('div.aardvarkdbox a, div.aardvarkdbox a:visited', 'color: #007;text-decoration: underline');
    aardvark.createCSSRule('div.aardvarkdbox a:hover', 'color: #00f;');
    aardvark.doc.didDboxCss = true;
  }
  var outerDiv; var f = null;

  if (upperLeft) { this.upperLeft = true; }
  this.dims = aardvark.getWindowDimensions();
  var dims = this.dims;
  dims.width -= 15;
  dims.height -= 15;
  this.bgColor = bgColor;

  this.id = aardvark.dBoxId;

  outerDiv = aardvark.doc.createElement('DIV');
  // outerDiv.style.visibility = "hidden";
  outerDiv.style.padding = '0';
  outerDiv.style.margin = '0';
  outerDiv.style.position = 'absolute';
  outerDiv.style.top = '-5000px'; /* (dims.scrollY + 5) + "px"; */
  outerDiv.style.left = '-5000px'; /* (dims.scrollX + 5) + "px"; */
  outerDiv.style.zIndex = '5025';
  outerDiv.style.width = (dims.width - 20) + 'px';
  outerDiv.style.height = (dims.height - 20) + 'px';
  outerDiv.id = 'aardvarkdbox-' + aardvark.dBoxId;
  outerDiv.className = 'aardvarkdbox';

  var draggerDiv = null;
  if (dragger) {
    draggerDiv = aardvark.doc.createElement('DIV');
    draggerDiv.style.cssFloat = 'left';
    draggerDiv.style.styleFloat = 'left';
    draggerDiv.style.fontFamily = 'arial';
    draggerDiv.style.padding = '2px';
    draggerDiv.style.margin = '0';
    draggerDiv.style.height = '14px';

    outerDiv.appendChild(draggerDiv);
    var closer = aardvark.doc.createElement('IMG');

    closer.src = aardvark.resourcePrefix + 'closedbox.gif';
    closer.style.cssFloat = 'left';
    closer.style.styleFloat = 'left';
    closer.style.width = '17px';
    closer.style.height = '17px';
    closer.alt = 'close';
    closer.style.margin = '-2px 4px 0 0';
    closer.style.cursor = 'pointer';
    closer.isAardvark = true;
    closer.isAardvarkCloseButton = true;
    draggerDiv.appendChild(closer);
    if (addSelectLink) {
      var a = aardvark.doc.createElement('div');
      a.innerHTML = 'select all';
      a.style.fontFamily = 'arial';
      a.style.padding = '0';
      a.style.margin = '0';
      a.style.textDecoration = 'underline';
      a.style.cssFloat = 'right';
      a.style.styleFloat = 'right';
      a.style.color = '#008';
      a.style.fontSize = '11px';
      a.style.cursor = 'pointer';
      a.isAardvarkSelectLink = true;
      draggerDiv.appendChild(a);
    }
    if (title) {
      draggerDiv.style.fontFamily = 'arial';
      draggerDiv.style.textAlign = 'left';
      draggerDiv.style.color = '#000';
      draggerDiv.style.fontSize = '12px';
      draggerDiv.appendChild(aardvark.doc.createTextNode(title));
      draggerDiv.appendChild(aardvark.doc.createElement('br'));
    }
    aardvark.setHandler(draggerDiv, 'mousedown', aardvark.dboxMouseDown);
  }
  f = aardvark.doc.createElement('DIV');
  f.isDboxInnerContainer = true;
  f.style.cssFloat = 'left';
  f.style.styleFloat = 'left';
  f.style.border = '0';
  f.style.margin = '0';
  f.style.padding = '4px';
  f.style.fontFamily = 'arial';
  f.style.fontSize = '13px';
  f.style.color = '#000';
  if (hideScrollbar) {
    f.style.overflow = 'hidden';
    f.scrolling = 'no';
  } else { f.style.overflow = 'auto'; }
  outerDiv.appendChild(f);
  aardvark.doc.body.appendChild(outerDiv);

  this.outerContainer = outerDiv;
  this.dragBar = draggerDiv;

  this.innerContainer = f;
  aardvark.dBoxArray[aardvark.dBoxId] = this;
  aardvark.dBoxId++;

  return this;
}

AardvarkDBox.prototype.show = function () {
  var dims = this.dims;
  var draggerHeight = 1;

  if (this.dragBar) { draggerHeight = 18; }

  var w = this.innerContainer.offsetWidth;
  if (!this.innerContainer.style.width || this.innerContainer.style.width != '') { w += 25; }
  if (this.dragBar) {
    var w2 = this.dragBar.offsetWidth + 12;
    if (w2 > w) { w = w2; }
    this.dragBar.style.cssFloat = '';
    this.dragBar.style.styleFloat = '';
  }

  if (w > dims.width - 20) { w = dims.width - 20; }
  this.outerContainer.style.width = w + 'px';
  this.innerContainer.style.width = w + 'px';

  if ((diff = this.innerContainer.offsetWidth - w) > 0) { this.innerContainer.style.width = (w - diff) + 'px'; }

  var h = this.innerContainer.offsetHeight; var diff;
  if (h > dims.height - 45) { h = dims.height - 45; }
  this.outerContainer.style.height = (h + draggerHeight) + 'px';
  this.innerContainer.style.height = h + 'px';

  if ((diff = this.innerContainer.offsetHeight - h) > 0) { this.innerContainer.style.height = (h - diff) + 'px'; }

  this.innerContainer.style.backgroundColor = this.bgColor;
  var x, y;

  if (this.upperLeft) {
    x = dims.scrollX + 20;
    y = dims.scrollY + 20;
  } else {
    x = dims.scrollX + (dims.width / 2) - (w / 2);
    y = dims.scrollY + (dims.height / 2) - (h / 2);
  }
  aardvark.moveElem(this.outerContainer, x, y);

  this.outerContainer.style.border = '1px solid #000';
  this.outerContainer.style.backgroundColor = '#888';

  if (this.dragBar) { this.dragBar.style.backgroundColor = '#d8d7dc'; }
  aardvark.setAardvarkElem(this.outerContainer);
// this.outerContainer.style.visibility = '';
};

AardvarkDBox.prototype.close = function () {
  aardvark.doc.body.removeChild(this.outerContainer);
};

function highlightText (elem) {
  if (aardvark.doc.selection) {
    var r1 = aardvark.doc.body.createTextRange();
    r1.moveToElementText(elem);
    r1.setEndPoint('EndToEnd', r1);
    r1.moveStart('character', 4);
    r1.moveEnd('character', 8);
    r1.select();
  } else {
    s = aardvark.window.getSelection();
    var r1 = aardvark.doc.createRange();
    r1.setStartBefore(elem);
    r1.setEndAfter(elem);
    s.addRange(r1);
  }
}
