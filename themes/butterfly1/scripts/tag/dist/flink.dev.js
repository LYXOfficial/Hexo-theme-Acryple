/**
 * flink
 */
'use strict';

var urlFor = require('hexo-util').url_for.bind(hexo);

var flinkFn = function flinkFn(args, content) {
  content = hexo.render.renderSync({
    text: content,
    engine: 'yaml'
  });
  var result = '';
  content.forEach(function (i) {
    var className = i.class_name ? "<div class=\"flink-name\">".concat(i.class_name, "</div>") : '';
    var classDesc = i.class_desc ? "<div class=\"flink-desc\">".concat(i.class_desc, "</div>") : '';
    var listResult = '';
    i.link_list.forEach(function (j) {
      listResult += "\n          <div class=\"flink-list-item\">\n            <a href=\"".concat(j.link, "\" title=\"").concat(j.name, "\" target=\"_blank\">\n              <div class=\"flink-item-icon\">\n                <img class=\"no-lightbox\" src=\"").concat(j.avatar, "\" onerror='this.onerror=null;this.src=\"").concat(urlFor(hexo.theme.config.error_img.flink), "\"' alt=\"").concat(j.name, "\" />\n              </div>\n              <div class=\"flink-item-name\">").concat(j.name, "</div> \n              <div class=\"flink-item-desc\" title=\"").concat(j.descr, "\">").concat(j.descr, "</div>\n            </a>\n          </div>");
    });
    result += "".concat(className).concat(classDesc, " <div class=\"flink-list\">").concat(listResult, "</div>");
  });
  return "<div class=\"flink\">".concat(result, "</div>");
};

hexo.extend.tag.register('flink', flinkFn, {
  ends: true
});