/* JSHint globals - Services and utilities -------- */
/* global forEach, createElement, formatImageNumber */
'use strict';

var WidgetDOM = function(widget) {

  return {

    createDOMElements: function() {
      this.assignClassName();
      this.createThumbnailsSection();
      this.createImageNumber();
      this.createMainImageSection();
    },

    assignClassName: function() {
      if(widget.status.dataMode === 'single') {
        widget.element.className = 'gallery-widget single-mode';
      }
    },

    createThumbnailsSection: function() {
      this.createThumbnailContainer();
      if(widget.status.dataMode === 'thumbnail') {
        widget.element.appendChild(this.thumbnailContainer);
      }
    },

    createThumbnailContainer: function () {
      this.thumbnailContainer = createElement({ tag: 'div', class: 'thumbnail-scroll' });
      this.createThumbnailElements();
    },

    createThumbnailElements: function() {
      var _this = this;
      forEach(widget.element.getElementsByTagName('img'), function(img, index) {
        _this.createThumbnail(img, index);
      });
    },

    createThumbnail: function(img, index) {
      var thumbnail = img.cloneNode();
      thumbnail.className = 'thumbnail';
      thumbnail.setAttribute('data-index', index);

      var br = document.createElement('br');

      this.thumbnails.push(thumbnail);
      this.thumbnailContainer.appendChild(thumbnail);
      this.thumbnailContainer.appendChild(br);
    },

    createMainImageSection: function() {
      this.mainImageContainer = createElement({ tag: 'div', class: 'main-image-container' });
      widget.element.appendChild(this.mainImageContainer);
      this.createMainImages();
    },

    createMainImages: function() {
      var _this = this;
      forEach(this.thumbnails, function(thumbnail, index) {
        _this.createMainImageElements(index);
      });
    },

    createMainImageElements: function(index) {
      var className = 'main-image ' + ((index === 0) ? 'enter-stage' : 'on-right');
      var mainImage = createElement({ tag: 'div', class: className });
      var tableCell = this.createTableCell(index);

      mainImage.appendChild(tableCell);

      this.mainImages.push(mainImage);
      this.mainImageContainer.appendChild(mainImage);
    },

    createTableCell: function(index) {
      var tableCell = createElement({ tag: 'div', class: 'table-cell'});
      var img = this.createTableCellImg(index);
      tableCell.appendChild(img);

      return tableCell;
    },

    createTableCellImg: function(index) {
      var img = createElement({
        tag: 'img',
        attributes: this.getImageAttributes(index)
      });

      return img;
    },

    getImageAttributes: function(index) {
      return {
        src: this.thumbnails[index].getAttribute('src'),
        'data-index': index
      };
    },

    createImageNumber: function() {
      this.imageNumber = createElement({ tag: 'div', class: 'image-number' });
      this.imageNumber.innerHTML = formatImageNumber(1, this.thumbnails.length);
      if(widget.status.dataMode === 'single') {
        widget.element.appendChild(this.imageNumber);
      }
    },

    thumbnails: [],

    mainImages: []

  };

};
