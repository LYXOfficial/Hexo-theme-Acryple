---
title: 博客魔改日记（1）
abbrlink: ac792cf4
date: 2022-10-05 17:35:57
tags:
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
cover: "https://bu.dusays.com/2022/10/15/6349fcbca8713.png"
updated: 2022-10-14 20:56:55
---

在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

# 前言

因为开学了嘛，学习任务比较重，所以以后的魔改都写成日记，大家自己根据实际情况修改，不做可用性保证。

( ´･･)ﾉ(._.`)

最近大家都看到我博客变了好多，我就把东西分享出来

# 彩色友链

相信大家都看到了，我的友链界面是彩色的，实现也不难

![1664962851812.png](https://bu.dusays.com/2022/10/05/633d5123aa3a2.png)

## 把友链改成外挂标签形式

只需要复制原来的友链yml，然后删除，新建一个与之前同名的page，然后编辑：
```yaml
{% flink %}
# 这里粘贴友链yml
{% endflink %}
```

重新渲染即可生效。

## 修改外挂标签js

修改`[blogRoot]\themes\butterfly\scripts\tag\flink.js`:

```js
/**
 * flink
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const flinkFn = (args, content) => {
  content = hexo.render.renderSync({ text: content, engine: 'yaml' })

  let result = ''

  content.forEach(i => {
    const className = i.class_name ? `<div class="flink-name">${i.class_name}</div>` : ''
    const classDesc = i.class_desc ? `<div class="flink-desc">${i.class_desc}</div>` : ''

    let listResult = ''

    i.link_list.forEach(j => {
      if(j.theme_color==undefined){
        j.theme_color="#383838"
      }
      listResult += `
          <div class="flink-list-item" style="background-color:${j.theme_color}">
            <a href="${j.link}" title="${j.name}" target="_blank">
              <div class="flink-item-icon">
                <img class="no-lightbox" src="${j.avatar}" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${j.name}" />
              </div>
              <div class="flink-item-name">${j.name}</div> 
              <div class="flink-item-desc" title="${j.descr}">${j.descr}</div>
            </a>
          </div>`
    })

    result += `${className}${classDesc} <div class="flink-list">${listResult}</div>`
  })

  return `<div class="flink">${result}</div>`
}

hexo.extend.tag.register('flink', flinkFn, { ends: true })

```

## 修改css

添加一些css，让友链变得更好看：

```css
#article-container .flink .flink-list {
    text-align: left!important;
}
.flink-item-name, .flink-item-desc {
    color: white!important;
}
```

然后你还需要在友链yml后面添加theme_color（一定要用引号包起来不然报错），重新渲染就完成了。

# 鼠标指针

有人问我鼠标指针怎么做的，其实是参考网上的教程做的，原文见：

![v2-4006ee14f6461efd1819082187b0113c_b.gif](https://bu.dusays.com/2022/10/14/63495e763f1d9.gif)

{% link 用原生JS写一款乖巧的鼠标指针特效,知乎,https://zhuanlan.zhihu.com/p/351951477 %}

这篇文章对于鼠标指针进行了详细的讲解（看不懂qwq），所以我就精简一下发出来吧：

## 正式教程

新建js文件，编写：

```javascript
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle
            ? window.getComputedStyle(el)[attr]
            : el.currentStyle[attr];
    } catch (e) {}
    return "";
};

class Cursor {
    constructor() {
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName('*');
        for (let i = 0; i < el.length; i++)
            if (getStyle(el[i], "cursor") == "pointer")
                this.pt.push(el[i].outerHTML);

        document.body.appendChild((this.scr = document.createElement("style")));
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr.remove();
        this.cursor.classList.remove("hover");
        this.cursor.classList.remove("active");
        this.pos = {curr: null, prev: null};
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
        document.onmouseenter = e => this.cursor.classList.remove("hidden");
        document.onmouseleave = e => this.cursor.classList.add("hidden");
        document.onmousedown  = e => this.cursor.classList.add("active");
        document.onmouseup    = e => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();
```

然后新建css：

```css
#cursor {
    position: fixed;
    width: 16px;
    height: 16px;
    background: #000;
    border-radius: 8px;
    opacity: 0.25;
    z-index: 10086;
    pointer-events: none;
    transition: 0.2s ease-in-out;
    transition-property: background, opacity, transform;
}

#cursor.hidden {
    opacity: 0;
}

#cursor.hover {
    opacity: 0.1;
    transform: scale(2.5);
}

#cursor.active {
    opacity: 0.5;
    transform: scale(0.5);
}
```

建议去支持一下原作者哦~

# 博客设置

![1665754393707.png](https://bu.dusays.com/2022/10/14/6349651c5e5a5.png)

![1665754392693.png](https://bu.dusays.com/2022/10/14/6349651b99895.png)

这是个大东西，基于Leonus的版本制作。很多朋友们都在问，是时候把终极屎山发出来了。

{% link 切换博客背景2.0版本——弹窗切换,Leonus,https://blog.leonus.cn/2022/bg2.html %}

这个设置支持保存字体、主题、主题色、侧边栏隐藏、模糊效果修改等等功能，不过图片设置真的卡qwq。

自定义纯色还没写好，有空写好了把这个改改。

## 修改指导

主题色功能实现非常奇葩：大概就是定义几个标准色比如`lyx-blue`,`lyx-pink`，然后本地存储里面存的是blue,pink啥的，然后用字符串链接拼成`:root{--lyx-theme:var(--lyx-pink)}`，至于主题色就一个一个替换呗。

<span>
然后字体设置需要你定义好font-face，然后修改js的列表内容(不多说自己动手丰衣足食[doge])
<span>

至于主题切换嘛，我有一个acrylic和simple主题，acrylic主题是`styles.css`，simple主题是`stylesimple.css`，应用simple主题是在acrylic的基础上面加的css，自己根据情况修改吧。

## 代码

然后就可以放出代码了：

js部分：

```js
if(localStorage.getItem("blur")=="false"){
    var blur=0;
    }else{
        var blur=1;
    
    }
    if(localStorage.getItem("yjjs")=="true"){
        var yjjs=1;
    }else{
        var yjjs=0;
        
    }

if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
function setBlur(){
    blur=!blur;
    localStorage.setItem("blur",blur);
    if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
}
// if(yjjs){
//     document.getElementById("yjjs").innerText=`
//     *:not(#web_bg){
//         transform:translateZ(0);
//         backface-visibility: hidden
//     }`}
//     else{
//         document.getElementById("yjjs").innerText=``
//     }
function yjjs1(){
    yjjs=!yjjs;
    localStorage.setItem("yjjs",yjjs)
    // if(yjjs){
    // document.getElementById("yjjs").innerText=`
    // *:not(#web_bg){
    //     transform:translateZ(0);
    //     backface-visibility: hidden
    // }`}
    // else{
    //     document.getElementById("yjjs").innerText=``
    // }
}
if(localStorage.getItem("theme")=="acrylic"){
    document.getElementById("css").href=""
}
switchTheme=function(){
    if(document.getElementById("css").href==window.location.protocol+"//"+window.location.host+"/css/stylessimple.css"){
        document.getElementById("css").href=""
        localStorage.setItem("theme","acrylic");
    }else{
        document.getElementById("css").href="/css/stylessimple.css"
        localStorage.setItem("theme","simple");
    }
}
setColor=function(c){
    document.getElementById("themeColor").innerText=`:root{--lyx-theme:var(--lyx-${c})!important}`;
    localStorage.setItem("themeColor",c);

}

if(localStorage.getItem("themeColor")==undefined){
    localStorage.setItem("themeColor","pink");
}

setColor(localStorage.getItem("themeColor"));



if(localStorage.getItem("hideRightside")==undefined){
    localStorage.setItem("hideRightside","0");
}

if(localStorage.getItem("hideRightside")=="1"){
    $("#rightside").toggle()
}
function toggleRightside(){
    $("#rightside").toggle();
    localStorage.setItem("hideRightside",Math.abs(Number(localStorage.getItem("hideRightside"))-1))
}












if(localStorage.getItem("font")==undefined){
    localStorage.setItem("font","HYTMR")
}
setFont(localStorage.getItem("font"))
// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}
function setFont(n){
    localStorage.setItem("font",n)
    if(n=="main"){
        document.body.style.fontFamily="-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
    }
    else{
        document.body.style.fontFamily="var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
        document.documentElement.style.setProperty('--global-font', n)
    }
}
// 以下为2.0新增内容

// 创建窗口
var winbox = ''

var isMax=false;
function createWinbox() {
    
    div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "博客设置",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => {
            isMax=true;
            div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>`
        },
        onrestore: () => {
            isMax=false;
            div.innerHTML = ''
        },
    });
    document.getElementsByClassName("wb-close")[0].onclick=function(){
        sessionStorage.setItem("settingWindow","close");
    }
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div class="settings" style="display: block;"><a class="reSettings content-button">恢复默认设置</a>
    <p></p>
    <h2 class="content-head">性能设置</h2>
    <p></p>
    <div class="content" style="display:flex"><input type="checkbox" id="blur" onclick="setBlur()">
        <div class="content-text">禁用模糊效果</div>
    </div>
    <div class="content" style="display:flex"><input type="checkbox" id="yjjs" onclick="yjjs1()"
            value="onrightMenurightMenu">
        <div class="content-text">硬件加速</div>
    </div>
    <p></p>
    <h2 class="content-head">主题设置</h2>
    <p></p>
    <div class="content" style="display:flex">
        <button class="content-button" onclick="switchTheme()">切换主题</button><br><input type="checkbox" id="hideAside" onclick="toggleRightside()">
        <div class="content-text">隐藏侧边栏</div>
    </div>
    <h3 class="content-head">&nbsp;&nbsp;主题色</h3>
    <p></p>
    <div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
            onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
            onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
            onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
            onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
            onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
            onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
            onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
            onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
            onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
            onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
            onclick="setColor('blackgray')"></div>
    <p></p>
    <p></p>
    <p></p>
    <h2 class="content-head">字体设置</h2>
    <p id="swfs">
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a><br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZXJLJ'!important;color:black" onclick="setFont('FZXJLJ')">方正金陵体</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZXS'!important;color:black" onclick="setFont('FZXS')">方正像素体</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:'FZODZK'!important;color:black" onclick="setFont('FZODZK')">方正欧蝶正楷</a> <br>
    <a class="swf" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('main')">系统默认</a> <br>
    </p>
</div>
    <h2 style="margin-left:10px">背景设置</h2>
    <div>
    </br>&nbsp&nbsp注意:切换背景功能仅在Acrylic主题中生效，在Simple主题中无效
    <button onclick="localStorage.removeItem('blogbg');location.reload();" class="content-button"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button>
    </div>
    <div id="article-container" style="padding:20px;">
    <h3 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)')"></a>   
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)')"></a>   

    </div>
    <h3 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5159b31.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5159b31.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f2032c8.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f2032c8.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2021/12/01/7792ff0082ec4.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2021/12/01/7792ff0082ec4.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)')"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324aea549be6.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324aea549be6.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324aec701a68.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324aec701a68.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324aef4a5543.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324aef4a5543.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/09/17/6324af3622884.webp)')"><img src="https://bu.dusays.com/2022/09/17/6324af3622884.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/5.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/5.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/6.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/6.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/7.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/7.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/8.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/8.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/9.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/9.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/10.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/10.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/11.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/11.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/12.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/12.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/13.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/13.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/14.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/14.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/15.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/15.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/16.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/16.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/17.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/17.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/18.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/18.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/19.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/19.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/20.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/20.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/21.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/21.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/22.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/22.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/23.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/23.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/24.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/24.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/25.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/25.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/26.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/26.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/27.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/27.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/28.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/28.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/29.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/29.webp"></a>
    <a href="javascript:;" class="imgbox" onclick="changeBg('url(https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/30.webp)')"><img src="https://cdn.afdelivr.top/npm/saiodgm-api@1.0.1/randomimg-my/30.webp"></a>
    </div>
    <h3 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)" onclick="changeBg('linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)" onclick="changeBg('linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)')"></a>

    </div>
    
    <h3 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h3>
    <div class="bgbox">
    <input type="color" id="colors" autocomplete="on" value="#FF0000"></input>
    </div>

`;
$("#"+localStorage.getItem("themeColor")).attr("checked", true);
if(localStorage.getItem("blur")=="false"){
    document.getElementById("blur").checked=true;
}
if(localStorage.getItem("yjjs")=="true"){
    document.getElementById("yjjs").checked=true;
}
if(localStorage.getItem("hideRightside")=="1"){
    document.getElementById("hideAside").checked=true;
}
document.getElementsByClassName("reSettings")[0].onclick=function(){
    localStorage.clear()
    window.location.reload()
}
}

function winResize() {
    if(!isMax){
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }}
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) {winbox.toggleClass('hide');sessionStorage.setItem("settingWindow","close");}
    else {createWinbox();sessionStorage.setItem("settingWindow","open");}
}
if(sessionStorage.getItem("settingWindow")=="open"){
    createWinbox();
    
}
```

辅助js/css容器：

```yaml
inject:
  head:
  - <style id="settingStyle"></style>
  - <style id="yjjs"></style>
  - <style id="themeColor"></style>
  ...
  bottom:
  - <script src="https://cdn1.tianli0.top/gh/nextapps-de/winbox/dist/winbox.bundle.min.js"></script>
  ...
```

css：

```css
.winbox {
    border-radius: 12px;
    overflow: hidden;
}

.wb-full {
    display: none;
}

.wb-min {
    background-position: center;
}


.bgbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pimgbox,
.imgbox,
.box {
    width: 166px;
    margin: 10px;
    background-size: cover
}

.pimgbox,
.imgbox {
    border-radius: 10px;
    overflow: hidden;
}

.pimgbox {
    height: 240px;
}

.imgbox {
    height: 95px;
}

.box {
    height: 100px;
}

@media screen and (max-width: 768px) {
    /* 背景 */
    .pimgbox,
    .imgbox,
    .box {
        height: 73px;
        width: 135px;
    }
    .pimgbox {
        height: 205px;
    }
    .wb-min {
        display: none;
    }
    #changeBgBox .wb-body::-webkit-scrollbar {
        display: none;
    }
}
.bgbox *{
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
}
.reSettings{
    color:var(--lyx-white)!important
}
.reSettings::before{
    content:"\f021";
    font-family:var(--fa-style-family,"Font Awesome 6 Free");font-weight:var(--fa-style,900);
    color:var(--lyx-white)!important
}
.reSettings:hover{
    cursor: pointer;
}
.wb-title{
    color:black;
    font-family: var(--global-font),'PingFang SC','Ubuntu Mono','Noto Sans','Microsoft Yahei','SimSun'!important;
}
[data-theme="dark"] .wb-title{
    color:white;
}
#changeBgBox{
        
        border-radius: 12px;
        backdrop-filter: blur(20px);
        
}
[data-theme="light"] #changeBgBox{
    background: #fffa!important;
}
[data-theme="dark"] #changeBgBox{
    background: #0008!important;
}
[data-theme="light"] .wb-close{
    background-image: url("data:image/svg+xml;base64,PHN2ZyB0PSIxNjYxODMyNDg4NDQ2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI2MzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNTU2LjggNTEyTDgzMiAyMzYuOGMxMi44LTEyLjggMTIuOC0zMiAwLTQ0LjgtMTIuOC0xMi44LTMyLTEyLjgtNDQuOCAwTDUxMiA0NjcuMmwtMjc1LjItMjc3LjMzMzMzM2MtMTIuOC0xMi44LTMyLTEyLjgtNDQuOCAwLTEyLjggMTIuOC0xMi44IDMyIDAgNDQuOGwyNzUuMiAyNzcuMzMzMzMzLTI3Ny4zMzMzMzMgMjc1LjJjLTEyLjggMTIuOC0xMi44IDMyIDAgNDQuOCA2LjQgNi40IDE0LjkzMzMzMyA4LjUzMzMzMyAyMy40NjY2NjYgOC41MzMzMzNzMTcuMDY2NjY3LTIuMTMzMzMzIDIzLjQ2NjY2Ny04LjUzMzMzM0w1MTIgNTU2LjggNzg3LjIgODMyYzYuNCA2LjQgMTQuOTMzMzMzIDguNTMzMzMzIDIzLjQ2NjY2NyA4LjUzMzMzM3MxNy4wNjY2NjctMi4xMzMzMzMgMjMuNDY2NjY2LTguNTMzMzMzYzEyLjgtMTIuOCAxMi44LTMyIDAtNDQuOEw1NTYuOCA1MTJ6IiBwLWlkPSIyNjMxIj48L3BhdGg+PC9zdmc+");}
