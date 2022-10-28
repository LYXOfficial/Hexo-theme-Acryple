"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  var blogNameWidth, menusWidth, searchWidth, $nav;
  var mobileSidebarOpen = false;

  var adjustMenu = function adjustMenu(init) {
    if (init) {
      blogNameWidth = document.getElementById('site-name').offsetWidth;
      var $menusEle = document.querySelectorAll('#menus .menus_item');
      menusWidth = 0;
      $menusEle.length && $menusEle.forEach(function (i) {
        menusWidth += i.offsetWidth;
      });
      var $searchEle = document.querySelector('#search-button');
      searchWidth = $searchEle ? $searchEle.offsetWidth : 0;
      $nav = document.getElementById('nav');
    }

    var hideMenuIndex = '';
    if (window.innerWidth < 768) hideMenuIndex = true;else hideMenuIndex = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120;

    if (hideMenuIndex) {
      $nav.classList.add('hide-menu');
    } else {
      $nav.classList.remove('hide-menu');
    }
  }; // 初始化header


  var initAdjust = function initAdjust() {
    adjustMenu(true);
    $nav.classList.add('show');
  }; // sidebar menus


  var sidebarFn = {
    open: function open() {
      btf.sidebarPaddingR();
      document.body.style.overflow = 'hidden';
      btf.animateIn(document.getElementById('menu-mask'), 'to_show 0.5s');
      document.getElementById('sidebar-menus').classList.add('open');
      mobileSidebarOpen = true;
    },
    close: function close() {
      var $body = document.body;
      $body.style.overflow = '';
      $body.style.paddingRight = '';
      btf.animateOut(document.getElementById('menu-mask'), 'to_hide 0.5s');
      document.getElementById('sidebar-menus').classList.remove('open');
      mobileSidebarOpen = false;
    }
  };
  /**
   * 首頁top_img底下的箭頭
   */

  var scrollDownInIndex = function scrollDownInIndex() {
    var $scrollDownEle = document.getElementById('scroll-down');
    $scrollDownEle && $scrollDownEle.addEventListener('click', function () {
      btf.scrollToDest(document.getElementById('content-inner').offsetTop, 300);
    });
  };
  /**
   * 代碼
   * 只適用於Hexo默認的代碼渲染
   */


  var addHighlightTool = function addHighlightTool() {
    var highLight = GLOBAL_CONFIG.highlight;
    if (!highLight) return;
    var isHighlightCopy = highLight.highlightCopy;
    var isHighlightLang = highLight.highlightLang;
    var isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    var highlightHeightLimit = highLight.highlightHeightLimit;
    var isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
    var $figureHighlight = highLight.plugin === 'highlighjs' ? document.querySelectorAll('figure.highlight') : document.querySelectorAll('pre[class*="language-"]');
    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return;
    var isPrismjs = highLight.plugin === 'prismjs';
    var highlightShrinkEle = '';
    var highlightCopyEle = '';
    var highlightShrinkClass = isHighlightShrink === true ? 'closed' : '';

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = "<i class=\"fas fa-angle-down expand ".concat(highlightShrinkClass, "\"></i>");
    }

    if (isHighlightCopy) {
      highlightCopyEle = '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>';
    }

    var copy = function copy(text, ctx) {
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        document.execCommand('copy');

        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.success);
        } else {
          var prevEle = ctx.previousElementSibling;
          prevEle.innerText = GLOBAL_CONFIG.copy.success;
          prevEle.style.opacity = 1;
          setTimeout(function () {
            prevEle.style.opacity = 0;
          }, 700);
        }
      } else {
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport);
        } else {
          ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
        }
      }
    }; // click events


    var highlightCopyFn = function highlightCopyFn(ele) {
      var $buttonParent = ele.parentNode;
      $buttonParent.classList.add('copy-true');
      var selection = window.getSelection();
      var range = document.createRange();
      if (isPrismjs) range.selectNodeContents($buttonParent.querySelectorAll('pre code')[0]);else range.selectNodeContents($buttonParent.querySelectorAll('table .code pre')[0]);
      selection.removeAllRanges();
      selection.addRange(range);
      var text = selection.toString();
      copy(text, ele.lastChild);
      selection.removeAllRanges();
      $buttonParent.classList.remove('copy-true');
    };

    var highlightShrinkFn = function highlightShrinkFn(ele) {
      var $nextEle = _toConsumableArray(ele.parentNode.children).slice(1);

      ele.firstChild.classList.toggle('closed');

      if (btf.isHidden($nextEle[$nextEle.length - 1])) {
        $nextEle.forEach(function (e) {
          e.style.display = 'block';
        });
      } else {
        $nextEle.forEach(function (e) {
          e.style.display = 'none';
        });
      }
    };

    var highlightToolsFn = function highlightToolsFn(e) {
      var $target = e.target.classList;
      if ($target.contains('expand')) highlightShrinkFn(this);else if ($target.contains('copy-button')) highlightCopyFn(this);
    };

    var expandCode = function expandCode() {
      this.classList.toggle('expand-done');
    };

    function createEle(lang, item, service) {
      var fragment = document.createDocumentFragment();

      if (isShowTool) {
        var hlTools = document.createElement('div');
        hlTools.className = "highlight-tools ".concat(highlightShrinkClass);
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        hlTools.addEventListener('click', highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        var ele = document.createElement('div');
        ele.className = 'code-expand-btn';
        ele.innerHTML = '<i class="fas fa-angle-double-down"></i>';
        ele.addEventListener('click', expandCode);
        fragment.appendChild(ele);
      }

      if (service === 'hl') {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    }

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          var langName = item.getAttribute('data-language') ? item.getAttribute('data-language') : 'Code';
          var highlightLangEle = "<div class=\"code-lang\">".concat(langName, "</div>");
          btf.wrap(item, 'figure', {
            "class": 'highlight'
          });
          createEle(highlightLangEle, item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          var langName = item.getAttribute('class').split(' ')[1];
          if (langName === 'plain' || langName === undefined) langName = 'Code';
          var highlightLangEle = "<div class=\"code-lang\">".concat(langName, "</div>");
          createEle(highlightLangEle, item, 'hl');
        });
      }
    } else {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          btf.wrap(item, 'figure', {
            "class": 'highlight'
          });
          createEle('', item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          createEle('', item, 'hl');
        });
      }
    }
  };
  /**
   * PhotoFigcaption
   */


  function addPhotoFigcaption() {
    document.querySelectorAll('#article-container img').forEach(function (item) {
      var parentEle = item.parentNode;
      var altValue = item.title || item.alt;

      if (altValue && !parentEle.parentNode.classList.contains('justified-gallery')) {
        var ele = document.createElement('div');
        ele.className = 'img-alt is-center';
        ele.textContent = altValue;
        parentEle.insertBefore(ele, item.nextSibling);
      }
    });
  }
  /**
   * Lightbox
   */


  var runLightbox = function runLightbox() {
    btf.loadLightbox(document.querySelectorAll('#article-container img:not(.no-lightbox)'));
  };
  /**
   * justified-gallery 圖庫排版
   */


  var runJustifiedGallery = function runJustifiedGallery(ele) {
    ele.forEach(function (item) {
      var $imgList = item.querySelectorAll('img');
      $imgList.forEach(function (i) {
        var dataLazySrc = i.getAttribute('data-lazy-src');
        if (dataLazySrc) i.src = dataLazySrc;
        btf.wrap(i, 'div', {
          "class": 'fj-gallery-item'
        });
      });
    });

    if (window.fjGallery) {
      setTimeout(function () {
        btf.initJustifiedGallery(ele);
      }, 100);
      return;
    }

    var newEle = document.createElement('link');
    newEle.rel = 'stylesheet';
    newEle.href = GLOBAL_CONFIG.source.justifiedGallery.css;
    document.body.appendChild(newEle);
    getScript("".concat(GLOBAL_CONFIG.source.justifiedGallery.js)).then(function () {
      btf.initJustifiedGallery(ele);
    });
  };
  /**
   * 滾動處理
   */


  var scrollFn = function scrollFn() {
    var $rightside = document.getElementById('rightside');
    var innerHeight = window.innerHeight + 56; // 當滾動條小于 56 的時候

    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = 'opacity: 1; transform: translateX(-58px)';
      return;
    } // find the scroll direction


    function scrollDirection(currentTop) {
      var result = currentTop > initTop; // true is down & false is up

      initTop = currentTop;
      return result;
    }

    var initTop = 0;
    var isChatShow = true;
    var $header = document.getElementById('page-header');
    var isChatBtnHide = typeof chatBtnHide === 'function';
    var isChatBtnShow = typeof chatBtnShow === 'function';
    $header.classList.add('nav-fixed');
    $header.classList.add('nav-visible');

    window.scrollCollect = function () {
      return btf.throttle(function (e) {
        var currentTop = window.scrollY || document.documentElement.scrollTop;
        var isDown = scrollDirection(currentTop);
        $header.classList.add('nav-fixed');
        $header.classList.add('nav-visible');

        if (currentTop > 0) {
          if (isDown) {
            if ($header.classList.contains('nav-visible')) $header.classList.add('nav-visible');

            if (isChatBtnShow && isChatShow === true) {
              chatBtnHide();
              isChatShow = false;
            }
          } else {
            if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible');

            if (isChatBtnHide && isChatShow === false) {
              chatBtnShow();
              isChatShow = true;
            }
          }

          $header.classList.add('nav-fixed');

          if (window.getComputedStyle($rightside).getPropertyValue('opacity') === '0') {
            $rightside.style.cssText = ' transform: translateX(-58px)';
          }
        } else {
          if (currentTop === 0) {
            $header.classList.remove('nav-fixed', 'nav-visible');
          } // $rightside.style.cssText = "opacity: ''; transform: ''"

        }

        if (document.body.scrollHeight <= innerHeight) {//$rightside.style.cssText = 'opacity: 0.8; transform: translateX(-58px)'
        }
      }, 200)();
    };

    window.addEventListener('scroll', scrollCollect);
  };
  /**
  * toc,anchor
  */


  var scrollFnToDo = function scrollFnToDo() {
    var isToc = GLOBAL_CONFIG_SITE.isToc;
    var isAnchor = GLOBAL_CONFIG.isAnchor;
    var $article = document.getElementById('article-container');
    if (!($article && (isToc || isAnchor))) return;
    var $tocLink, $cardToc, scrollPercent, autoScrollToc, isExpand;

    if (isToc) {
      var $cardTocLayout = document.getElementById('card-toc');
      $cardToc = $cardTocLayout.getElementsByClassName('toc-content')[0];
      $tocLink = $cardToc.querySelectorAll('.toc-link');
      var $tocPercentage = $cardTocLayout.querySelector('.toc-percentage');
      isExpand = $cardToc.classList.contains('is-expand');

      scrollPercent = function scrollPercent(currentTop) {
        var docHeight = $article.clientHeight;
        var winHeight = document.documentElement.clientHeight;
        var headerHeight = $article.offsetTop;
        var contentMath = docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
        var scrollPercent = (currentTop - headerHeight) / contentMath;
        var scrollPercentRounded = Math.round(scrollPercent * 100);
        var percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded;
        $tocPercentage.textContent = percentage;
      };

      window.mobileToc = {
        open: function open() {
          $cardTocLayout.style.cssText = 'animation: toc-open .3s; opacity: 1; right: 55px';
        },
        close: function close() {
          $cardTocLayout.style.animation = 'toc-close .2s';
          setTimeout(function () {
            $cardTocLayout.style.cssText = "opacity:''; animation: ''; right: ''";
          }, 100);
        }
      }; // toc元素點擊

      $cardToc.addEventListener('click', function (e) {
        e.preventDefault();
        var target = e.target.classList;
        if (target.contains('toc-content')) return;
        var $target = target.contains('toc-link') ? e.target : e.target.parentElement;
        btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI($target.getAttribute('href')).replace('#', ''))), 300);

        if (window.innerWidth < 900) {
          window.mobileToc.close();
        }
      });

      autoScrollToc = function autoScrollToc(item) {
        var activePosition = item.getBoundingClientRect().top;
        var sidebarScrollTop = $cardToc.scrollTop;

        if (activePosition > document.documentElement.clientHeight - 100) {
          $cardToc.scrollTop = sidebarScrollTop + 150;
        }

        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150;
        }
      };
    } // find head position & add active class


    var list = $article.querySelectorAll('h1,h2,h3,h4,h5,h6');
    var detectItem = '';

    var findHeadPosition = function findHeadPosition(top) {
      if (top === 0) {
        return false;
      }

      var currentId = '';
      var currentIndex = '';
      list.forEach(function (ele, index) {
        if (top > btf.getEleTop(ele) - 80) {
          var id = ele.id;
          currentId = id ? '#' + encodeURI(id) : '';
          currentIndex = index;
        }
      });
      if (detectItem === currentIndex) return;
      if (isAnchor) btf.updateAnchor(currentId);
      detectItem = currentIndex;

      if (isToc) {
        $cardToc.querySelectorAll('.active').forEach(function (i) {
          i.classList.remove('active');
        });

        if (currentId === '') {
          return;
        }

        var currentActive = $tocLink[currentIndex];
        currentActive.classList.add('active');
        setTimeout(function () {
          autoScrollToc(currentActive);
        }, 0);
        if (isExpand) return;
        var parent = currentActive.parentNode;

        for (; !parent.matches('.toc'); parent = parent.parentNode) {
          if (parent.matches('li')) parent.classList.add('active');
        }
      }
    }; // main of scroll


    window.tocScrollFn = function () {
      return btf.throttle(function () {
        var currentTop = window.scrollY || document.documentElement.scrollTop;
        isToc && scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };

    window.addEventListener('scroll', tocScrollFn);
  };
  /**
   * Rightside
   */


  var rightSideFn = {
    switchReadMode: function switchReadMode() {
      // read-mode
      var $body = document.body;
      $body.classList.add('read-mode');
      var newEle = document.createElement('button');
      newEle.type = 'button';
      newEle.className = 'fas fa-sign-out-alt exit-readmode';
      $body.appendChild(newEle);

      function clickFn() {
        $body.classList.remove('read-mode');
        newEle.remove();
        newEle.removeEventListener('click', clickFn);
      }

      newEle.addEventListener('click', clickFn);
    },
    switchDarkMode: function switchDarkMode() {
      // Switch Between Light And Dark Mode
      var nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

      if (nowMode === 'light') {
        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      } else {
        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      } // handle some cases


      typeof utterancesTheme === 'function' && utterancesTheme();
      typeof changeGiscusTheme === 'function' && changeGiscusTheme();
      (typeof FB === "undefined" ? "undefined" : _typeof(FB)) === 'object' && window.loadFBComment();
      window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(function () {
        return window.disqusReset();
      }, 200);
      typeof runMermaid === 'function' && window.runMermaid();
    },
    showOrHideBtn: function showOrHideBtn(e) {
      // rightside 點擊設置 按鈕 展開
      var rightsideHideClassList = document.getElementById('rightside-config-hide').classList;
      rightsideHideClassList.toggle('show');

      if (e.classList.contains('show')) {
        rightsideHideClassList.add('status');
        setTimeout(function () {
          rightsideHideClassList.remove('status');
        }, 300);
      }

      e.classList.toggle('show');
    },
    scrollToTop: function scrollToTop() {
      // Back to top
      btf.scrollToDest(0, 500);
    },
    hideAsideBtn: function hideAsideBtn() {
      // Hide aside
      var $htmlDom = document.documentElement.classList;
      $htmlDom.contains('hide-aside') ? saveToLocal.set('aside-status', 'show', 2) : saveToLocal.set('aside-status', 'hide', 2);
      $htmlDom.toggle('hide-aside');
    },
    runMobileToc: function runMobileToc() {
      if (window.getComputedStyle(document.getElementById('card-toc')).getPropertyValue('opacity') === '0') window.mobileToc.open();else window.mobileToc.close();
    }
  };
  document.getElementById('rightside').addEventListener('click', function (e) {
    var $target = e.target.id ? e.target : e.target.parentNode;

    switch ($target.id) {
      case 'go-up':
        rightSideFn.scrollToTop();
        break;

      case 'rightside_config':
        rightSideFn.showOrHideBtn($target);
        break;

      case 'mobile-toc-button':
        rightSideFn.runMobileToc();
        break;

      case 'readmode':
        rightSideFn.switchReadMode();
        break;

      case 'darkmode':
        rightSideFn.switchDarkMode();
        break;

      case 'hide-aside-btn':
        rightSideFn.hideAsideBtn();
        break;

      default:
        break;
    }
  });
  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */

  var clickFnOfSubMenu = function clickFnOfSubMenu() {
    document.querySelectorAll('#sidebar-menus .site-page.group').forEach(function (item) {
      item.addEventListener('click', function () {
        this.classList.toggle('hide');
      });
    });
  };
  /**
   * 複製時加上版權信息
   */


  var addCopyright = function addCopyright() {
    var copyright = GLOBAL_CONFIG.copyright;

    document.body.oncopy = function (e) {
      e.preventDefault();
      var textFont;
      var copyFont = window.getSelection(0).toString();

      if (copyFont.length > copyright.limitCount) {
        textFont = copyFont + '\n' + '\n' + '\n' + copyright.languages.author + '\n' + copyright.languages.link + window.location.href + '\n' + copyright.languages.source + '\n' + copyright.languages.info;
      } else {
        textFont = copyFont;
      }

      if (e.clipboardData) {
        return e.clipboardData.setData('text', textFont);
      } else {
        return window.clipboardData.setData('text', textFont);
      }
    };
  };
  /**
   * 網頁運行時間
   */


  var addRuntime = function addRuntime() {
    var $runtimeCount = document.getElementById('runtimeshow');

    if ($runtimeCount) {
      var publishDate = $runtimeCount.getAttribute('data-publishDate');
      $runtimeCount.innerText = btf.diffDate(publishDate) + ' ' + GLOBAL_CONFIG.runtime;
    }
  };
  /**
   * 最後一次更新時間
   */


  var addLastPushDate = function addLastPushDate() {
    var $lastPushDateItem = document.getElementById('last-push-date');

    if ($lastPushDateItem) {
      var lastPushDate = $lastPushDateItem.getAttribute('data-lastPushDate');
      $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true);
    }
  };
  /**
   * table overflow
   */


  var addTableWrap = function addTableWrap() {
    var $table = document.querySelectorAll('#article-container :not(.highlight) > table, #article-container > table');

    if ($table.length) {
      $table.forEach(function (item) {
        btf.wrap(item, 'div', {
          "class": 'table-wrap'
        });
      });
    }
  };
  /**
   * tag-hide
   */


  var clickFnOfTagHide = function clickFnOfTagHide() {
    var $hideInline = document.querySelectorAll('#article-container .hide-button');

    if ($hideInline.length) {
      $hideInline.forEach(function (item) {
        item.addEventListener('click', function (e) {
          var $this = this;
          $this.classList.add('open');
          var $fjGallery = $this.nextElementSibling.querySelectorAll('.fj-gallery');
          $fjGallery.length && btf.initJustifiedGallery($fjGallery);
        });
      });
    }
  };

  var tabsFn = {
    clickFnOfTabs: function clickFnOfTabs() {
      document.querySelectorAll('#article-container .tab > button').forEach(function (item) {
        item.addEventListener('click', function (e) {
          var $this = this;
          var $tabItem = $this.parentNode;

          if (!$tabItem.classList.contains('active')) {
            var $tabContent = $tabItem.parentNode.nextElementSibling;
            var $siblings = btf.siblings($tabItem, '.active')[0];
            $siblings && $siblings.classList.remove('active');
            $tabItem.classList.add('active');
            var tabId = $this.getAttribute('data-href').replace('#', '');

            var childList = _toConsumableArray($tabContent.children);

            childList.forEach(function (item) {
              if (item.id === tabId) item.classList.add('active');else item.classList.remove('active');
            });
            var $isTabJustifiedGallery = $tabContent.querySelectorAll("#".concat(tabId, " .fj-gallery"));

            if ($isTabJustifiedGallery.length > 0) {
              btf.initJustifiedGallery($isTabJustifiedGallery);
            }
          }
        });
      });
    },
    backToTop: function backToTop() {
      document.querySelectorAll('#article-container .tabs .tab-to-top').forEach(function (item) {
        item.addEventListener('click', function () {
          btf.scrollToDest(btf.getEleTop(btf.getParents(this, '.tabs')), 300);
        });
      });
    }
  };

  var toggleCardCategory = function toggleCardCategory() {
    var $cardCategory = document.querySelectorAll('#aside-cat-list .card-category-list-item.parent i');

    if ($cardCategory.length) {
      $cardCategory.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          var $this = this;
          $this.classList.toggle('expand');
          var $parentEle = $this.parentNode.nextElementSibling;

          if (btf.isHidden($parentEle)) {
            $parentEle.style.display = 'block';
          } else {
            $parentEle.style.display = 'none';
          }
        });
      });
    }
  };

  var switchComments = function switchComments() {
    var switchDone = false;
    var $switchBtn = document.querySelector('#comment-switch > .switch-btn');
    $switchBtn && $switchBtn.addEventListener('click', function () {
      this.classList.toggle('move');
      document.querySelectorAll('#post-comment > .comment-wrap > div').forEach(function (item) {
        if (btf.isHidden(item)) {
          item.style.cssText = 'display: block;animation: tabshow .5s';
        } else {
          item.style.cssText = "display: none;animation: ''";
        }
      });

      if (!switchDone && typeof loadOtherComment === 'function') {
        switchDone = true;
        loadOtherComment();
      }
    });
  };

  var addPostOutdateNotice = function addPostOutdateNotice() {
    var data = GLOBAL_CONFIG.noticeOutdate;
    var diffDay = btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);

    if (diffDay >= data.limitDay) {
      var ele = document.createElement('div');
      ele.className = 'post-outdate-notice';
      ele.textContent = data.messagePrev + ' ' + diffDay + ' ' + data.messageNext;
      var $targetEle = document.getElementById('article-container');

      if (data.position === 'top') {
        $targetEle.insertBefore(ele, $targetEle.firstChild);
      } else {
        $targetEle.appendChild(ele);
      }
    }
  };

  var lazyloadImg = function lazyloadImg() {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: 'img',
      threshold: 0,
      data_src: 'lazy-src'
    });
  };

  var relativeDate = function relativeDate(selector) {
    selector.forEach(function (item) {
      var $this = item;
      var timeVal = $this.getAttribute('datetime');
      $this.innerText = btf.diffDate(timeVal, true);
      $this.style.display = 'inline';
    });
  };

  var unRefreshFn = function unRefreshFn() {
    window.addEventListener('resize', function () {
      adjustMenu(false);
      btf.isHidden(document.getElementById('toggle-menu')) && mobileSidebarOpen && sidebarFn.close();
    });
    document.getElementById('menu-mask').addEventListener('click', function (e) {
      sidebarFn.close();
    });
    clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
  };

  window.refreshFn = function () {
    initAdjust();

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll('#post-meta time'));
    } else {
      GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll('#recent-posts time'));
      GLOBAL_CONFIG.runtime && addRuntime();
      addLastPushDate();
      toggleCardCategory();
    }

    scrollFnToDo();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    addHighlightTool();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    scrollFn();
    var $jgEle = document.querySelectorAll('#article-container .fj-gallery');
    $jgEle.length && runJustifiedGallery($jgEle);
    runLightbox();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn.clickFnOfTabs();
    tabsFn.backToTop();
    switchComments();
    document.getElementById('toggle-menu').addEventListener('click', function () {
      sidebarFn.open();
    });
  };

  refreshFn();
  unRefreshFn();
});