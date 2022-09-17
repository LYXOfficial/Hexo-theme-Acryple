---
title: Hexo Butterfly如何引入自定义css/js
abbrlink: 583ff077
date: 2022-09-17 20:19:38
tags:
categories:
---

在一次次的偷懒中，魔改文章慢慢取消了引入css和js的教程，然后就出现了小白：

![1663420036531.png](https://bu.dusays.com/2022/09/17/6325c685e3211.png)

~~（虽然解决了~~

于是我打算写一篇介绍一下这些博客魔改的基础内容

{% note info %}
注：`[blogRoot]`指博客根目录

# 引用JS

首先你需要在`[blogRoot]/themes/butterfly/source/js`里面添加一个js，名字随你的便。*（需要注意的是不能放在`[blogRoot]/source/js`里面，否则可能出现bug）*
