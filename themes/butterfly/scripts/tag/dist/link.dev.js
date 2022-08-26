"use strict";

function link(args) {
  args = args.join(' ').split(',');
  var title = args[0];
  var sitename = args[1];
  var link = args[2]; // 获取网页favicon

  var urlNoProtocol = link.replace(/^https?\:\/\//i, "");
  var imgUrl = "https://api.iowen.cn/favicon/" + urlNoProtocol + ".png";
  return "<a class=\"tag-Link\" target=\"_blank\" href=\"".concat(link, "\">\n    <div class=\"tag-link-tips\">\u5F15\u7528\u7AD9\u5916\u5730\u5740</div>\n    <div class=\"tag-link-bottom\">\n        <div class=\"tag-link-left\" style=\"background-image: url(").concat(imgUrl, ");\"></div>\n        <div class=\"tag-link-right\">\n            <div class=\"tag-link-title\">").concat(title, "</div>\n            <div class=\"tag-link-sitename\">").concat(sitename, "</div>\n        </div>\n        <i class=\"fa-solid fa-angle-right\"></i>\n    </div>\n    </a>");
}

hexo.extend.tag.register('link', link, {
  ends: false
});