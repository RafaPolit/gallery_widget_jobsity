/* global Widget */
'use strict';

var galleryWidget = {

  widgets: [],

  initializeWidgets: function() {
    var htmlWidgets = document.getElementsByClassName('gallery-widget');

    for(var index = 0; index < htmlWidgets.length; index ++) {
      var widget = new Widget(htmlWidgets[index]);
      widget.initializeWidget();
      this.widgets.push(widget);
    }
  }

};

/* -------------------------------------------------------------- */
/* Window Onload - All images loaded ---------------------------- */
window.addEventListener('load', function() {
  galleryWidget.initializeWidgets();
});
/* -------------------------------------------------------------- */
