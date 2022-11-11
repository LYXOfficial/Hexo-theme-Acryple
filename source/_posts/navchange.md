---
title: 关于Butterfly的导航栏的一些教程
tags:
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
cover: 'https://bu.dusays.com/2022/09/01/631068b943a16.jpg'
abbrlink: 895003b5
date: 2022-09-01 14:33:38
swiper_index: 12
description: 更好的导航栏mod
updated: 2022-10-04 08:50:19
---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

在开始前，先说一些事情吧。最近要开学了，所以博客的更新会放缓，大概能够周更，不过几周鸽几下也是有可能的。

OK，那我们开始吧。

{% note info %}
本博仅作一些基础教程，一些自定义css请自行添加
{% endnote %}
# 前言

butterfly的默认导航栏长这样：

![1662014580748.png](https://bu.dusays.com/2022/09/01/6310547648cc8.png)

这个导航栏非常单调、比较丑，而且没有居中，不支持常驻~~（Jerry偷懒了~~，所以这次就来给它来一次改头换面吧！

# 分离搜索栏与菜单栏

为了方便管理，我们要让搜索栏在最右侧，而其它元素居中，这时我们需要修改一下pug

修改`[blogRoot]\themes\Butterfly\layout\includes\header\nav.pug`:
```diff
nav#nav
  span#blog_name
    a#site-name(href=url_for('/')) #[=config.title]
    
  #menus
-    if (theme.algolia_search.enable || theme.local_search.enable)
-      #search-button
-        a.site-page.social-icon.search
-          i.fas.fa-search.fa-fw
-          span=' '+_p('search.title')
  !=partial('includes/header/menu_item', {}, {cache: true})
  #nav-right
+    if (theme.algolia_search.enable || theme.local_search.enable)
+      #search-button
+        a.site-page.social-icon.search
+          i.fas.fa-search.fa-fw
-    #toggle-menu
-      a.site-page
-        i.fas.fa-bars.fa-fw
+      #toggle-menu
+        a.site-page
+          i.fas.fa-bars.fa-fw

```

这时，就变成了这样

![1662015427348.png](https://bu.dusays.com/2022/09/01/631057c4c4dda.png)

为了美观我隐藏了搜索栏的文字，若想要显示出来可以在最后加上：

```diff
nav#nav
  span#blog_name
    a#site-name(href=url_for('/')) #[=config.title]
    
  #menus
-    if (theme.algolia_search.enable || theme.local_search.enable)
-      #search-button
-        a.site-page.social-icon.search
-          i.fas.fa-search.fa-fw
-          span=' '+_p('search.title')
  !=partial('includes/header/menu_item', {}, {cache: true})
  #nav-right
+    if (theme.algolia_search.enable || theme.local_search.enable)
+      #search-button
+        a.site-page.social-icon.search
+          i.fas.fa-search.fa-fw
+          span=' '+_p('search.title')
-    #toggle-menu
-      a.site-page
-        i.fas.fa-bars.fa-fw
+      #toggle-menu
+        a.site-page
+          i.fas.fa-bars.fa-fw
```

# 导航栏居中

其实导航栏居中可以用纯CSS的方式来解决：

在你的自定义css里面添加下面几句CSS：

```css
#nav-right{
    flex:1 1 auto;
    justify-content: flex-end;
    margin-left: auto;
    display: flex;
    flex-wrap:nowrap;
}
```

导航栏居中就实现了

![1662016388179.png](https://bu.dusays.com/2022/09/01/63105b85d341e.png)

# 去掉导航栏项目底下的蓝色长条

默认的蓝色长条动画很坑，如果你想自定义hover效果，可以添加如下css来解决:

![1662016551531.png](https://bu.dusays.com/2022/09/01/63105c2927d6a.png)

```css
#nav *::after{
    background-color: transparent!important;
}
```

# 子菜单横向布局

butterfly的二级菜单默认是纵向排列的，可以添加如下css使其横向排列

![1662017890178.png](https://bu.dusays.com/2022/09/01/631061640d5fc.png)

---2022.10.14更新：

在[@いちか](https://ichika.cc/)的建议下，进行修改：

![1665748033183.png](https://bu.dusays.com/2022/10/14/63494c42d3713.png)

```css
.menus_item_child li:not(#sidebar-menus li){
    float: left;
    border-radius: 6px!important;
    -webkit-border-radius: 6px!important;
    -moz-border-radius: 6px!important;
    -ms-border-radius: 6px!important;
    -o-border-radius: 6px!important;
}
.menus_item_child:not(#sidebar-menus ul){
  /*
    left:calc(-150%)!important;这是估算值，为了保持元素居中的，如果不合适可以自己调
  改为：*/
  left:50%;
  translate:-50%;
}
```

效果如下：

![1662018025137.png](https://bu.dusays.com/2022/09/01/631061eb0515f.png)

# 网站标题部分的增强版

默认的标题非常简单，就是一个a标签，按下来就返回主页，看到洪哥他们的有一个非常高大上的动画，所以我也写了一个

效果如下：

![1662018856050.png](https://bu.dusays.com/2022/09/01/63106529ad8e1.png)

原理不难，就是一个利用after标签特性的css

不过你需要自己根据css注释微调。

```css
#site-name::before{
    opacity: 0;
    background-color: var(--lyx-theme)!important;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
    transition: .3s;
    -webkit-transition: .3s;
    -moz-transition: .3s;
    -ms-transition: .3s;
    -o-transition: .3s;
    position:absolute;
    top:0!important;
    right:0!important;
    width:100%;
    height:100%;
    content: "\f015";
    box-shadow: 0 0 5px var(--lyx-theme);
    font-family: "Font Awesome 6 Free";
    text-align: center;
    color:white;
    line-height:34px;/*如果有溢出或者垂直不居中的现象微调一下这个参数*/
    font-size: 18px;/*根据个人喜好*/
}
#site-name:hover::before{
    opacity: 1;
    scale:1.03;
}
#site-name{
    position: relative;
    font-size: 24px; /*一定要把字体调大点，否则效果惨不忍睹！*/
}
:root{
    --lyx-theme:#ed709b /*我的主题色*/
}
```

# 顶栏常驻

butterfly的顶栏滚动时会自动收起，我并不喜欢，所以通过修改css的方式实现。

（以前其实改的是js但是忘记怎么改了）
```css
.nav-fixed #nav{
    transform: translateY(58px)!important;
    -webkit-transform: translateY(58px)!important;
    -moz-transform: translateY(58px)!important;
    -ms-transform: translateY(58px)!important;
    -o-transform: translateY(58px)!important;
}
#nav{
    transition: none!important;
    -webkit-transition: none!important;
    -moz-transition: none!important;
    -ms-transition: none!important;
    -o-transition: none!important;
}
```

改css的方式会出现一个bug：在滚动到顶部的时候再滚下来会闪一下，后面找到js的修改方式之后告诉你们吧。

# 显示标题

有时候文章看着看着忘记标题了，其实可以通过导航栏显示。鼠标向上移动时就自动显示导航，向下移动就显示标题，效果如下：

![1662019601915.png](https://bu.dusays.com/2022/09/01/631068142b3be.png)
![1662019598832.png](https://bu.dusays.com/2022/09/01/6310681abbcbb.png)
![1662019583585.png](https://bu.dusays.com/2022/09/01/631068225dfad.png)

因为技术原因，并没有实现上下滑动的动画效果，可以找洪哥扒一扒。

{% note warning %}
由于魔改项目不同，可能会出现排版错乱的问题，请自行调整css或者在评论区中询问
{% endnote %}

修改`[blogRoot]\themes\Butterfly\layout\includes\header\nav.pug`
```diff
nav#nav
  span#blog_name
    a#site-name(href=url_for('/')) #[=config.title]
    
  #menus
    !=partial('includes/header/menu_item', {}, {cache: true})
+    center(id="name-container")
+      a(id="page-name" href="javascript:scrollToTop()") PAGE_NAME
  ...
```

然后添加`nav.js`，并且按照注释修改配置
```javascript
//js有一个小问题：就是只要鼠标滚动不论哪里都会响应，即便你滚动的是子元素

//2022.9.11 已修复，需要jq，请自行引入
document.getElementById("name-container").setAttribute("style", "display:none");

var position = $(window).scrollTop();

$(window).scroll(function () {

  var scroll = $(window).scrollTop();

  if (scroll > position) {


    document.getElementById("name-container").setAttribute("style", "");
    document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");

  } else {


    document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
    document.getElementById("name-container").setAttribute("style", "display:none");

  }

  position = scroll;

});
function scrollToTop(){
    document.getElementsByClassName("menus_items")[1].setAttribute("style","");
    document.getElementById("name-container").setAttribute("style","display:none");
    btf.scrollToDest(0, 500);
}
//修复没有弄右键菜单的童鞋无法回顶部的问题
document.getElementById("page-name").innerText = document.title.split(" | Ariasakaの小窝")[0];
/*这里是去掉你的网站全局名称的设置，如果你不需要去掉，你可以写成：
document.getElementById("page-name").innerText=document.title

或者把你的网站的分隔符和全局网站名称加上去*/

```

最后添加如下css，按照注释修改参数：
```css
/*
2022.10.4更新：
根据我发现的没有自适应，间距不合理问题进行调整，如果用了这个的朋友们建议改一改
*/
#page-name::before{
    font-size:18px;
    position: absolute;
    width:100%;
    height:100%;
    border-radius: 8px;
    color:white!important;
    top:0;
    left:0;
    content:'回到顶部';
    background-color: var(--lyx-theme);
    transition: all .3s;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    opacity: 0;
    box-shadow: 0 0 3px var(--lyx-theme);
    line-height: 45px; /*如果垂直位置不居中可以微调此值，也可以删了*/
}
#page-name:hover:before{
    opacity: 1;
}
@media screen and (max-width:900px){
    #page-name,#menus{
      display:none!important;
    }
}

#name-container{
    transition: all .3s;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
}
#name-container:hover{
    scale:1.03
}
#page-name{
    position: relative;
    padding:10px 30px/*如果文字间隔不合理可以微调修改，第二个是水平方向的padding，第一个是垂直的*/
}
#nav{
    padding: 0 20px;
}

```

恭喜你获得了一个更好的导航栏！



