/* JSHint globals */
/* global Widget, forEach  */
'use strict';

var GalleryWidget = {

  widgets: [],

  initializeWidgets: function() {
    var htmlWidgets = document.getElementsByClassName('gallery-widget');
    var _this = this;

    forEach(htmlWidgets, function(widget) {
      widget = Widget(widget);
      widget.initializeWidget();
      _this.widgets.push(widget);
    });
  }

};

/* -------------------------------------------------------------- */
// Window Onload - All images loaded
window.addEventListener('load', function() {
  GalleryWidget.initializeWidgets();
});
/* -------------------------------------------------------------- */