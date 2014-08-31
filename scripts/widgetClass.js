'use strict';

var Widget = function(widget) {

  return {

    widget: widget,

    initializeWidget: function() {
      if(this.widget.getAttribute('data-mode') === 'thumbnail') {
        this.initializeThumbnails();
      }

      var mainImageContainer = this.createMainImageContainer(this.widget);
      this.widget.appendChild(mainImageContainer);
    },

    initializeThumbnails: function() {
      var thumbnailContainer = this.createThumbnailContainer(this.widget);
      this.widget.appendChild(thumbnailContainer);
    },

    createThumbnailContainer: function () {
      var thumbnailContainer = createElement({ tag: 'div', class: 'thumbnail-scroll' });
      this.createThumbnails(thumbnailContainer);
      
      return thumbnailContainer; 
    },

    createThumbnails: function(thumbnailContainer) {
      for(var index = 0; index < this.widget.getElementsByTagName('img').length; index++) {
        var img = this.widget.getElementsByTagName('img')[index].cloneNode();
        img.className = 'thumbnail' + ((index === 0) ? ' active' : '');
        thumbnailContainer.appendChild(img);

        var br = document.createElement('br');
        thumbnailContainer.appendChild(br);
      }
    },

    createMainImageContainer: function() {
      var mainImageContainer = createElement({ tag: 'div', class: 'main-image-container' });

      var mainImage = createElement({ tag: 'div', class: 'main-image enter-from-right' });
      mainImageContainer.appendChild(mainImage);

      var first_image_src = this.widget.getElementsByTagName('img')[0].getAttribute('src');
      var img = createElement({ tag: 'img', attributes: { src: first_image_src } });
      mainImage.appendChild(img);

      return mainImageContainer;
    }

  };

};

// ---

function createElement(options) {
  var element = document.createElement(options.tag);
  element.className = options.class;

  for (var attr in options.attributes) {
    element.setAttribute(attr, options.attributes[attr]);
  }

  return element;
}