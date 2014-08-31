/* global galleryWidget */
'use strict';

/* ---------------------------------------------------------- */
/* hook to allow deferred scripts to run after initialization */
document.addEventListener('DOMContentLoaded', function() {
  galleryWidget.initializeWidgets();
});
/* ---------------------------------------------------------- */

describe('Gallery Widget', function() {

  var thumbnailElement;
  var thumbnailWidget;
  var singleElement;

  beforeEach(function() {
    thumbnailElement = document.getElementsByClassName('gallery-widget')[0];
    thumbnailWidget = galleryWidget.widgets[0];
    singleElement = document.getElementsByClassName('gallery-widget')[1];
  });

  describe('on Initialization', function() {

    it('should include each widget instance in the widgets property', function() {
      expect(galleryWidget.widgets.length).toBe(2);
    });

    it('should populate each widget elements property', function() {
      expect(thumbnailWidget.elements.mainImageContainer)
      .toBe(thumbnailElement.getElementsByClassName('main-image-container')[0]);

      expect(thumbnailWidget.elements.thumbnailContainer)
      .toBe(thumbnailElement.getElementsByClassName('thumbnail-scroll')[0]);

      expect(thumbnailWidget.elements.thumbnails.length).toBe(3);
    });

    describe('Thumbnail mode', function() {

      it('should create the Thumbnail section', function() {
        expect(thumbnailElement.getElementsByClassName('thumbnail-scroll').length).toBe(1);
        expect(singleElement.getElementsByClassName('thumbnail-scroll').length).toBe(0);
      });

      it('should append all the images inside the Thumbnail section', function() {
        var thumbnailContainer = thumbnailElement.getElementsByClassName('thumbnail-scroll')[0];
        var secondImage = thumbnailContainer.getElementsByTagName('img')[1];

        expect(thumbnailContainer.getElementsByTagName('img').length).toBe(3);
        expect(secondImage.getAttribute('src')).toBe('images/Florencia_Pieta_5780.jpg');
        expect(secondImage.className).toBe('thumbnail');
      });

      it('should append the active class to the first image', function() {
        var thumbnailContainer = thumbnailElement.getElementsByClassName('thumbnail-scroll')[0];
        var firstImage = thumbnailContainer.getElementsByTagName('img')[0];

        expect(firstImage.className).toBe('thumbnail active');
      });
      
    });

    describe('Main Image', function() {

      it('should append the main image container structure into widgets of both modes', function() {
        expect(thumbnailElement.getElementsByClassName('main-image-container').length).toBe(1);
        expect(thumbnailElement.getElementsByClassName('main-image').length).toBe(1);

        var mainImage = thumbnailElement.getElementsByClassName('main-image')[0];
        expect(mainImage.className).toBe('main-image enter-from-right');
        expect(mainImage.getElementsByTagName('img').length).toBe(1);
        expect(mainImage.getElementsByTagName('img')[0].getAttribute('src')).toBe('images/Barcelona_MNAC_9671.jpg');

        expect(singleElement.getElementsByClassName('main-image-container').length).toBe(1);
      });

    });
  });

  describe('Actions', function() {

    describe('on Thumbnail click', function() {

      it('should set the active class on the corresponding item and remove on others', function() {
        var thumbnailContainer = thumbnailElement.getElementsByClassName('thumbnail-scroll')[0];
        var firstImage = thumbnailContainer.getElementsByTagName('img')[0];
        var secondImage = thumbnailContainer.getElementsByTagName('img')[1];
        var event = { srcElement: secondImage };

        thumbnailWidget.changeImage(event);
        expect(firstImage.className).toBe('thumbnail');
        expect(secondImage.className).toBe('thumbnail active');
      });

    });

  });

});