[data-theme="light"] .wb-max{
    background-image: url("data:image/svg+xml;base64,PHN2ZyB0PSIxNjYxODMyNjU2MTQ0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5MjMiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNNzk0LjQzMiA5ODMuNTUySDUxLjJhMjUuNiAyNS42IDAgMCAxLTI1LjYtMjUuNlYyMTQuNzg0YTI1LjYgMjUuNiAwIDAgMSAyNS42LTI1LjZoMTUyLjc2OFY2Ni4xMTJhMjUuNiAyNS42IDAgMCAxIDI1LjYtMjUuNkg5NzIuOGEyNS42IDI1LjYgMCAwIDEgMjUuNiAyNS42djc0My4yMzJhMjUuNiAyNS42IDAgMCAxLTI1LjYgMjUuNmgtMTUyLjc2OHYxMjMuMDA4YTI1LjYgMjUuNiAwIDAgMS0yNS42IDI1LjZ6IG0tNzE3LjYzMi01MS4yaDY5Mi4wMzJWMjQwLjM4NEg3Ni44djY5MS45Njh6IG03NDMuMjMyLTE0OC42NzJIOTQ3LjJWOTEuNjQ4SDI1NS4xNjh2OTcuNDcyaDUzOS4yNjRhMjUuNiAyNS42IDAgMCAxIDI1LjYgMjUuNnY1NjguOTZ6IiBwLWlkPSIyOTI0Ij48L3BhdGg+PC9zdmc+");
}
[data-theme="light"] .wb-min{
    background-image: url("data:image/svg+xml;base64,PHN2ZyB0PSIxNjYxODMyNzE4OTgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM4MzQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMTkyLjEyOCA3NjhsNjM5LjY4IDBDODY3LjI2NCA3NjggODk2IDc5Ni40MTYgODk2IDgzMmMwIDM1LjM5Mi0yOS4xODQgNjQtNjQuMTkyIDY0TDE5Mi4xMjggODk2QzE1Ni43MzYgODk2IDEyOCA4NjcuNTg0IDEyOCA4MzIgMTI4IDc5Ni42MDggMTU3LjE4NCA3NjggMTkyLjEyOCA3Njh6IiBwLWlkPSIzODM1Ij48L3BhdGg+PC9zdmc+");
}
[data-theme="light"] .wb-body{
    background:#fffa!important;
}
[data-theme="dark"] .wb-body{
    background:#0008!important;
}
.winbox.focus.max {
    border-radius: 0!important;
    -webkit-border-radius: 0!important;
    -moz-border-radius: 0!important;
    -ms-border-radius: 0!important;
    -o-border-radius: 0!important;
}
.settings{
    margin:15px
}
.settings .content{
    margin-left:20px;
}
.content-text{
    margin-left:5px
}
.content-button {
    background-color: var(--lyx-theme);
    padding: 5px;
    color: white;
    border-radius: 4px;
}
.content-button{
    margin-right: 10px;
}
/* 开关 */
.settings input[type="checkbox"] {
    width: 38px;
    height: 20px;
    position: relative;
    border: 1px solid #000000;
    background-color: #fdfdfd;;
    border-radius: 12px;
    background-clip: content-box;
    display: inline-block;
    -webkit-appearance: none;
    user-select: none;
    outline: none;
transform: translateY(5px);}
.settings input[type="checkbox"]:before {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    top: 3px;
    left: 5px;
    border-radius: 10px;
    background-color: #000;}
.settings input[type="checkbox"]:checked {
    background-color: var(--lyx-theme);border-color:var(--lyx-theme)}
.settings input[type="checkbox"]:checked:before {
    left: 19px;background-color: white!important;}
.settings input[type="checkbox"] {
    transition: border background-color box-shadow }
.settings input[type="checkbox"]:before {
    transition: left 0.2s;}
.settings input[type="checkbox"]:checked {
    background-color: var(--lyx-theme);
    /* transition: border ease 0.4s, background-color ease 1.2s; */
}.settings input[type="checkbox"]:checked:before {
    transition: left 0.2s;}
.settings input[type="checkbox"]:checked:hover{
    opacity: 0.8;
}
.settings input[type="checkbox"]:active{
    background-color: #666666!important;
    border-color:#666666!important;
}
.settings input[type="checkbox"]:active::before{
    background-color:white!important;
}
.wb-e{
    right:5px!important
}
#colors::before {
    position: absolute;
    color: rgb(255, 255, 255);
    left: 38px;
    top: 44px;
    content: "自定义颜色";
}
#colors {
    border: none;
    background: 0 0;
    width: 166px;
    height: 110px;
    margin: 5px 10px;
    position: relative;
    cursor: pointer;
    padding:0;
    border-radius:12px
}
input[name="colors"]{
    margin-right: 15px;
    min-width: 1rem;
    height: 1rem;
    appearance: none;
    -webkit-appearance: none;
    border-radius: 50%;
}
#red{
    border: 3px solid var(--lyx-red);
}
#orange{
    border: 3px solid var(--lyx-orange);
}
#yellow{
    border: 3px solid var(--lyx-yellow);
}
#green{
    border: 3px solid var(--lyx-green);
}
#blue{
    border: 3px solid var(--lyx-blue);
}
#purple{
    border: 3px solid var(--lyx-purple);
}
#pink{
    border: 3px solid var(--lyx-pink);
}
#heoblue{
    border: 3px solid var(--lyx-heoblue);
}
#darkblue{
    border: 3px solid var(--lyx-darkblue);
}
#black  {
    border: 3px solid var(--lyx-black);
}
#blackgray  {
    border: 3px solid var(--lyx-blackgray);
}
#purple:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-purple);
    background-color: var(--lyx-purple);
}
#red:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-red);
    background-color: var(--lyx-red);
}
#orange:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-orange);
    background-color: var(--lyx-orange);
}
#yellow:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-yellow);
    background-color: var(--lyx-yellow);
}
#green:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-green);
    background-color: var(--lyx-green);
}
#blue:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-blue);
    background-color: var(--lyx-blue);
}
#pink:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-pink);
    background-color: var(--lyx-pink);
}
#heoblue:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-heoblue);
    background-color: var(--lyx-heoblue);
}
#darkblue:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-darkblue);
    background-color: var(--lyx-darkblue);
}
#black:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-black);
    background-color: var(--lyx-black);
}
#blackgray:checked{
    box-shadow: 0 0 0 2px #fff inset;
    border-radius: 50%;
    border: 3px solid var(--lyx-blackgray);
    background-color: var(--lyx-blackgray);
}

