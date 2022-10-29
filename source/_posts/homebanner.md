---
title: Hexo butterfly首页随便逛逛banner教程
abbrlink: bd7ef112
date: 2022-08-25 13:52:35
tags: 
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
cover: https://bu.dusays.com/2022/09/01/63103a65e883d.webp
updated: 2022-10-04 08:50:19
---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

{% note warning simple %}
本期教程需要脑子和一定的pug编写能力，小白请谨慎食用！可以在评论区提问，我会想办法帮你解决。
{% endnote %}

不出意外，这又是一篇水文。这段时间不怎么更新就是因为要开学了要赶作业，而且也在折腾其它的不少东西。相信你们也看到了博客的大变，具体见[更新日志](/updates)。

看到留言板有一位童鞋也问了有关banner的问题，我就简单的介绍一下吧。

![1661407579436](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/homebanner/1661407579436.png)

效果如下：
![1661410083019](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/homebanner/1661410083019.png)
![1661410091186](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/homebanner/1661410091186.png)

首先你需要找到一个合适的放banner的位置，因为每个人写的首页顶部内容都不太一样，所以我无能为力。

好，现在你有了一个banner的容器，这时，你需要在banner的容器里面引入banner的pug，会单独写一个pug用来放容器。

因为banner用于悬停随机导航，所以我的命名很多以 `randomxxx`命名

在要放置banner的容器里面添加(前面有一格缩进)
```js
    include random.pug
```
然后把`random.pug`放在同级位置（一般是`layout/include`），编写:
```python
div(id="random")
    iframe(id="random-banner" src="/people.html" frameborder="no")  #可以换成自己的图片
    a(id="random-hover" style="width:100%;height:auto;" href="javascript:toRandomPost()")         #默认用random.js，也可以换成random.html
        span &nbsp
        i.fa.fa-paper-plane
        div &nbsp随便逛逛→
```
{% note info simple %}
我自己写的banner效果没有洪哥的好，如果想要那种效果可以自己尝试微调
{% endnote %}

至于pug内容需要微调，iframe里面的html默认是我使用的人潮汹涌模拟器，如果你需要自己编写也可以，改一改路径即可。随机页面跳转使用洪哥的随机跳转js：

{% link Hexo的Butterfly魔改：随机网页跳转（无缝版）,张洪Heo,https://blog.zhheo.com/p/c116857c.html %}

然后你需要一个banner的iframe嵌套html，我使用洪哥原版并且进行了一些修改，在`[blogRoot]/themes/butterfly/source`新建一个文件`people.html`，编写：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>人潮汹涌 Crowd Simulator</title>
    <link rel="stylesheet" href="/css/people.css">
</head>

<body><canvas id="canvas"></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
    <script src="/js/people.js"></script>
</body>

</html>
```
你还需要加入几个css和js，务必不要直接使用~~白嫖~~洪哥的cdn~~（tianli的不香吗）~~造成损失。

`[blogRoot]/themes/butterfly/source/css/people.css`

```css
body,
html {
    height: 100%;
    background-color: #fff
}

body {
    margin: 0
}

#canvas {
    width: 100%;
    height: 100%
}

body::-webkit-scrollbar {
    display: none
}
```
`[blogRoot]/themes/butterfly/source/js/people.js`
```js
"use strict";

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _unsupportedIterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(e, r) {
    if (e) {
        if ("string" == typeof e) return _arrayLikeToArray(e, r);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(e, r) : void 0
    }
}

function _iterableToArray(e) {
    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) return _arrayLikeToArray(e)
}

function _arrayLikeToArray(e, r) {
    (null == r || r > e.length) && (r = e.length);
    for (var t = 0, a = new Array(r); t < r; t++) a[t] = e[t];
    return a
}

function _classCallCheck(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
        var a = r[t];
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
    }
}

