'use strict';

var galleryWidget = {

  initializeWidgets: function() {
    this.widgets = document.getElementsByClassName('gallery-widget');

    for(var index = 0; index < this.widgets.length; index ++) {

      if(this.widgets[index].getAttribute('data-mode') === 'thumbnail') {
        var thumbnailContainer = createThumbnailContainer(this.widgets[index]);
        this.widgets[index].appendChild(thumbnailContainer);
      }

      var mainImageContainer = createMainImageContainer(this.widgets[index]);
      this.widgets[index].appendChild(mainImageContainer);
    }
  }

};

/* -------------------------------------------------------------- */
/* Window Onload - All images loaded ---------------------------- */
window.addEventListener('load', galleryWidget.initializeWidgets);
/* -------------------------------------------------------------- */

function createThumbnailContainer(widget) {
  var thumbnailContainer = document.createElement('div');
  thumbnailContainer.className =  'thumbnail-scroll';

  for(var index = 0; index < widget.getElementsByTagName('img').length; index++) {
    var img = widget.getElementsByTagName('img')[index].cloneNode();
    img.className = 'thumbnail';
    thumbnailContainer.appendChild(img);
    var br = document.createElement('br');
    thumbnailContainer.appendChild(br);
  }
  
  return thumbnailContainer; 
}

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