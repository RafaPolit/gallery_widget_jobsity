'use strict'

/* ----------------------------------------------------- */
// Iterate over items in array with a callback function 
// that receives the item and the index as arguments

function forEach(array, callback) {
  for(var index = 0; index < array.length; index ++) {
    callback(array[index], index);
  }
}
/* ----------------------------------------------------- */


/* ----------------------------------------------------- */
// Return a new DOM element with class and attributes

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
/* ----------------------------------------------------- */