'use strict';

var galleryWidget = {

  widgets: [],

  initializeWidgets: function() {
    this.widgets = document.getElementsByClassName('gallery-widget');
    for(var index = 0; index < this.widgets.length; index ++) {
      var mainImageContainer = createMainImageContainer(this.widgets[index]);
      this.widgets[index].appendChild(mainImageContainer);
    }
  }

};

window.addEventListener('load', galleryWidget.initializeWidgets);

function createMainImageContainer(widget) {
  var mainImageContainer = document.createElement('div');
  mainImageContainer.className =  'main-image-container';

  var mainImage = document.createElement('div');
  mainImage.className = 'main-image enter-from-right';
  mainImageContainer.appendChild(mainImage);

  var img = document.createElement('img');
  img.setAttribute('src', widget.getElementsByTagName('img')[0].getAttribute('src'));
  mainImage.appendChild(img);

  return mainImageContainer;
}



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