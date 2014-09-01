/* JSHint globals - Services and utilities -------- */
/* global GalleryWidget */
'use strict';

describe('Gallery Widget', function() {

  var thumbnailElement;
  var thumbnailWidget;
  var singleElement;
  var singleWidget;

  beforeEach(function() {
    thumbnailElement = document.getElementsByClassName('gallery-widget')[0];
    thumbnailWidget = GalleryWidget.widgets[0];
    singleElement = document.getElementsByClassName('gallery-widget')[1];
    singleWidget = GalleryWidget.widgets[1];
  });

  describe('on Initialization', function() {

    it('should instance all widgets without failing if no images present', function() {
      expect(GalleryWidget.widgets.length).toBe(3);
    });

    it('should populate each widget elements property', function() {
      expect(thumbnailWidget.DOM.mainImageContainer)
      .toBe(thumbnailElement.getElementsByClassName('main-image-container')[0]);

      expect(thumbnailWidget.DOM.thumbnailContainer)
      .toBe(thumbnailElement.getElementsByClassName('thumbnail-scroll')[0]);

      expect(singleWidget.DOM.imageNumber)
      .toBe(singleElement.getElementsByClassName('image-number')[0]);

      expect(thumbnailWidget.DOM.thumbnails.length).toBe(3);
      expect(thumbnailWidget.DOM.mainImages.length).toBe(3);
    });

    describe('Main Images', function() {

      it('should append the main image container structure into widgets of both modes', function() {
        expect(thumbnailElement.getElementsByClassName('main-image-container').length).toBe(1);
        expect(thumbnailElement.getElementsByClassName('main-image').length).toBe(3);

        var firstImage = thumbnailElement.getElementsByClassName('main-image')[0];
        expect(firstImage.className).toBe('main-image enter-stage');
        expect(firstImage.getElementsByTagName('img').length).toBe(1);
        expect(firstImage.getElementsByTagName('img')[0].getAttribute('src')).toBe('images/Barcelona_MNAC_9671.jpg');

        var secondImage = thumbnailElement.getElementsByClassName('main-image')[1];
        expect(secondImage.className).toBe('main-image on-right');
        expect(secondImage.getElementsByTagName('img')[0].getAttribute('src')).toBe('images/Florencia_Pieta_5780.jpg');

        expect(singleElement.getElementsByClassName('main-image-container').length).toBe(1);
      });

      it('should include the index of each item', function() {
        var secondImage = thumbnailWidget.DOM.mainImages[1].getElementsByTagName('img')[0];
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
        var secondImage = thumbnailWidget.DOM.thumbnails[1];
        expect(secondImage.getAttribute('data-index')).toBe('1');
      });

      it('should add an onclick function', function() {
        var secondImage = thumbnailWidget.DOM.thumbnails[1];
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

      it('should add an image-number section only for single mode widgets', function() {
        expect(singleElement.getElementsByClassName('image-number').length).toBe(1);
        expect(thumbnailElement.getElementsByClassName('image-number').length).toBe(0);
      });

      it('should add text to the image-number section', function() {
        expect(singleWidget.DOM.imageNumber.innerHTML).toBe('1<span class="smaller"> / 3</span>');
      });

      it('should add an onclick function if on single mode', function() {
        var mainImage = singleWidget.DOM.mainImages[1].getElementsByTagName('img')[0];
        expect(mainImage.onclick).toEqual(jasmine.any(Function));
      });

      it('should not add an onclick function if on thumbnail mode', function() {
        var mainImage = thumbnailWidget.DOM.mainImages[1].getElementsByTagName('img')[0];
        expect(mainImage.onclick).toBe(null);
      });
      
    });

  });

  describe('Actions', function() {

    describe('changeImage (attached to onclick event)', function() {

      beforeEach(function() {
        clickElement(thumbnailWidget.DOM.thumbnails[0]);
      });

      it('should set original Active Image as first image', function() {
        expect(thumbnailWidget.status.activeImage).toBe('0');
      });

      it('should set new Active Image on click', function() {
        clickElement(thumbnailWidget.DOM.thumbnails[2]);
        expect(thumbnailWidget.status.activeImage).toBe('2');
      });

      it('should set the active class on the corresponding thumbnail and remove it from others', function() {
        var firstImage = thumbnailWidget.DOM.thumbnails[0];
        var secondImage = thumbnailWidget.DOM.thumbnails[1];

        clickElement(secondImage);

        expect(firstImage.className).toBe('thumbnail');
        expect(secondImage.className).toBe('thumbnail active');
      });

      it('should swap currently staged mainImage with newly selected one', function() {
        clickElement(thumbnailWidget.DOM.thumbnails[2]);
        expect(thumbnailWidget.DOM.mainImages[0].className).toBe('main-image exit-stage on-left');
        expect(thumbnailWidget.DOM.mainImages[2].className).toBe('main-image enter-stage');
      });

    });

    describe('nextImage (attached to onclick event)', function() {

      beforeEach(function() {
        clickElement(singleWidget.DOM.mainImages[0].getElementsByTagName('img')[0]);
      });

      it('should set new Active Image', function() {
        expect(singleWidget.status.activeImage).toBe('1');
      });

      it('should set new number in image number section', function() {
        expect(singleWidget.DOM.imageNumber.innerHTML).toBe('2<span class="smaller"> / 3</span>');
      });

      it('should set image 1 (index 0) as Active Image after last image', function() {
        clickElement(singleWidget.DOM.mainImages[1].getElementsByTagName('img')[0]);
        clickElement(singleWidget.DOM.mainImages[2].getElementsByTagName('img')[0]);
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