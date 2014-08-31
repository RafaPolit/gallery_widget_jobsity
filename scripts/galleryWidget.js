/* global Widget */
'use strict';

var galleryWidget = {

  initializeWidgets: function() {
    var widgets = document.getElementsByClassName('gallery-widget');

    for(var index = 0; index < widgets.length; index ++) {
      var widget = new Widget(widgets[index]);
      widget.initializeWidget();
    }
  }

};

/* -------------------------------------------------------------- */
/* Window Onload - All images loaded ---------------------------- */
window.addEventListener('load', galleryWidget.initializeWidgets);
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