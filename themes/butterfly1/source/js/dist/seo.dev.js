"use strict";

(function () {
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];

  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  } else {
    bp.src = 'https://push.zhanzhang.baidu.com/push.js';
  }

  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();

(function () {
  var el = document.createElement("script");
  el.src = "https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?c129f22fee96437743de78a7e5a87bda4a69a82ca3795ab38692465fc51da27a3871f0d6a9220c04b06cd03d5ba8e733fe66d20303562cd119c1d6f449af6378";
  el.id = "ttzz";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(el, s);
})(window)(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () {
    (c[a].q = c[a].q || []).push(arguments);
  };

  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "cxnso8ufhh");