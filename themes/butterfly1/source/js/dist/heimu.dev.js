"use strict";

if (window.location.href.indexOf("posts") !== -1) {
  $(document).ready(function () {
    var l = document.getElementsByTagName("del");

    for (i = 0; i <= l.length; i++) {
      try {
        if (l[i].className !== "noheimu") {
          l[i].setAttribute("title", "你知道的太多了");
          l[i].setAttribute("data-toggle", "tooltip");
        }
      } catch (e) {
        l[i].setAttribute("title", "你知道的太多了");
        l[i].setAttribute("data-toggle", "tooltip");
      }
    }
  });
}