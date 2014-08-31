'use strict';

function enter() {
  var mainImage = document.getElementsByClassName('main-image');
  console.log(mainImage);
  console.log(mainImage[0].className);
  mainImage[0].className = 'main-image enter-from-right';
}

function change() {
  var mainImage = document.getElementsByClassName('main-image');
  console.log(mainImage);
  console.log(mainImage[0].className);
  mainImage[0].className = 'main-image exit-to-left on-left';
  mainImage[1].className = 'main-image enter-from-right';
}