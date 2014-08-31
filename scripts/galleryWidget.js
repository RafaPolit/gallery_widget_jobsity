/* global Widget */
'use strict';

var galleryWidget = {

  widgets: [],

  initializeWidgets: function() {
    var htmlWidgets = document.getElementsByClassName('gallery-widget');
    var widgets = this.widgets;

    for(var index = 0; index < htmlWidgets.length; index ++) {
      var widget = new Widget(htmlWidgets[index]);
      widget.initializeWidget();
      widgets.push(widget);
    }
  }

};

/* -------------------------------------------------------------- */
/* Window Onload - All images loaded ---------------------------- */
window.addEventListener('load', function() {
  galleryWidget.initializeWidgets();
});
/* -------------------------------------------------------------- */


function enter() {
  var mainImage = document.getElementsByClassName('main-image');
  console.log(mainImage);
  console.log(mainImage[0].className);
  mainImage[0].className = 'main-image enter-from-right';
}

function change() {
  var mainImage = document.getElementsByClassName('main-image');
  console.log(mainImage);
  console.log(mainImage[0].className);
  mainImage[0].className = 'main-image exit-to-left on-left';
  mainImage[1].className = 'main-image enter-from-right';
}