```

# 彩虹猫加载页

大家会发现我的博客加载界面是Nyancat的动画，其实是基于bf的原版加载动画改的。

首先你得在主题配置文件启动加载动画，默认是一个方盒子。

我的加载动画基于gif构建，并且把结束动画改成渐变而不是拉开，gif实际上是可以自定义的。

## 修改文件

修改`[blogRoot]\themes\butterfly\source\css\_layout\loading.styl`:
```diff
if hexo-config('preloader')
  ...
  #loading-box
    .loading-left-bg
      @extend .loading-bg

    ...
      .configure-core
        width: 100%
        height: 100%
        background-color: var(--preloader-bg)

    &.loaded
      .loading-left-bg
        transition: all .7s
+        opacity 0
-        transform: translate(-100%, 0)

      .loading-right-bg
        transition: all .7s
+        opacity 0
-        transform: translate(100%, 0)

      .spinner-box
        display: none
        ...
```

重写`[blogRoot]\themes\butterfly\layout\includes\loading\loading-js.pug`:

```js

script.
  var preloader = {
    endLoading: () => {
      document.body.style.overflow = 'auto';
      document.getElementById('loading-box').classList.add("loaded")
      setTimeout(function(){document.getElementById('loading-box').classList.add("loadend")},700)
    },
    initLoading: () => {
      document.body.style.overflow = '';
      document.getElementById('loading-box').classList.remove("loaded")

    }
  }
  window.addEventListener('load',preloader.endLoading())
```

然后重写`[blogRoot]\themes\butterfly\layout\includes\loading\loading.pug`:

```python
#loading-box
  .loading-left-bg
  .loading-right-bg
  img(src="/img/nyancat.gif" id="loadcat") //- 可以修改gif达到想要的效果，最好用外链加快速度
```

# 后记

这次大抵即是这些罢了，其实看起来这么多日子了也就改了这些而已，顶多就还小改小修bug和css了，以后或许会很少更新了。