function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), e
}
var config = {
        src: "https://f.zhheo.com/Guli/others/open-peeps-sheet.png",
        rows: 15,
        cols: 7
    },
    randomRange = function (e, r) {
        return e + Math.random() * (r - e)
    },
    randomIndex = function (e) {
        return 0 | randomRange(0, e.length)
    },
    removeFromArray = function (e, r) {
        return e.splice(r, 1)[0]
    },
    removeItemFromArray = function (e, r) {
        return removeFromArray(e, e.indexOf(r))
    },
    removeRandomFromArray = function (e) {
        return removeFromArray(e, randomIndex(e))
    },
    getRandomFromArray = function (e) {
        return e[0 | randomIndex(e)]
    },
    resetPeep = function (e) {
        var r, t, a = e.stage,
            n = e.peep,
            o = .5 < Math.random() ? 1 : -1,
            i = 100 - 250 * gsap.parseEase("power2.in")(Math.random()),
            s = a.height - n.height + i;
        return 1 == o ? (r = -n.width, t = a.width, n.scaleX = 1) : (r = a.width + n.width, t = 0, n.scaleX = -1), n.x = r, n.y = s, {
            startX: r,
            startY: n.anchorY = s,
            endX: t
        }
    },
    normalWalk = function (e) {
        var r = e.peep,
            t = e.props,
            a = (t.startX, t.startY),
            n = t.endX,
            o = gsap.timeline();
        return o.timeScale(randomRange(.5, 1.5)), o.to(r, {
            duration: 10,
            x: n,
            ease: "none"
        }, 0), o.to(r, {
            duration: .25,
            repeat: 40,
            yoyo: !0,
            y: a - 10
        }, 0), o
    },
    walks = [normalWalk],
    Peep = function () {
        function a(e) {
            var r = e.image,
                t = e.rect;
            _classCallCheck(this, a), this.image = r, this.setRect(t), this.x = 0, this.y = 0, this.anchorY = 0, this.scaleX = 1, this.walk = null
        }
        return _createClass(a, [{
            key: "setRect",
            value: function (e) {
                this.rect = e, this.width = e[2], this.height = e[3], this.drawArgs = [this.image].concat(_toConsumableArray(e), [0, 0, this.width, this.height])
            }
        }, {
            key: "render",
            value: function (e) {
                e.save(), e.translate(this.x, this.y), e.scale(this.scaleX, 1), e.draw/Image.apply(e, _toConsumableArray(this.drawArgs)), e.restore()
            }
        }]), a
    }(),
    img = document.createElement("img");
img.onload = init, img.src = config.src;
var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    stage = {
        width: 0,
        height: 0
    },
    allPeeps = [],
    availablePeeps = [],
    crowd = [];

function init() {
    createPeeps(), resize(), gsap.ticker.add(render), window.addEventListener("resize", resize)
}

function createPeeps() {
    for (var e = config.rows, r = config.cols, t = e * r, a = img.naturalWidth / e, n = img.naturalHeight / r, o = 0; o < t; o++) allPeeps.push(new Peep({
        /image: img,
        rect: [o % e * a, (o / e | 0) * n, a, n]
    }))
}

function resize() {
    stage.width = canvas.clientWidth, stage.height = canvas.clientHeight, canvas.width = stage.width * devicePixelRatio, canvas.height = stage.height * devicePixelRatio, crowd.forEach(function (e) {
        e.walk.kill()
    }), crowd.length = 0, availablePeeps.length = 0, availablePeeps.push.apply(availablePeeps, allPeeps), initCrowd()
}

function initCrowd() {
    for (; availablePeeps.length;) addPeepToCrowd().walk.progress(Math.random())
}

function addPeepToCrowd() {
    var e = removeRandomFromArray(availablePeeps),
        r = getRandomFromArray(walks)({
            peep: e,
            props: resetPeep({
                peep: e,
                stage: stage
            })
        }).eventCallback("onComplete", function () {
            removePeepFromCrowd(e), addPeepToCrowd()
        });
    return e.walk = r, crowd.push(e), crowd.sort(function (e, r) {
        return e.anchorY - r.anchorY
    }), e
}

function removePeepFromCrowd(e) {
    removeItemFromArray(crowd, e), availablePeeps.push(e)
}

function render() {
    canvas.width = canvas.width, ctx.save(), ctx.scale(devicePixelRatio, devicePixelRatio), crowd.forEach(function (e) {
        e.render(ctx)
    }), ctx.restore()
}
```
这时进入网页，你就能看到杂乱而生效的banner了。

![1661409423673](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/homebanner/1661409423673.png)

然而这个banner只能看。

所以我们要添加一些css让它生效
```css
#random{
    width:40%!important;
    background-color: var(--lyx-white-acrylic1)!important;
    border-radius: 8px;
    margin-right: 10px !important;
    font-family: PingFang,微软雅黑,HYTMR,SimSun;
    background-size:cover;
    color:var(--lyx-white);
    font-size:44px; /*觉得小可以开大一点*/
    position: relative;
}
#random-banner{
    width:100%!important;
    height:100%!important;
    border-radius:8px;
}
#random-hover{
    position:absolute;
    right:0%;
    height:100%!important;
    color:var(--lyx-0);
    border-radius: 8px;
}
#random-hover:hover{
   color:#ffffff;
   background-color: #425aefdd;
   backdrop-filter: blur(10px) saturate(180%);
   -webkit-backdrop-filter: blur(10px) saturate(180%);
}
```
这时banner就正常显示了

![1661409982168](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/homebanner/1661409982168.png)

如果需要尺寸较小时隐藏banner，以下css自取：
```css
@media screen and (max-width: 1050px){
    #random{
        display: none!important;
    }
}
```

现在你就拥有了一个不错的banner了！
