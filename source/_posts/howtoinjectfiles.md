---
title: Hexo Butterfly博客魔改的一点点基础
abbrlink: '583ff077'
date: 2022-09-17 20:19:38
tags: 
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
swiper_index: 11
description: 新手必看
cover: https://bu.dusays.com/2022/10/06/633ecb6d3bd20.webp
updated: 2022-10-04 08:50:19
---


在一次次的偷懒中，魔改文章慢慢取消了引入css和js的教程，然后就出现了小白看不懂了：

![1663420036531.png](https://bu.dusays.com/2022/09/17/6325c685e3211.png)

~~（虽然解决了~~

于是我打算写一篇介绍一下这些博客魔改的基础内容

{% note info %}
注：`[blogRoot]`指博客根目录
{% endnote %}
# 引用JS

首先你需要在`[blogRoot]/themes/butterfly/source/js`里面添加一个js，名字随你的便。***（需要注意的是不能放在`[blogRoot]/source/js`里面，否则可能出现bug）***

然后把我说的js扔进去，当然你也可以直接放到以前的文件里面，免得改配置 *（但是可能有异步同步执行导致的各种bug）*

然后再修改主题配置文件，按照下面引入 **（一定是bottom，否则可能出现dom不完全导致js报错）** （如果直接用已有的就别加了）

```yaml
inject:
  head:
  - ... 
  bottom:
  - ...
  - <script type="text/javascript" src="/js/{把大括号里面的这个换成你的js名字}.js"></script>
  - ...
```

# 引用CSS

首先你需要在`[blogRoot]/themes/butterfly/source/css`里面添加一个css，名字随你的便。***（需要注意的是不能放在`[blogRoot]/source/css`里面，否则可能出现bug）***

然后把我说的css扔进去，当然你也可以直接放到以前的文件里面，免得改配置（可能分开更好管理，也可以像我全部扔进`styles.css`，洪哥全部`zhheoblog.css`）。

然后再修改主题配置文件，按照下面引入 **（一定是head，否则可能出现短暂无CSS）**（如果直接用已有的就别加了）：

```yaml
inject:
  head:
  - ... 
  - <link rel="stylesheet" href="/css/{把大括号里面的这个换成你的css名字}.css">
  bottom:
  - ...
```

# jq或者jquery是什么鬼？咋引入？

jQuery是一个方便选择元素的JavaScript库，jq是其缩写，为了偷懒我经常使用（不知道为什么[冰老师](https://zfe.space)倡导去jq），引入她很简单，跟引入js一样（已经加过了就别再加了）：

```yaml
inject:
  head:
  - ... 
  bottom:
  - <script type="text/javascript" src="https://unpkg.zhimg.com/jquery@latest/dist/jquery.min.js"></script> #一定要放在所有引入的js前面！！！
  - ...
```

# 啥是DIFF？

我在魔改时经常会出现diff代码块，她的意思是什么呢？

举个栗子：

修改`[blogRoot]\themes\Butterfly\layout\includes\header\nav.pug`:
```diff
nav#nav
  span#blog_name
    ...
    
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

出自————

{% link 关于Butterfly的导航栏的一些教程,Ariasakaの小窝,https://yisous.xyz/posts/895003b5/ %}

这里的“-”号表示删除源文件的内容，"+"号表示在这里增加，“...”表示省略内容，在根据其修改完文件后，要去掉前面的加号和减号，不要加或者减少一个空格，所以如果原来的文件是：

```c++
nav#nav
  span#blog_name
    a#site-name(href=url_for('/')) #[=config.title]
    
  #menus
    if (theme.algolia_search.enable || theme.local_search.enable)
      #search-button
        a.site-page.social-icon.search
          i.fas.fa-search.fa-fw
          span=' '+_p('search.title')
  !=partial('includes/header/menu_item', {}, {cache: true})
  #nav-right
    #toggle-menu
      a.site-page
        i.fas.fa-bars.fa-fw
```

那么修改后就是:

```c++
nav#nav
  span#blog_name
    a#site-name(href=url_for('/')) #[=config.title]
    
  #menus
  !=partial('includes/header/menu_item', {}, {cache: true})
  #nav-right
    if (theme.algolia_search.enable || theme.local_search.enable)
      #search-button
        a.site-page.social-icon.search
          i.fas.fa-search.fa-fw
      #toggle-menu
        a.site-page
          i.fas.fa-bars.fa-fw
```

你学会了吗？
