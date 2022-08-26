"use strict";

hexo.extend.generator.register('random', function (locals) {
  var config = hexo.config.random || {};
  var posts = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = locals.posts.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var post = _step.value;
      if (post.random !== false) posts.push(post.path);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    path: config.path || '/js/random.js',
    data: "var posts=".concat(JSON.stringify(posts), ";function toRandomPost(){window.open('/'+posts[Math.floor(Math.random() * posts.length)],\"_self\");};")
  };
});