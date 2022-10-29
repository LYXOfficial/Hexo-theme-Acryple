"use strict";

if (document.getElementById('history-container')) {
  var append = function append(parent, text) {
    if (typeof text === 'string') {
      var temp = document.createElement('div');
      temp.innerHTML = text; // 防止元素太多 进行提速

      var frag = document.createDocumentFragment();

      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }

      parent.appendChild(frag);
    } else {
      parent.appendChild(text);
    }
  };

  var history_get_data = function history_get_data() {
    var myDate = new Date();
    var myMonth = myDate.getMonth() + 1;

    if (myMonth < 10) {
      getMonth = "0" + String(myMonth);
    } else {
      getMonth = String(myMonth);
    }

    var getDate = String(myDate.getDate());

    if (getDate < 10) {
      getDate = "0" + String(getDate);
    } else {
      getDate = String(getDate);
    }

    var getMonthDate = "S" + getMonth + getDate;
    return ["https://cdn1.tianli0.top/gh/Zfour/Butterfly-card-history@latest/baiduhistory/json/" + getMonth + ".json", getMonthDate];
  };

  var history_data = history_get_data();
  fetch(history_data[0]).then(function (data) {
    return data.json();
  }).then(function (data) {
    console.log(data[history_data[1]]);
    html_item = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[history_data[1]][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        html_item += '<div class="swiper-slide history_slide"><span class="history_slide_time">A.D.' + item.year + '</span>' + '<span class="history_slide_link">' + item.title + '</span></div>';
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

    var history_container_wrapper = document.getElementById('history_container_wrapper');
    append(history_container_wrapper, html_item);
    var swiper_history = new Swiper('.history_swiper-container', {
      passiveListeners: true,
      spaceBetween: 30,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 30,
        slideShadows: false
      },
      loop: true,
      direction: 'vertical',
      autoplay: {
        disableOnInteraction: true,
        delay: 5000
      },
      mousewheel: false // autoHeight: true,

    });
    var history_comtainer = document.getElementById('history-container');

    history_comtainer.onmouseenter = function () {
      swiper_history.autoplay.stop();
    };

    history_comtainer.onmouseleave = function () {
      swiper_history.autoplay.start();
    };
  });
}