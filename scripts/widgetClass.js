'use strict';

var Widget = function(widget) {

  return {

    widget: widget,

    elements: { thumbnails: [] },

    initializeWidget: function() {
      this.initializeThumbnails();
      this.createMainImageContainer(this.widget);
      this.widget.appendChild(this.elements.mainImageContainer);
    },

    changeImage: function(event) {
      var clicked_image = event.srcElement.getAttribute('data-index');
      this.setActiveThumbnail(clicked_image);
    },

    initializeThumbnails: function() {
      if(this.widget.getAttribute('data-mode') === 'thumbnail') {
        this.createThumbnailContainer(this.widget);
        this.widget.appendChild(this.elements.thumbnailContainer);
      }
    },

    createThumbnailContainer: function () {
      var thumbnailContainer = createElement({ tag: 'div', class: 'thumbnail-scroll' });
      this.elements.thumbnailContainer = thumbnailContainer;
      this.createThumbnails();
    },

    createThumbnails: function() {
      var _this = this;
      function clickItem(event) { _this.changeImage(event); }

      for(var index = 0; index < this.widget.getElementsByTagName('img').length; index++) {
        this.createThumbnail(index, clickItem);
        this.setActiveThumbnail(0);
      }
    },

    createThumbnail: function(index, clickItem) {
      var thumbnail = this.getThumbnail(index);
      var br = document.createElement('br');

      thumbnail.addEventListener('click', clickItem);

      this.elements.thumbnails.push(thumbnail);
      this.elements.thumbnailContainer.appendChild(thumbnail);
      this.elements.thumbnailContainer.appendChild(br);
    },

    getThumbnail: function(index)  {
      var thumbnail = this.widget.getElementsByTagName('img')[index].cloneNode();
      thumbnail.className = 'thumbnail';
      thumbnail.setAttribute('data-index', index);
      return thumbnail;
    },

    setActiveThumbnail: function(index) {
      this.setAllThumbnailsInactive();
      this.elements.thumbnails[index].className += ' active';
    },

    setAllThumbnailsInactive: function() {
      for(var img = 0; img < this.elements.thumbnails.length; img++) {
        var thumbnail = this.elements.thumbnails[img];
        thumbnail.className = thumbnail.className.replace(' active', '');
      }
    },

    createMainImageContainer: function() {
      this.elements.mainImageContainer = createElement({ tag: 'div', class: 'main-image-container' });
      this.createMainImage();
    },

    createMainImage: function() {
      var mainImage = createElement({ tag: 'div', class: 'main-image enter-from-right' });
      var first_image_src = this.widget.getElementsByTagName('img')[0].getAttribute('src');
      var img = createElement({ tag: 'img', attributes: { src: first_image_src } });

      mainImage.appendChild(img);

      this.elements.mainImageContainer.appendChild(mainImage);
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