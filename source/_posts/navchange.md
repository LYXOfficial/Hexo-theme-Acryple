---
title: 关于Butterfly的导航栏的一些教程
tags:
  - hexo魔改
  - 干货教程
  - 推荐文章
  - 建站
categories:
  - hexo魔改
cover: 'https://bu.dusays.com/2022/09/01/631068b943a16.jpg'
abbrlink: 895003b5
date: 2022-09-01 14:33:38
---

在开始前，先说一些事情吧。最近要开学了，所以博客的更新会放缓，大概能够周更，不过几周鸽几下也是有可能的。

OK，那我们开始吧。

{% note info %}
本博仅作一些基础教程，一些自定义css请自行添加
{% endnote %}
# 前言

butterfly的默认导航栏长这样：

![1662014580748.png](https://bu.dusays.com/2022/09/01/6310547648cc8.png)

这个导航栏非常单调、比较丑，而且没有居中，不支持常驻~~（Jerry偷懒了~~，所以这次就来给它来一次改头换面吧！

# 分离搜索栏与菜单栏。

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
.layout{
    max-width:1400px;
}
.aside-content{
    max-width:312px;
}
/* @media screen and (max-width: 900px){
    .card-widget:not(#card-toc){
        display:none!important;
    }
} */
@media screen and (max-width: 900px){
    .aside-content{
        max-width:none!important;
    }
}
#archive,#page,#category,#tag{
    width:100%;
}
.page:not(.page.home) .aside-content{
    display: none;
}
@media screen and (min-width: 1300px) {
    #recent-posts{
        margin-top:-1rem;  /*头部为空时抵消间隔，若有磁贴或日历请注释掉该行*/
        align-content:flex-start;
        display: flex;
        flex-wrap: wrap; /*规定灵活的项目在必要的时候拆行或拆列。*/
        justify-content: space-between; /*。*/
    }
    #recent-posts > .recent-post-item {
      /*max-height:324px;*/  /*文章容器最大高度*/
      margin-top: 1rem; /*最小间距*/
      display: inline-block;
      height:auto; /*高度自动*/
      width:49%;/*文章容器容器宽度*/
    }
    #recent-posts > .recent-post-item .post_cover {
      width: 100%; /*图片封面宽度*/
        height: 200px;/*图片封面高度*/
    }
    #recent-posts > .recent-post-item .post_cover img.post_bg {
      width: 100%;/*图片宽度*/
      height: 100%;/*图片高度*/
    }
    #recent-posts > .recent-post-item {
    
      -webkit-flex-direction: column; /*容器内部纵向排列*/
      -ms-flex-direction: column; /*容器内部纵向排列*/
      flex-direction: column; /*容器内部纵向排列*/
    
    }
    #recent-posts > .recent-post-item .left_radius {
        border-radius: 8px 8px 0 0;/*圆角修改*/
    }
    #recent-posts > .recent-post-item .right_radius {
        border-radius: 8px 8px 0 0;/*圆角修改*/
    }
    .recent-post-item{
        height:auto !important;/*容器高度自动*/
    }
    
    .recent-post-info {
      
      padding: 0 40px;/*容器内部文字左右间距*/
      margin-top: 1em;/*容器内部文字上间距*/
      width: 100%!important;/*容器宽度*/
    }
    #recent-posts > .recent-post-item > .recent-post-info > .article-title {
        -webkit-line-clamp: 1;/*控制标题的行数*/
        margin-top: 0.3rem; /*控制标题的上间距*/
        margin-bottom: 0.3rem;/*控制标题的下间距*/
        color: var(--text-highlight-color);
        font-size: 1.2em; /*控制标题的字体大小*/
        line-height: 1.4;/*控制标题的行高*/
     
    }
    #recent-posts > .recent-post-item >.recent-post-info > .article-meta-wrap {
        margin-bottom: 1rem;/*控制标题meta信息的底部间距*/
    }
}

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
    left:calc(-150%)!important;/*这是估算值，为了保持元素居中的，如果不合适可以自己调*/
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

我写作业去了，咕咕咕...