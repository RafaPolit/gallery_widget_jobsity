'use strict';

var Widget = function(widget) {

  return {

    widget: widget,

    elements: { mainImages: [], thumbnails: [] },

    status: { activeImage: 0, dataMode: 'thumbnail' },

    initializeWidget: function() {
      this.status.dataMode = this.widget.getAttribute('data-mode');
      if(this.status.dataMode === 'single') {
        this.widget.className = 'gallery-widget single-mode';
      }

      this.initializeThumbnails();
      this.initializeImageNumber();
      this.createMainImageContainer(this.widget);
      this.widget.appendChild(this.elements.mainImageContainer);
    },

    changeImage: function(event) {
      var clickedImage = event.target.getAttribute('data-index');

      this.elements.mainImages[this.status.activeImage].className = 'main-image exit-to-left on-left';
      this.elements.mainImages[clickedImage].className = 'main-image enter-from-right';
      this.setActiveThumbnail(clickedImage);

      this.status.activeImage = clickedImage;
    },

    nextImage: function(event) {
      var clickedImage = event.target.getAttribute('data-index');
      var nextImageIndex = ((Number(clickedImage) + 1) % this.elements.mainImages.length);
      var nextImageEvent = { target: this.elements.thumbnails[nextImageIndex] };
      this.elements.imageNumber.innerHTML = formatImageNumber(nextImageIndex + 1, this.elements.thumbnails.length);
      this.changeImage(nextImageEvent);
    },

    initializeThumbnails: function() {
      this.createThumbnailContainer(this.widget);

      if(this.status.dataMode === 'thumbnail') {
        this.widget.appendChild(this.elements.thumbnailContainer);
      }
    },

    initializeImageNumber: function() {
      this.elements.imageNumber = createElement({ tag: 'div', class: 'image-number' });
      this.elements.imageNumber.innerHTML = formatImageNumber(1, this.elements.thumbnails.length);
      if(this.status.dataMode === 'single') {
        this.widget.appendChild(this.elements.imageNumber);
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

      thumbnail.onclick = clickItem;

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
      var activeImage = this.elements.thumbnails[this.status.activeImage];
      activeImage.className = activeImage.className.replace(' active', '');
      this.elements.thumbnails[index].className += ' active';
    },

    createMainImageContainer: function() {
      this.elements.mainImageContainer = createElement({ tag: 'div', class: 'main-image-container' });
      this.createMainImages();
    },

    createMainImages: function() {
      var _this = this;
      function clickItem(event) { _this.nextImage(event); }

      for(var index = 0; index < this.elements.thumbnails.length; index++) {
        this.createMainImage(index, clickItem);
      }
    },

    createMainImage: function(index, clickItem) {
      var className = 'main-image ' + ((index === 0) ? 'enter-from-right' : 'on-right');

      var mainImage = createElement({ tag: 'div', class: className });

      var tableCell = createElement({ tag: 'div', class: 'table-cell'});
      mainImage.appendChild(tableCell);

      var img = createElement({
        tag: 'img',
        attributes: {
          src: this.elements.thumbnails[index].getAttribute('src'),
          'data-index': index
        }
      });

      if(this.widget.getAttribute('data-mode') === 'single') {
        img.onclick = clickItem;
      }

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

function formatImageNumber(number, total) {
  return number + '<span class="smaller"> / ' + total + '</span>';
}