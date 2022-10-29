---
title: butterfly博客自定义右键菜单升级版
abbrlink: 11eb4aac
date: 2022-08-17 09:07:28
tags: 
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
swiper_index: 9
description: 更好的右键菜单mod
cover: https://bu.dusays.com/2022/09/01/63103a589651a.webp
updated: 2022-10-04 08:50:19
---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

很久以前，[Dorakika](https://blog.dorakika.cn)自己做了一个不错的右键菜单，借鉴于Volantis主题，当然我是在[洪哥的博客](https://blog.zhheo.com/p/5e931b65.html)里面看到的。

{% link 自定义右键菜单,Dorakika,https://blog.dorakika.cn/p/20220118.html %}

然后我就给它做了一些小改进，并且分享给大家。

# 我做了什么？

{% note info %}
2022.9.17更新：

在MrZeFr的建议下，增加了ctrl显示原版功能。

![1663414887119.png](https://bu.dusays.com/2022/09/17/6325b26cc8f65.png)

![1663414895340.png](https://bu.dusays.com/2022/09/17/6325b2716e405.png)
{% endnote %}

![1660699020974.webp](https://bu.dusays.com/2022/09/03/631372f79550e.webp)

![1660699034686.webp](https://bu.dusays.com/2022/09/03/6313732c20e1b.webp)

原版的菜单只有昼夜切换、阅读模式、主题切换、复制、其它设置和一些基础的浏览器功能，我添加了这些功能：

1. 粘贴功能
   ![1660699109204.webp](https://bu.dusays.com/2022/09/03/631373512312a.webp)
2. 空降评论、随便逛逛、繁简转换、版权声明功能（分享已删）

![1660699153037.webp](https://bu.dusays.com/2022/09/03/6313736a539e1.webp)

3. 复制文章地址功能

![1660699573998.webp](https://bu.dusays.com/2022/09/03/631373805bdae.webp)

4. 图片方面的一些功能

![1660699615891.webp](https://bu.dusays.com/2022/09/03/6313742896544.webp)

5. 对于a标签的打开功能

![1660699665936.webp](https://bu.dusays.com/2022/09/03/631373aaaa9a1.webp)

6. 百度搜索文本和转到链接功能

![1660700020712.webp](https://bu.dusays.com/2022/09/03/631373c29ca00.webp)

7. 兼容dorakika的评论弹幕功能

![1660700055672.webp](https://bu.dusays.com/2022/09/03/631373da2a131.webp)

8. Ctrl唤出原版右键菜单

![1663414955319.png](https://bu.dusays.com/2022/09/17/6325b2ad033aa.png)

并且换用了font awesome图标，除了百度和繁简转换的logo需要你下载iconfont图标库，也会放出教程

# 如何修改？

下面放出魔改教程，使用我修改过的pug和js进行魔改，参照自dorakika的原版。

## PUG部分

新建 `[blogRoot]\themes\butterfly\layout\includes\rightmenu.pug`，编写以下内容：

```js
#rightMenu
	.rightMenu-group.rightMenu-small
		a.rightMenu-item(href="javascript:window.history.back();")
			i.fa.fa-arrow-left
		a.rightMenu-item(href="javascript:window.history.forward();")
			i.fa.fa-arrow-right
		a.rightMenu-item(href="javascript:window.location.reload();")
			i.fa.fa-refresh
		a.rightMenu-item(href="javascript:rmf.scrollToTop();")
			i.fa.fa-arrow-up
	.rightMenu-group.rightMenu-line.hide#menu-text
		a.rightMenu-item(href="javascript:rmf.copySelect();")
			i.fa.fa-copy
			span='复制'
		a.rightMenu-item(href="javascript:window.open(\"https://www.baidu.com/s?wd=\"+window.getSelection().toString());window.location.reload();")
			i.iconfont.icon-baidu
			span='百度搜索'
	.rightMenu-group.rightMenu-line.hide#menu-too
		a.rightMenu-item(href="javascript:window.open(window.getSelection().toString());window.location.reload();")
			i.fa.fa-link
			span='转到链接'
	.rightMenu-group.rightMenu-line.hide#menu-paste
		a.rightMenu-item(href='javascript:rmf.paste()')
			i.fa.fa-copy
			span='粘贴'
	.rightMenu-group.rightMenu-line.hide#menu-post
		a.rightMenu-item(href="#post-comment")
			i.fas.fa-comment
			span='空降评论'
		a.rightMenu-item(href="javascript:rmf.copyWordsLink()")
			i.fa.fa-link
			span='复制本文地址'
	.rightMenu-group.rightMenu-line.hide#menu-to
		a.rightMenu-item(href="javascript:rmf.openWithNewTab()")
			i.fa.fa-window-restore
			span='新窗口打开'
		a.rightMenu-item#menu-too(href="javascript:rmf.open()")
			i.fa.fa-link
			span='转到链接'
		a.rightMenu-item(href="javascript:rmf.copyLink()")
			i.fa.fa-copy
			span='复制链接'
	.rightMenu-group.rightMenu-line.hide#menu-img
		a.rightMenu-item(href="./#post-comment")
			i.fa.fa-download
			span='保存图片'
		a.rightMenu-item(href="javascript:rmf.openWithNewTab()")
			i.fa.fa-window-restore
			span='在新窗口打开'
		a.rightMenu-item(href="javascript:rmf.click()")
			i.fa.fa-arrows-alt
			span='全屏显示'
		a.rightMenu-item(href="javascript:rmf.copyLink()")
			i.fa.fa-copy
			span='复制图片链接'
	.rightMenu-group.rightMenu-line
		a.rightMenu-item(href="javascript:toRandomPost()")
			i.fa.fa-paper-plane
			span='随便逛逛'
		a.rightMenu-item(href="javascript:rmf.switchDarkMode();")
			i.fa.fa-moon
			span='昼夜切换'
		a.rightMenu-item(href="javascript:rmf.translate();")
			i.iconfont.icon-fanti
			span='繁简转换'
		if is_home()==false
			a.rightMenu-item(href="javascript:rmf.switchReadMode();")
				i.fa.fa-book
				span='阅读模式'
		a.rightMenu-item(href="javascript:window.location.href=\"/about/\";")
			i.fa.fa-info-circle
			span='版权声明'
```

如果你加了评论弹幕的话，改为：（删掉+号，仅用作标记）

```diff
 #rightMenu
	.rightMenu-group.rightMenu-small
		...
	.rightMenu-group.rightMenu-line.hide#menu-paste
		a.rightMenu-item(href='javascript:rmf.paste()')
			i.fa.fa-copy
			span='粘贴'
	.rightMenu-group.rightMenu-line.hide#menu-post
		...
+		 a.rightMenu-item(href="javascript:switchCommentBarrage()")
+ 		 	 i.fa.fa-bell-slash
+ 			 span='开/关评论弹幕'
		a.rightMenu-item(href="javascript:rmf.copyWordsLink()")
			i.fa.fa-link
			span='复制本文地址'
	.rightMenu-group.rightMenu-line.hide#menu-to
		...
```

然后在 `[blogRoot]/themes/butterfly/layout/includes/layout.pug`中引入（注意缩进，去掉+）

```diff
doctype html
html(lang=config.language data-theme=theme.display_mode class=htmlClassHideAside)
  head
    include ./head.pug
  body
    ...

    else
      include ./404.pug

    include ./rightside.pug
    !=partial('includes/third-party/search/index', {}, {cache: true})
+    !=partial('includes/rightmenu',{}, {cache:true})
    include ./additional-js.pug
```

# CSS部分

新建 `[blogRoot]/themes/butterfly/source/css/rightmenu.css`

编辑以下内容：

```css
/* rightMenu */
#rightMenu{
	display: none;
	position: fixed;
	width: 160px;
	height: fit-content;
	top: 10%;
	left: 10%;
	background-color: var(--card-bg);
	border: 1px solid var(--font-color);
	border-radius: 8px;
	z-index: 100;
}
#rightMenu .rightMenu-group{
	padding: 7px 6px;
}
#rightMenu .rightMenu-group:not(:nth-last-child(1)){
	border-bottom: 1px solid var(--font-color);
}
#rightMenu .rightMenu-group.rightMenu-small{
	display: flex;
	justify-content: space-between;
}
#rightMenu .rightMenu-group .rightMenu-item{
	height: 30px;
	line-height: 30px;
	border-radius: 8px;
	transition: 0.3s;
	color: var(--font-color);
}
#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item{
	display: flex;
	height: 40px;
	line-height: 40px;
	padding: 0 4px;
}
#rightMenu .rightMenu-group .rightMenu-item:hover{
	background-color: var(--text-bg-hover);
}
#rightMenu .rightMenu-group .rightMenu-item i{
	display: inline-block;
	text-align: center;
	line-height: 30px;
	width: 30px;
	height: 30px;
	padding: 0 5px;
}
#rightMenu .rightMenu-group .rightMenu-item span{
	line-height: 30px;
}

#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item *{
	height: 40px;
	line-height: 40px;
}
.rightMenu-group.hide{
	display: none;
}
```

这是dorakika的原版css，你也可以试试我的版本，不保证完全可用：

```css
/* rightMenu */
[data-theme='light'] #rightMenu{
	display: none;
	position: fixed;
	width: 160px;
	height: fit-content;
	top: 10%;
	left: 10%;
	background-color: var(--card-bg);
	border: 1px solid rgb(210,210,210);;
	border-radius: 8px;
	z-index: 100;
	box-shadow: 3px 3px 5px #88888894;
	background-color: var(--lyx-white-acrylic1);
	backdrop-filter: blur(30px);
}
[data-theme='dark'] #rightMenu{
	display: none;
	position: fixed;
	width: 160px;
	height: fit-content;
	top: 10%;
	left: 10%;
	background-color: var(--card-bg);
	border: 1px solid rgb(210,210,210);;
	border-radius: 8px;
	z-index: 100;
	box-shadow: 3px 3px 5px #88888894;
	background-color: var(--lyx-black-acrylic1);
	backdrop-filter: blur(30px);
}
#rightMenu .rightMenu-group{
	padding: 7px 6px;
}
#rightMenu .rightMenu-group:not(:nth-last-child(1)){
	border-bottom: 1px solid rgb(180,180,180);
}
#rightMenu .rightMenu-group.rightMenu-small{
	display: flex;
	justify-content: space-between;
}
#rightMenu .rightMenu-group .rightMenu-item{
	height: 30px;
	line-height: 30px;
	border-radius: 8px;
	transition: 0.3s;
	color: var(--font-color);
}
#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item{
	display: flex;
	height: 40px;
	line-height: 40px;
	padding: 0 4px;
}
#rightMenu .rightMenu-group .rightMenu-item:hover{
	background-color: var(--text-bg-hover);
    box-shadow: 0px 0px 5px var(--lyx-border);
}
#rightMenu .rightMenu-group .rightMenu-item i{
	display: inline-block;
	text-align: center;
	line-height: 30px;
	width: 30px;
	height: 30px;
	padding: 0 5px;
}
#rightMenu .rightMenu-group .rightMenu-item span{
	line-height: 30px;
}
#rightMenu:hover{
	border: 1px solid var(--lyx-blue);
    /* box-shadow:0 0 3px var(--lyx-blue)!important; */
}
#rightMenu .rightMenu-group.rightMenu-line .rightMenu-item *{
	height: 40px;
	line-height: 40px;
}
.rightMenu-group.hide{
	display: none;
}
.rightMenu-item:hover{
    color:white!important;
    background-color:var(--lyx-blue)!important;
}
:root{
    --lyx-border:#c9c9c9;
    --lyx-blue:#6cf;
    --lyx-gray:#e2e2e2;
    --lyx-theme:#6cf;
    --lyx-green:#39c5bb;
    --lyx-black-acrylic1: #0008;
    --lyx-black-acrylic2: #000a;
    --lyx-black-acrylic3:#00000099;
    --lyx-black:black;
    --lyx-white:white;
    --lyx-white-acrylic1:#fffd;
    --lyx-white-acrylic2:#fffa;
    --lyx-blackgray:#797979;
    --lyx-0:#0000;
    --lyx-scrollbar: #acacacDD;
}
```

然后在主题配置文件中引入：

```yaml
inject:
  head:
  - <link rel="stylesheet" href="/css/rightmenu.css">
  - ...
  bottom:
  - ...
```

# iconfont图标

因为少部分图标使用iconfont，你需要自己添加，下载我的iconfont图标包，然后解压把里面的东西扔到 `[blogRoot]/themes/butterfly/source/css`里面即可

{% link 图标包,蓝奏云,https://xydc.lanzouv.com/iRlu409ouaba %}

然后在主题配置文件中引入：

```yaml
inject:
  head:
  - <link rel="stylesheet" href="/css/iconfont.css">
  - ...
  bottom:
  - ...
```

# JS部分

最后编写js代码即可。

创建 `[blogRoot]/themes/butterfly/source/js/rightmenu.js`

然后编写以下内容：

```javascript


console.log(
    "Codes uses GPL Licence"
)

function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
rmf.copyWordsLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    Swal.fire("复制成功！");
}
rmf.switchReadMode = function () {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
rmf.scrollToTop = function () {
    btf.scrollToDest(0, 500);
}
rmf.translate = function () {
    document.getElementById("translateLink").click();
}

// 右键菜单事件
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 17) {
        console.log("你知道的太多了");
        return;
    }
}

function popupMenu() {
    //window.oncontextmenu=function(){return false;}
    window.oncontextmenu = function (event) {
        if(event.ctrlKey)return true;
        console.log(event.keyCode)
        $('.rightMenu-group.hide').hide();
        //如果有文字选中，则显示 文字选中相关的菜单项
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post')) {
            $('#menu-post').show();
        } else {
            if (document.getElementById('page')) {
                $('#menu-post').show();
            }
        }
        var el = window.document.body;
        el = event.target;
        var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        if (a.test(window.getSelection().toString())){
            $('#menu-too').show()
        }
        if (el.tagName == 'A') {
            $('#menu-to').show()
            rmf.open = function () {
                location.href = el.href
            }
            rmf.openWithNewTab = function () {
                window.open(el.href);
            }
            rmf.copyLink = function () {
                let url = el.href
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        }
        if (el.tagName == 'IMG') {
            $('#menu-img').show()
            rmf.openWithNewTab = function () {
                window.open(el.src);
            }
            rmf.click = function () {
                el.click()
            }
            rmf.copyLink = function () {
                let url = el.src
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            //读取剪贴板
                            navigator.clipboard.readText().then(text => {
                                console.log(text)
                                insertAtCursor(el, text)
                            })
                        } else {
                            alert('请允许读取剪贴板！')
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
    let timer = 0 // 初始化timer

    target.ontouchstart = () => {
        timer = 0 // 重置timer
        timer = setTimeout(() => {
            callback();
            timer = 0
        }, 380) // 超时器能成功执行，说明是长按
    }

    target.ontouchmove = () => {
        clearTimeout(timer) // 如果来到这里，说明是滑动
        timer = 0
    }

    target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
        if (timer) {
            clearTimeout(timer)
        }
    }
}

addLongtabListener(box, popupMenu)
```

因为这个js依赖于jquery，所以还需要引入jquery，在主题配置文件中引入：

```yaml
inject:
  head:
  - ...
  bottom:
  - ...
  - <script type="text/javascript" src="https://cdn1.tianli0.top/npm/jquery@latest/dist/jquery.min.js"></script>
  - <script type="text/javascript" src="/js/rightmenu.js"></script>
  - ...
```

然后你就拥有了一个好看且功能丰富的右键菜单了！
