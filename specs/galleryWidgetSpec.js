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
  var singleWidget;

  beforeEach(function() {
    thumbnailElement = document.getElementsByClassName('gallery-widget')[0];
    thumbnailWidget = galleryWidget.widgets[0];
    singleElement = document.getElementsByClassName('gallery-widget')[1];
    singleWidget = galleryWidget.widgets[1];
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

      it('should include the index of each item', function() {
        var secondImage = thumbnailWidget.elements.mainImages[1].getElementsByTagName('img')[0];
        expect(secondImage.getAttribute('data-index')).toBe('1');
      });

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

      it('should include the index of each item', function() {
        var secondImage = thumbnailWidget.elements.thumbnails[1];
        expect(secondImage.getAttribute('data-index')).toBe('1');
      });

      it('should add an onclick function', function() {
        var secondImage = thumbnailWidget.elements.thumbnails[1];
        expect(secondImage.onclick).toEqual(jasmine.any(Function));
      });

      it('should set the active class to the first image', function() {
        var thumbnailContainer = thumbnailElement.getElementsByClassName('thumbnail-scroll')[0];
        var firstImage = thumbnailContainer.getElementsByTagName('img')[0];

        expect(firstImage.className).toBe('thumbnail active');
      });
      
    });

    describe('Single mode', function() {

      it('should add single-mode class to gallery-widget', function() {
        expect(singleElement.className).toBe('gallery-widget single-mode');
      });

      it('should add an onclick function if on single mode', function() {
        var mainImage = singleWidget.elements.mainImages[1].getElementsByTagName('img')[0];
        expect(mainImage.onclick).toEqual(jasmine.any(Function));
      });

      it('should not add an onclick function if on thumbnail mode', function() {
        var mainImage = thumbnailWidget.elements.mainImages[1].getElementsByTagName('img')[0];
        expect(mainImage.onclick).toBe(null);
      });
      
    });

  });

  describe('Actions', function() {

    describe('changeImage (attached to onclick event)', function() {

      beforeEach(function() {
        clickElement(thumbnailWidget.elements.thumbnails[0]);
      });

      it('should set original Active Image as first image', function() {
        expect(thumbnailWidget.status.activeImage).toBe('0');
      });

      it('should set new Active Image on click', function() {
        clickElement(thumbnailWidget.elements.thumbnails[2]);
        expect(thumbnailWidget.status.activeImage).toBe('2');
      });

      it('should set the active class on the corresponding thumbnail and remove it from others', function() {
        var firstImage = thumbnailWidget.elements.thumbnails[0];
        var secondImage = thumbnailWidget.elements.thumbnails[1];

        clickElement(secondImage);

        expect(firstImage.className).toBe('thumbnail');
        expect(secondImage.className).toBe('thumbnail active');
      });

      it('should swap currently staged mainImage with newly selected one', function() {
        clickElement(thumbnailWidget.elements.thumbnails[2]);

        expect(thumbnailWidget.elements.mainImages[0].className).toBe('main-image exit-to-left on-left');
        expect(thumbnailWidget.elements.mainImages[2].className).toBe('main-image enter-from-right');
      });

    });

    describe('nextImage (attached to onclick event)', function() {

      beforeEach(function() {
        clickElement(singleWidget.elements.mainImages[0].getElementsByTagName('img')[0]);
      });

      it('should set image 2 (index 1) as Active Image', function() {
        expect(singleWidget.status.activeImage).toBe('1');
      });

      it('should set image 1(index 0) as Active Image after last image', function() {
        clickElement(singleWidget.elements.mainImages[1].getElementsByTagName('img')[0]);
        clickElement(singleWidget.elements.mainImages[2].getElementsByTagName('img')[0]);

        expect(singleWidget.status.activeImage).toBe('0');
      });

    });

  });

  // ---

  function clickElement(element) {
    var event = { target: element };
    element.onclick(event);
  }

});