/* global galleryWidget */
'use strict';

/* ---------------------------------------------------------- */
/* hook to allow deferred scripts to run after initialization */
window.removeEventListener('load', galleryWidget.initializeWidgets);
document.addEventListener('DOMContentLoaded', function() {
  galleryWidget.initializeWidgets();
});
/* ---------------------------------------------------------- */

describe('Gallery Widget', function() {

  var thumbnailWidget;
  var singleWidget;

  beforeEach(function() {
    thumbnailWidget = document.getElementsByClassName('gallery-widget')[0];
    singleWidget = document.getElementsByClassName('gallery-widget')[1];
  });

  describe('on Initialization', function() {

    describe('Thumbnail mode', function() {

      it('should create the Thumbnail section', function() {
        expect(thumbnailWidget.getElementsByClassName('thumbnail-scroll').length).toBe(1);
        expect(singleWidget.getElementsByClassName('thumbnail-scroll').length).toBe(0);
      });

      it('should append all the images inside the Thumbnail section', function() {
        var thumbnail_container = thumbnailWidget.getElementsByClassName('thumbnail-scroll')[0];
        var second_image = thumbnail_container.getElementsByTagName('img')[1];

        expect(thumbnail_container.getElementsByTagName('img').length).toBe(3);
        expect(second_image.getAttribute('src')).toBe('images/Florencia_Pieta_5780.jpg');
        expect(second_image.className).toBe('thumbnail');
      });

      it('should append the active class to the first image', function() {
        var thumbnail_container = thumbnailWidget.getElementsByClassName('thumbnail-scroll')[0];
        var first_image = thumbnail_container.getElementsByTagName('img')[0];

        expect(first_image.className).toBe('thumbnail active');
      });
      
    });

    describe('Main Image', function() {

      it('should append the main image container structure into widgets of both modes', function() {
        expect(thumbnailWidget.getElementsByClassName('main-image-container').length).toBe(1);
        expect(thumbnailWidget.getElementsByClassName('main-image').length).toBe(1);

        var mainImage = thumbnailWidget.getElementsByClassName('main-image')[0];
        expect(mainImage.className).toBe('main-image enter-from-right');
        expect(mainImage.getElementsByTagName('img').length).toBe(1);
        expect(mainImage.getElementsByTagName('img')[0].getAttribute('src')).toBe('images/Barcelona_MNAC_9671.jpg');

        expect(singleWidget.getElementsByClassName('main-image-container').length).toBe(1);
      });

    });
  });

});