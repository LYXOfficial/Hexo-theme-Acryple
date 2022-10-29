---
title: Butterfly主题的留言弹幕界面增强版（支持Twikoo、Waline、Valine）
tags:
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
abbrlink: '69707535'
date: 2022-08-17 13:50:44
swiper_index: 10
description: 更好的留言弹幕mod
cover: https://bu.dusays.com/2022/08/22/6302df3623687.webp
updated: 2022-10-04 08:50:19
---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

最早这个留言弹幕是我直接找Dorakika抄的，见：

{% link 添加一个留言弹幕页面,Dorakika,https://blog.dorakika.cn/p/20220418.html %}

后来发现这个留言弹幕有一些问题：

1. 没有对昼夜两个模式作适配
2. 颜色比较花哨，自己不喜欢
3. 没有自动隐藏，会挡着真正的评论和一些按钮以及正文
4. 不支持Waline/Valine
5. 没有鼠标悬停暂停功能

![1660719129034](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/commentbarragepro/1660719129034.png)

所以这次我对这个弹幕进行了一些小的修改（其实是因为看到洪哥改的然后自己改了js），本来是适配waline的但是考虑到两个评论系统的数据结构基本相同所以都支持

![1660719146044](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/commentbarragepro/1660719146044.png)

![1660719159823](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/commentbarragepro/1660719159823.png)

![1660719175517](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/commentbarragepro/1660719175517.png)

ps：最近高产是因为这些东西都是以前的一下发出来而且受到糖果屋群友的鼓动导致

# 我做了什么？

1. 适配亮/暗两个模式
2. 在只显示一个弹幕的时候有更好的体验
3. 进入评论区自动隐藏弹幕，防止挡着视线
4. 小改了一下样式，效果更好
5. 添加了一个关闭键，快速关闭弹幕（借鉴于洪哥的弹幕）
6. 添加鼠标悬停暂停功能，给用户仔细看评论的时间

![1660719202245](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/commentbarragepro/1660719202245.png)

6. 适配了右键菜单关闭功能（见[上篇文章](https://yisous.xyz/posts/11eb4aac/)）
7. 添加默认头像选项
8. 亚克力效果
9. 适配Waline/Valine
10. 头像cdn自定义
11. 本地存储保存弹幕开关

下面放出教程

{% note info %}
本教程仅适用于Twikoo和Waline评论系统，其它系统请自行修改
{% endnote %}

# PUG部分

首先修改一些pug：

修改 `[blogRoot]/themes/butterfly/layout/includes/third-party/comments/index.pug`

```diff
 #post-comment
  .comment-head
  	...


  .comment-wrap
    each name in theme.comments.use
      div
        case name
          when 'Disqus'
            #disqus_thread
          ...


+  .comment-barrage
```

如果想要侧边栏控制显隐的话（当然有右键菜单的随便加不加），还要修改 `[blogRoot]/themes/butterfly/layout/includes/rightside.pug`：

```diff
....
      when 'hideAside'
        if aside.enable && aside.button && page.aside !== false
          button#hide-aside-btn(type="button" title=_p('rightside.aside'))
            i.fas.fa-arrows-alt-h
      when 'toc'
        if showToc
          button#mobile-toc-button.close(type="button" title=_p("rightside.toc"))
            i.fas.fa-list-ul
      when 'chat'
        if chat_btn
          button#chat_btn(type="button" title=_p("rightside.chat"))
            i.fas.fa-sms
      when 'comment'
        if commentsJsLoad
          a#to_comment(href="#post-comment" title=_p("rightside.scroll_to_comment"))
            i.fas.fa-comments
+          a#switch_commentBarrage(href="javascript:switchCommentBarrage();" title="开关弹幕")
+            i.iconfont.icon-danmu

 #rightside
....
```

# Token获取（仅Twikoo版本）

{% note info %}
2022.9.16更新：
根据[Strive](https://shiqi217.com)和其他童鞋的反馈，发现腾讯云开发部署方式无法使用之前的方式成功获取，于是写了一个腾讯云开发部署获取token的教程

![1663326067583.png](https://bu.dusays.com/2022/09/16/63245775bd781.png)
{% endnote %}

然后你需要获取一个Token。

{% tabs %}

<!-- tab Vercel部署方式获取 -->

在开发人员工具-应用程序-本地存储-你的网址-twikoo-access-token里面即可看到，然后复制下面的值，待会用到。

![1660720625973](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/commentbarragepro/1660720625973.png)

<!-- endtab -->

<!-- tab 腾讯云开发部署方式获取 -->

在f12网络界面找到几个以`web?env=cloudbase-baas-xxx`开头的请求：

![1663325711847.png](https://bu.dusays.com/2022/09/16/63245611d1e03.png)

然后一个一个看，如果请求方式是options的话，就不管，找到请求方式是post的几个请求中的其中一个：

![1663325806285.png](https://bu.dusays.com/2022/09/16/63245671af244.png)

![1663325804065.png](https://bu.dusays.com/2022/09/16/6324566e36cea.png)

然后在负载里面复制那一行accesstoken的右半边双引号包起来的部分，比如：

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wibG9naW5UeXBlXCI6XCJBTk9OWU1PVVNcIixcImVudk5hbWVcIjpcImNsb3VkYmFzZS1iYWFzLTRnZWd4NDAwZjdhZDc0OTFcIixcInV1aWRcIjpcImUyOWVkZDgwYzNhNzQzOTM5OGE1YmQ1NWZmMmJiZDA0XCJ9IiwiaWF0IjoxNjYzMzIzMTAwLCJleHAiOjE2NjMzMjY3MDB9.YR_NwdIzRZv6pNzEqQqK0ngz9dtDCRlSKmrZnNMwkcM;1145141919`

现在你就获取到它了。

<!-- endtab -->
{% endtabs %}
# JS部分

twikoo和waline的js不一样，所以请根据自己的情况修改

{% tabs  %}

<!-- tab Twikoo版本 -->

新建 `[blogRoot]/themes/butterfly/source/js/commentBarrage.js`，然后按照注释修改配置：

```javascript

const commentBarrageConfig = {
	//浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
	lightColors:[
		['var(--lyx-white-acrylic2)','var(--lyx-black)'],
	],
	darkColors:[
		['var(--lyx-black-acrylic2)','var(--lyx-white)'],
	],
	//同时最多显示弹幕数
	maxBarrage: 1,
	//弹幕显示间隔时间，单位ms
	barrageTime: 3000,
	//twikoo部署地址（Vercel、私有部署），腾讯云的为环境ID
	twikooUrl: "https://tkapi.yisous.xyz",
	//token获取见前文
	accessToken: "{YOUR_TOKEN}",
	pageUrl: window.location.pathname,
	barrageTimer: [],
	barrageList: [],
	barrageIndex: 0,
	// 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api，可以不改以免出错
	noAvatarType: "retro",
	dom: document.querySelector('.comment-barrage'),
	//是否默认显示留言弹幕
	displayBarrage: true,
	//头像cdn，默认cravatar
	avatarCDN: "cravatar.cn",
}

function isInViewPortOfOne (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
document.onscroll = function() {
	if(commentBarrageConfig.displayBarrage){
	if(isInViewPortOfOne(document.getElementById("post-comment"))){
		document.getElementsByClassName("comment-barrage")[0].setAttribute("style",`display:none;`)
	}
	else{
		document.getElementsByClassName("comment-barrage")[0].setAttribute("style","")
	}
}
  }
function initCommentBarrage(){
		var data = JSON.stringify({
		  "event": "COMMENT_GET",
		  "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
		  "url": commentBarrageConfig.pageUrl
		});
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
		  if(this.readyState === 4) {
			commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
			commentBarrageConfig.dom.innerHTML = '';
		  }
		});
		xhr.open("POST", commentBarrageConfig.twikooUrl);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(data);
		setInterval(()=>{
			if(commentBarrageConfig.barrageList.length){
				popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
				commentBarrageConfig.barrageIndex += 1;
				commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
			}
			if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
				removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
			}
		},commentBarrageConfig.barrageTime)

}
function commentLinkFilter(data){
	data.sort((a,b)=>{
		return a.created - b.created;
	})
	let newData = [];
	data.forEach(item=>{
		newData.push(...getCommentReplies(item));
	});
	return newData;
}
function getCommentReplies(item){
	if(item.replies){
		let replies = [item];
		item.replies.forEach(item=>{
			replies.push(...getCommentReplies(item));
		})
		return replies;
	}else{
		return [];
	}
}
function popCommentBarrage(data){
	let barrage = document.createElement('div');
	let width = commentBarrageConfig.dom.clientWidth;
	let height = commentBarrageConfig.dom.clientHeight;
	barrage.className = 'comment-barrage-item'
	let ran = Math.floor(Math.random()*commentBarrageConfig.lightColors.length)
	document.getElementById("barragesColor").innerHTML=`[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;

	barrage.innerHTML = `
		<div class="barrageHead">
			<img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
			<div class="barrageNick">${data.nick}</div>
			<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
	commentBarrageConfig.barrageTimer.push(barrage);
	commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage){
	barrage.className = 'comment-barrage-item out';

	if(commentBarrageConfig.maxBarrage!=1){
		setTimeout(()=>{
			commentBarrageConfig.dom.removeChild(barrage);
		},1000)
	}else{
		commentBarrageConfig.dom.removeChild(barrage);
	}
}
switchCommentBarrage = function () {
	localStorage.setItem("isBarrageToggle",Number(!Number(localStorage.getItem("isBarrageToggle"))))
	if(!isInViewPortOfOne(document.getElementById("post-comment"))){
	commentBarrageConfig.displayBarrage=!(commentBarrageConfig.displayBarrage);
    let commentBarrage = document.querySelector('.comment-barrage');
    if (commentBarrage) {
        $(commentBarrage).fadeToggle()
    }
}
}
$(".comment-barrage").hover(function(){
	clearInterval(timer);
},function () {
	timer=setInterval(()=>{
		if(commentBarrageConfig.barrageList.length){
			popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
			commentBarrageConfig.barrageIndex += 1;
			commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
		}
		if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
			removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
		}
	},commentBarrageConfig.barrageTime)
})
if(localStorage.getItem("isBarrageToggle")==undefined){
	localStorage.setItem("isBarrageToggle","0");
}else if(localStorage.getItem("isBarrageToggle")=="1"){
	localStorage.setItem("isBarrageToggle","0");
	switchCommentBarrage()
}
initCommentBarrage()
```

在主题配置文件中引入该文件和jquery以及一个css容器:

```yaml
inject:
  head:
  - <style id="barragesColor"></style>
  - ...
  bottom:
  - <script type="text/javascript" src="https://cdn1.tianli0.top/npm/jquery@latest/dist/jquery.min.js"></script>
  - <script type="text/javascript" src="/js/commentBarrage.js"></script>
```

<!-- endtab -->

<!-- tab Waline/Valine版本 -->

新建 `[blogRoot]/themes/butterfly/source/js/commentBarrage.js`，然后按照注释修改配置：

```javascript
const commentBarrageConfig = {
	//浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
	lightColors:[
		['var(--lyx-white-acrylic2)','var(--lyx-black)'],
	],
	darkColors:[
		['var(--lyx-black-acrylic2)','var(--lyx-white)'],
	],
	//同时最多显示弹幕数
	maxBarrage: 1,
	//弹幕显示间隔时间，单位ms
	barrageTime: 3000,
    // 你的Leancloud APPID
	lcAppId: "{YOUR_APPID}",
    // 你的Leancloud APPKEY
    lcAppKey: "{YOUR_APPKEY}",
    // 你的Leancloud 域名
    lcUrl:"https://your-url.leancloud.cn",
	pageUrl: window.location.pathname,
	barrageTimer: [],
	barrageList: [],
	barrageIndex: 0,
	// 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api，可以不改以免出错
	noAvatarType: "retro",
	dom: document.querySelector('.comment-barrage'),
	//是否默认显示留言弹幕
	displayBarrage: true,
	//头像cdn，默认cravatar
	avatarCDN: "cravatar.cn"
}
function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}


function isInViewPortOfOne (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
document.onscroll = function() {
	if(commentBarrageConfig.displayBarrage){
	if(isInViewPortOfOne(document.getElementById("post-comment"))){
		document.getElementsByClassName("comment-barrage")[0].setAttribute("style",`display:none;`)
	}
	else{
		document.getElementsByClassName("comment-barrage")[0].setAttribute("style","")
	}
}
  }
function initCommentBarrage(){
        const { Query, User } = AV;
        AV.init({
            appId: commentBarrageConfig.lcAppId,
            appKey: commentBarrageConfig.lcAppKey,
            serverURL: commentBarrageConfig.lcUrl
          });
        const query = new AV.Query('Comment');
        query.equalTo('url', GetUrlRelativePath());
        query.find().then((comments) => {
            console.log(comments)
            for(var i=0;i<comments.length;i++){
                comments[i]["attributes"]["mailMd5"]=md5(comments[i]["attributes"]["mail"])
                commentBarrageConfig.barrageList.push(comments[i]["attributes"]);
            }
        });
		setInterval(()=>{
			if(commentBarrageConfig.barrageList.length){
				popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
				commentBarrageConfig.barrageIndex += 1;
				commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
			}
			if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
				removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
			}
		},commentBarrageConfig.barrageTime)

}
function commentLinkFilter(data){
	data.sort((a,b)=>{
		return a.created - b.created;
	})
	let newData = [];
	data.forEach(item=>{
		newData.push(...getCommentReplies(item));
	});
	return newData;
}
function getCommentReplies(item){
	if(item.replies){
		let replies = [item];
		item.replies.forEach(item=>{
			replies.push(...getCommentReplies(item));
		})
		return replies;
	}else{
		return [];
	}
}
function popCommentBarrage(data){
	let barrage = document.createElement('div');
	let width = commentBarrageConfig.dom.clientWidth;
	let height = commentBarrageConfig.dom.clientHeight;
	barrage.className = 'comment-barrage-item'
	let ran = Math.floor(Math.random()*commentBarrageConfig.lightColors.length)
	document.getElementById("barragesColor").innerHTML=`[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;

	barrage.innerHTML = `
		<div class="barrageHead">
			<img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
			<div class="barrageNick">${data.nick}</div>
			<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
	commentBarrageConfig.barrageTimer.push(barrage);
	commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage){
	barrage.className = 'comment-barrage-item out';

	if(commentBarrageConfig.maxBarrage!=1){
		setTimeout(()=>{
			commentBarrageConfig.dom.removeChild(barrage);
		},1000)
	}else{
		commentBarrageConfig.dom.removeChild(barrage);
	}
}
switchCommentBarrage = function () {
	if(!isInViewPortOfOne(document.getElementById("post-comment"))){
	commentBarrageConfig.displayBarrage=!(commentBarrageConfig.displayBarrage);
    let commentBarrage = document.querySelector('.comment-barrage');
    if (commentBarrage) {
        $(commentBarrage).fadeToggle()
    }
}
}
$(".comment-barrage").hover(function(){
	clearInterval(timer);
},function () {
	timer=setInterval(()=>{
		if(commentBarrageConfig.barrageList.length){
			popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
			commentBarrageConfig.barrageIndex += 1;
			commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
		}
		if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
			removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
		}
	},commentBarrageConfig.barrageTime)
})
initCommentBarrage()

```

在主题配置文件中引入该文件和jquery、md5、leancloud api以及一个css容器:

```yaml
inject:
  head:
  - <style id="barragesColor"></style>
  - ...
  bottom:
  - <script type="text/javascript" src="https://cdn1.tianli0.top/npm/jquery@latest/dist/jquery.min.js"></script>
  - <script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js"></script>
  - <script src="//cdn1.tianli0.top/npm/leancloud-storage@4.13.1/dist/av-min.js"></script>
  - <script type="text/javascript" src="/js/commentBarrage.js"></script>
```

<!-- endtab -->

{% endtabs  %}

# CSS部分

然后编写css部分，由于默认配置有我的标准色，所以会一并放到css里面（只有部分，完整版自己扒），新建 `[blogRoot]/themes/butterfly/source/css/commentBarrage.css`

```css
.comment-barrage {
	position: fixed;
	bottom: 0;
	right: 55px;
	padding: 0 0 30px 10px;
	z-index: 100;
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: flex-end;
}

@media screen and (max-width: 768px) {
	.comment-barrage {
		display: none!important;
	}
}

.comment-barrage-item {
	min-width: 150px;
	max-width: 200px;
	width: fit-content;
	min-height: 80px;
	max-height: 144px;
	margin: 4px 0;
	padding: 8px;
	background: rgba(0, 0, 0, 0.9);
	backdrop-filter: blur(20px) saturate(180%);
	border-radius: 8px;
	color: #fff;
	animation: barrageIn 0.3s cubic-bezier(.25, .01, .5, 1.5);
	transition: 1s;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

.comment-barrage-item.out {
	opacity: 0;
}

@keyframes barrageIn {
	0% {
		transform: scale(0.1);
	}

	,
	100% {
		transform: scale(1.0);
	}
}



.comment-barrage-item .barrageHead {
	height: 30px;
	padding: 0;
	line-height: 30px;
	font-size: 12px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.comment-barrage-item .barrageAvatar {
	width: 16px;
	height: 16px;
	margin: 0;
	border-radius: 50%;
}

.comment-barrage-item .barrageContent {
	font-size: 14px;
	height: calc(100% - 30px);
	overflow: scroll;
}

.comment-barrage-item .barrageContent::-webkit-scrollbar {
	height: 0;
	width: 4px;
}

.comment-barrage-item .barrageContent::-webkit-scrollbar-button {
	display: none;
}
:root{
    --lyx-black:black;
    --lyx-white:white;
    --lyx-white-acrylic2:#fffa;
    --lyx-black-acrylic2: #000a;
}
```

{% note info %}
2022-9-11更新：

调整了弹幕的min-width，如果感觉弹幕宽度太窄可以修改：
```diff
...
.comment-barrage-item{
-	min-width:100px
+   max-width:150px /*可以修改成其它宽度*/
...
}
...
```
{% endnote %}
在主题配置文件中引入：

```yaml
inject:
  head:
  - <link rel="stylesheet" href="/css/commentBarrage.css">
  - ...
  bottom:
  - ...
```

现在你就拥有了一个更好的留言弹幕了！

# TODO

{% checkbox 支持Gitalk %}
