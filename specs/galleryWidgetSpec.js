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
      expect(thumbnailWidget.elements.mainImages.length).toBe(3);
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

      it('should set the active class to the first image', function() {
        var thumbnailContainer = thumbnailElement.getElementsByClassName('thumbnail-scroll')[0];
        var firstImage = thumbnailContainer.getElementsByTagName('img')[0];

        expect(firstImage.className).toBe('thumbnail active');
      });
      
    });

    describe('Main Images', function() {

      it('should append the main image container structure into widgets of both modes', function() {
        expect(thumbnailElement.getElementsByClassName('main-image-container').length).toBe(1);
        expect(thumbnailElement.getElementsByClassName('main-image').length).toBe(3);

        var firstImage = thumbnailElement.getElementsByClassName('main-image')[0];
        expect(firstImage.className).toBe('main-image enter-from-right');
        expect(firstImage.getElementsByTagName('img').length).toBe(1);
        expect(firstImage.getElementsByTagName('img')[0].getAttribute('src')).toBe('images/Barcelona_MNAC_9671.jpg');

        var secondImage = thumbnailElement.getElementsByClassName('main-image')[1];
        expect(secondImage.className).toBe('main-image on-right');
        expect(secondImage.getElementsByTagName('img')[0].getAttribute('src')).toBe('images/Florencia_Pieta_5780.jpg');

        expect(singleElement.getElementsByClassName('main-image-container').length).toBe(1);
      });

    });
  });

  describe('Actions', function() {

    describe('changeImage', function() {

      it('should set the active class on the corresponding thumbnail and remove it from others', function() {
        var firstImage = thumbnailWidget.elements.thumbnails[0];
        var secondImage = thumbnailWidget.elements.thumbnails[1];
        var event = { srcElement: secondImage };

        thumbnailWidget.changeImage(event);

        expect(firstImage.className).toBe('thumbnail');
        expect(secondImage.className).toBe('thumbnail active');
      });

      it('should swap currently staged mainImage with newly selected one', function() {
        var thirdImage = thumbnailWidget.elements.thumbnails[2];
        var event = { srcElement: thirdImage };

        thumbnailWidget.changeImage(event);

        expect(thumbnailWidget.elements.mainImages[0].className).toBe('main-image exit-to-left on-left');
        expect(thumbnailWidget.elements.mainImages[2].className).toBe('main-image enter-from-right');
      });

    });

  });

});