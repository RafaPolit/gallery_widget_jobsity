'use strict';

var Widget = function(widget) {

  return {

    widget: widget,

    elements: { activeImage: 0, mainImages: [], thumbnails: [] },

    initializeWidget: function() {
      this.initializeThumbnails();
      this.createMainImageContainer(this.widget);
      this.widget.appendChild(this.elements.mainImageContainer);
    },

    changeImage: function(event) {
      var clicked_image = event.srcElement.getAttribute('data-index');

      this.elements.mainImages[this.elements.activeImage].className = 'main-image exit-to-left on-left';
      this.elements.mainImages[clicked_image].className = 'main-image enter-from-right';
      this.setActiveThumbnail(clicked_image);

      this.elements.activeImage = clicked_image;
    },

    initializeThumbnails: function() {
      this.createThumbnailContainer(this.widget);
      
      if(this.widget.getAttribute('data-mode') === 'thumbnail') {
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
      this.createMainImages();
    },

    createMainImages: function() {
      for(var index = 0; index < this.elements.thumbnails.length; index++) {
        this.createMainImage(index);
      }
    },

    createMainImage: function(index) {
      var className = 'main-image ' + ((index === 0) ? 'enter-from-right' : 'on-right');
      var mainImage = createElement({ tag: 'div', class: className });

      var tableCell = createElement({ tag: 'div', class: 'table-cell'});
      mainImage.appendChild(tableCell);

      var img = createElement(
        {tag: 'img', attributes: { src: this.elements.thumbnails[index].getAttribute('src') }
      });

      tableCell.appendChild(img);
      this.elements.mainImages.push(mainImage);

      this.elements.mainImageContainer.appendChild(mainImage);
    }

  };

};

// ---

function createElement(options) {
  var element = document.createElement(options.tag);

  if(options.class) {
    element.className = options.class;
  }

  for (var attr in options.attributes) {
    element.setAttribute(attr, options.attributes[attr]);
  }

  return element;
}