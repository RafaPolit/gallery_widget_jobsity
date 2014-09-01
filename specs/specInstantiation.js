/* global GalleryWidget */
'use strict';

/* ---------------------------------------------------------- */
/* hook to allow GalleryWidget to run before testing scripts  */

document.addEventListener('DOMContentLoaded', function() {
  GalleryWidget.initializeWidgets();
});

/* ---------------------------------------------------------- */