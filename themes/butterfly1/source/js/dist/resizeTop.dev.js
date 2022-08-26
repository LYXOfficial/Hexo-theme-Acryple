"use strict";

function getStyle(obj, name) {
  if (window.getComputedStyle) {
    return getComputedStyle(obj, null)[name];
  } else {
    return obj.currentStyle[name];
  }
}

try {
  if (getStyle(document.getElementById("toggle-menu"), "display").replace(/\s+|px/gi, "") != "none") {
    document.getElementById("menus").setAttribute("style", "display:none!important");
  } else {
    document.getElementById("menus").setAttribute("style", "");
  }
} catch (e) {}

var clientWidth = document.getElementById("content-inner").clientWidth;
var paddingLeft = Number(getStyle(document.getElementById("content-inner"), "paddingLeft").replace(/\s+|px/gi, ""));
var paddingRight = Number(getStyle(document.getElementById("content-inner"), "paddingRight").replace(/\s+|px/gi, ""));
var width = clientWidth - paddingLeft - paddingRight;

try {
  document.getElementById("top").setAttribute("style", "width:" + width.toString() + "px");
} catch (e) {}

$(document).ready(function () {
  var clientWidth = document.getElementById("content-inner").clientWidth;
  var paddingLeft = Number(getStyle(document.getElementById("content-inner"), "paddingLeft").replace(/\s+|px/gi, ""));
  var paddingRight = Number(getStyle(document.getElementById("content-inner"), "paddingRight").replace(/\s+|px/gi, ""));
  var width = clientWidth - paddingLeft - paddingRight;

  try {
    document.getElementById("top").setAttribute("style", "width:" + width.toString() + "px");
  } catch (e) {}

  function res() {
    var clientWidth = document.getElementById("content-inner").clientWidth;
    var paddingLeft = Number(getStyle(document.getElementById("content-inner"), "paddingLeft").replace(/\s+|px/gi, ""));
    var paddingRight = Number(getStyle(document.getElementById("content-inner"), "paddingRight").replace(/\s+|px/gi, ""));
    var width = clientWidth - paddingLeft - paddingRight;

    try {
      document.getElementById("top").setAttribute("style", "width:" + width.toString() + "px");
    } catch (e) {}
  }

  window.addEventListener('resize', res);
});