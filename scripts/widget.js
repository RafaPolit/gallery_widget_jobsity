/* JSHint globals - Services and utilities ----- */
/* global WidgetDOM, forEach, formatImageNumber  */
'use strict';

var Widget = function(widget) {

  return {

    element: widget,

    status: { activeImage: 0, dataMode: widget.getAttribute('data-mode') },

    initializeWidget: function() {
      this.DOM = WidgetDOM(this);
      this.DOM.createDOMElements();

      this.assignThumbnailClicks();

      if(this.DOM.thumbnails.length) { this.setActiveThumbnail(0); }
      if(this.status.dataMode === 'single') { this.assignMainImageClicks(); }
    },

    changeImage: function(event) {
      var clickedImage = event.target.getAttribute('data-index');

      this.DOM.mainImages[this.status.activeImage].className = 'main-image exit-stage on-left';
      this.DOM.mainImages[clickedImage].className = 'main-image enter-stage';
      this.setActiveThumbnail(clickedImage);

      this.status.activeImage = clickedImage;
    },

    nextImage: function(event) {
      var clickedImage = event.target.getAttribute('data-index');
      var nextImageIndex = ((Number(clickedImage) + 1) % this.DOM.mainImages.length);
      var nextImageEvent = { target: this.DOM.thumbnails[nextImageIndex] };
      this.DOM.imageNumber.innerHTML = formatImageNumber(nextImageIndex + 1, this.DOM.thumbnails.length);
      this.changeImage(nextImageEvent);
    },

    assignThumbnailClicks: function() {
      var _this = this;
      function clickItem(event) { _this.changeImage(event); }

      forEach(this.DOM.thumbnails, function(thumbnail) {
        thumbnail.onclick = clickItem;
      });
    },

    assignMainImageClicks: function() {
      var _this = this;
      function clickItem(event) { _this.nextImage(event); }

      forEach(this.DOM.mainImages, function(img) {
        img.getElementsByTagName('img')[0].onclick = clickItem;
      });
    },

    setActiveThumbnail: function(index) {
      var activeImage = this.DOM.thumbnails[this.status.activeImage];
      activeImage.className = activeImage.className.replace(' active', '');
      this.DOM.thumbnails[index].className += ' active';
    }

  };

};
