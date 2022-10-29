---
title: Hexo Butterfly宽屏适配指北
abbrlink: d1fc759
date: 2022-08-15 10:24:43
tags: 
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
cover: https://bu.dusays.com/2022/09/01/63103a785d717.webp
swiper_index: 6
description: 让你的博客看起来更舒服
updated: 2022-10-04 08:50:19
---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

{% note info simple %}

本教程仅适用于hexo-theme-butterfly，其余主题请自行探讨

{% endnote %}

# 前言

现在随着显示器成本降低，越来越多的人都用上了大屏幕，这时博客的标准宽度就显得很憋屈了，空间利用率太低，无法充分展示博文内容。

而且看起来也不舒服，尤其是加了首页banner之后，我放出以前没有宽屏的博客版本（Vercel每次部署都有单独域名，好东西）

![1660530568958](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660530568958.png)

![1660530656405](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660530656405.png)

这是很远古的博客了，所以啥也没有。。。见谅。

[LYXの小窝 (lyxoffpage-22gpafksa-lyxofficial.vercel.app)](https://lyxoffpage-22gpafksa-lyxofficial.vercel.app/)

怎么样，憋屈吗？

所以宽屏适配很重要，像是洪哥的博客就很舒服（翻了翻日志以前没做适配的时候也是没那么舒服）

![1660530752314](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660530752314.png)

宽屏适配当然不是这么一句css能完全搞定的，不然看起来很难受~~（你以为为什么我会为了这玩意专门写这么多）~~

```css
.layout{
  max-width:1400px;
}
```

好的，教程正式开始。

{% note info simple %}

为了适用于大部分情况，本教程使用纯净的未魔改过的butterfly4.3.1全新环境进行教学，不确保butterfly旧版一定可用（4.1.0+放心食用，3.x、2.x甚至1.x谨慎食用）

{% endnote %}

# 基础

## 引入css

事先说明一下引入css的方式:

在 `[blogRoot]/themes/butterfly/source/css`里面添加一个css文件，名字任意。

然后在主题配置文件的inject部分这样编写:

```yaml
inject:
  head:
  - <link rel="stylesheet" href="/css/{你的css文件名}">
  bottom:
  - ...
```

注意要放在主题的source里面，放在hexo的source会出现bug。

然后你可以试着引入开始那个css了

# 修改边栏卡片大小

如果你直接引入那个css的话，你大概会看见这样的场面

![1660531879628](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660531879628.png)

有没有什么感觉？对吧，右侧的卡片宽度太宽了，看起来很不舒服，我们想要的是跟之前一样的右侧卡片

所以要限制一下卡片的尺寸。

{% hideToggle 点击查看魔改教程 %}

加入以下css:

```css
.aside-content{
    max-width:312px;
    min-width:300px;
}
.recent-posts{
  width:auto!important;
}
```

现在右侧卡片就窄一点了。

![1660542304909](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660542304909.png)

但是这样的话如果使用平板的尺寸浏览的话，底部卡片就会无法完全伸展（如下图），显得很bug

![1660533609485](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660533609485.png)

这时有两种解决方案：
{% tabs  %}

<!-- tab 第一招：不显示 -->

效果如下：

![1660542653199](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660542653199.png)

添加如下css：

```css
@media screen and (max-width: 900px){
    .card-widget:not(#card-toc){
        display:none!important;
    }
    /*因为目录可以用侧边栏展开，所以不能隐藏*/
}
```

<!-- endtab -->

<!-- tab 第二招：根据屏幕尺寸自适应max-width -->

效果如下：
![1660542663662](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660542663662.png)

简单说就是在宽度小于900px时不设置max-width，添加以下css：

```css
@media screen and (max-width: 900px){
    .aside-content{
        max-width:none!important;
    }
}
```

<!-- endtab -->

{% endtabs %}

{% endhideToggle %}

# 分页适配

看到洪哥的分页界面是没有作者卡片的（下图），如果你也想实现这样的效果的话，你可以按照下面魔改
![1660535116781](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660535116781.png)

{% hideToggle 点击查看魔改教程 %}

添加以下css:

```css
#archive,#page,#category,#tag{
    width:100%;
}
.page .aside-content{
    display: none;
}
```

然后你会发现文章页确实没有了卡片，可是首页也没了（如下图），我们想要的是首页有卡片分页没有，对吧？

![1660535616659](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660535616659.png)

![1660535627919](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660535627919.png)

所以我们要魔改主题以便css区分主页和分页，按照下面修改 `[blogRoot]\themes\butterfly\layout\includes\layout.pug`

```diff
 - var htmlClassHideAside = theme.aside.enable && theme.aside.hide ? 'hide-aside' : ''
 - page.aside = is_archive() ? theme.aside.display.archive: is_category() ? theme.aside.display.category : is_tag() ? theme.aside.display.tag : page.aside
 - var hideAside = !theme.aside.enable || page.aside === false ? 'hide-aside' : ''
- - var pageType = is_post() ? 'post' : 'page'
+ - var pageType = is_home() ? 'page home' : is_post() ? 'post' : 'page'

doctype html
html(lang=config.language data-theme=theme.display_mode class=htmlClassHideAside)
  ...
```

或者直接用改好的pug（4.2.2&4.3.1可以食用）

```js
- var htmlClassHideAside = theme.aside.enable && theme.aside.hide ? 'hide-aside' : ''
- page.aside = is_archive() ? theme.aside.display.archive: is_category() ? theme.aside.display.category : is_tag() ? theme.aside.display.tag : page.aside
- var hideAside = !theme.aside.enable || page.aside === false ? 'hide-aside' : ''
- var pageType = is_home() ? 'page home' : is_post() ? 'post' : 'page'

doctype html
html(lang=config.language data-theme=theme.display_mode class=htmlClassHideAside)
  head
    include ./head.pug
  body
    if theme.preloader
      !=partial('includes/loading/loading', {}, {cache: true})

    if theme.background
      #web_bg
  
    !=partial('includes/sidebar', {}, {cache: true})

    if page.type !== '404'
      #body-wrap(class=pageType)
        include ./header/index.pug

        main#content-inner.layout(class=hideAside)
          if body
            div!= body
          else
            block content
            if theme.aside.enable && page.aside !== false
              include widget/index.pug

        - var footerBg = theme.footer_bg
        if (footerBg)
          if (footerBg === true)
            - var footer_bg = bg_img
          else
            - var footer_bg = theme.footer_bg.indexOf('/') !== -1 ? `background-/image: url('${url_for(footerBg)}')` : `background: ${footerBg}`
        else
          - var footer_bg = ''

        footer#footer(style=footer_bg)
          !=partial('includes/footer', {}, {cache: true})

    else
      include ./404.pug

    include ./rightside.pug
    !=partial('includes/third-party/search/index', {}, {cache: true})
    include ./additional-js.pug
```

现在主页的class就变成page home了，接下来将前面的css改为以下:

```css

#archive,#page,#category,#tag{
    width:100%;
}
.page:not(.page.home) .aside-content{
    display: none;
}
```

现在主题就能智能区分主页和分页了，可以自动选择卡片显示。

![1660536572371](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660536572371.png)

![1660536576204](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660536576204.png)

{% endhideToggle %}

如果想要背景透明（如下图）的话

![1661319799457](image/butterflywidescreen/1661319799457.png)

添加如下css:
```css
.page #page:not(.home #page),.page #tag,.page #archive,.page #category{
    background: transparent!important;
    border: none!important;
    box-shadow: none!important;
    padding-top: 0;
}
```

# 首页卡片适配

宽度这么宽，首页只显示一行一张卡片确实有点浪费，可以安装butterfly-article-double-row插件解决，但是————

这个插件没有自适应，也就是说在低分辨率网页较窄的时候显得很拥挤，所以这次使用手动魔改的方式。

{% hideToggle 点击查看魔改教程 %}
加入以下css（参考自冰老师的butterfly-article-double-row）：

```css
@media screen and (min-width: 1200px) {
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
        font-size: 1.2em; /*控制标题的字体大小*/
        line-height: 1.4;/*控制标题的行高*/
   
    }
    #recent-posts > .recent-post-item >.recent-post-info > .article-meta-wrap {
        margin-bottom: 1rem;/*控制标题meta信息的底部间距*/
    }
}
```

这时进入网站会发现实现了自适应功能，但是双栏下文章信息挂在了文章下面，看起来很不舒服，这时要修改主题pug文件
![1660539042804](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660539042804.png)
![1660539128403](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660539128403.png)

修改
{% note info simple %}
提示：魔改有风险，因为每个版本的butterfly的这个pug都不太一样，且pug对缩进要求高，小白容易出错，且我无法给出旧版改好的pug（因为不一样），所以请备份文件，以免出错。
{% endnote %}
打开 `[blogRoot]\themes\Butterfly\layout\includes\mixins\post-ui.pug`

把这一句改到 `.article-title(href=url_for(link) title=title)= title`这句后面，原来的删掉：

```js
case theme.index_post_content.method
  when false
    - break
  when 1
    .content!= article.description
  when 2
    if article.description
      .content!= article.description
  else
    - const content = strip_html(article.content)
    - let expert = content.substring(0, theme.index_post_content.length) 
    - content.length > theme.index_post_content.length ? expert += ' ...' : ''
    .content!= expert
  default
    - const content = strip_html(article.content)
    - let expert = content.substring(0, theme.index_post_content.length) 
    - content.length > theme.index_post_content.length ? expert += ' ...' : ''
    .content!= expert
```

diff:

```diff
mixin postUI(posts)
  each article , index in page.posts.data
    .recent-post-item
      -
      ...
        a.article-title(href=url_for(link) title=title)= title
+        case theme.index_post_content.method
+          when false
+            - break
+          when 1
+            .content!= article.description
+          when 2
+            if article.description
+              .content!= article.description
+            else
+              - const content = strip_html(article.content)
+              - let expert = content.substring(0, theme.index_post_content.length) 
+              - content.length > theme.index_post_content.length ? expert += ' ...' : ''
+              .content!= expert
+          default
+            - const content = strip_html(article.content)
+            - let expert = content.substring(0, theme.index_post_content.length) 
+            - content.length > theme.index_post_content.length ? expert += ' ...' : ''
+            .content!= expert
        .article-meta-wrap
          if (is_home() && (article.top || article.sticky > 0))
            span.article-meta
              i.fas.fa-thumbtack.sticky
              span.sticky= _p('sticky')
              span.article-meta-separator |
          ...

        //- Display the article introduction on homepage
-        case theme.index_post_content.method
-                when false
-                    - break
-                when 1
-                    .content!= article.description
-                when 2
-                    if article.description
-                    .content!= article.description
-                    else
-                    - const content = strip_html(article.content)
-                    - let expert = content.substring(0, theme.index_post_content.length) 
-                    - content.length > theme.index_post_content.length ? expert += ' ...' : ''
-                    .content!= expert
-                default
-                    - const content = strip_html(article.content)
-                    - let expert = content.substring(0, theme.index_post_content.length) 
-                    - content.length > theme.index_post_content.length ? expert += ' ...' : ''
-                    .content!= expert

    if theme.ad && theme.ad.index
      ...
```

The edited code for butterfly 4.2.2:

```js
mixin postUI(posts)
  each article , index in page.posts.data
    .recent-post-item.words
      -
        let link = article.link || article.path
        let title = article.title || _p('no_title')
        const position = theme.cover.position
        let leftOrRight = position === 'both' 
          ? index%2 == 0 ? 'left' : 'right'
          : position === 'left' ? 'left' : 'right'
        let post_cover = article.cover
        let no_cover = article.cover === false || !theme.cover.index_enable ? 'no-cover' : ''
      -
      if post_cover && theme.cover.index_enable
        .post_cover(class=leftOrRight)
          a(href=url_for(link) title=title)
            img.post_bg(src=url_for(post_cover) onerror=`this.onerror=null;this.src='`+ url_for(theme.error_img.post_page) + `'` alt=title)
      .recent-post-info(class=no_cover)
        a.article-title(href=url_for(link) title=title)= title
        //- Display the article introduction on homepage
        case theme.index_post_content.method
          when false
            - break
          when 1
            .content!= article.description
          when 2
            if article.description
              .content!= article.description
            else
              - const content = strip_html(article.content)
              - let expert = content.substring(0, theme.index_post_content.length) 
              - content.length > theme.index_post_content.length ? expert += ' ...' : ''
              .content!= expert
          default
            - const content = strip_html(article.content)
            - let expert = content.substring(0, theme.index_post_content.length) 
            - content.length > theme.index_post_content.length ? expert += ' ...' : ''
            .content!= expert
        .article-meta-wrap
          if (is_home() && (article.top || article.sticky > 0))
            span.article-meta
              i.fas.fa-thumbtack.sticky
              span.sticky= _p('sticky')
              span.article-meta-separator |
          if (theme.post_meta.page.date_type)
            span.post-meta-date
              if (theme.post_meta.page.date_type === 'both')
                i.far.fa-calendar-alt
                span.article-meta-label=_p('post.created')
                time.post-meta-date-created(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date))=date(article.date, config.date_format)
                span.article-meta-separator |
                i.fas.fa-history
                span.article-meta-label=_p('post.updated')
                time.post-meta-date-updated(datetime=date_xml(article.updated) title=_p('post.updated') + ' ' + full_date(article.updated))=date(article.updated, config.date_format)
              else
                - let data_type_updated = theme.post_meta.page.date_type === 'updated'
                - let date_type = data_type_updated ? 'updated' : 'date'
                - let date_icon = data_type_updated ? 'fas fa-history' :'far fa-calendar-alt'
                - let date_title = data_type_updated ? _p('post.updated') : _p('post.created')
                i(class=date_icon)
                span.article-meta-label=date_title
                time(datetime=date_xml(article[date_type]) title=date_title + ' ' + full_date(article[date_type]))=date(article[date_type], config.date_format)
          if (theme.post_meta.page.categories && article.categories.data.length > 0)
            span.article-meta
              span.article-meta-separator |
              i.fas.fa-inbox
              each item, index in article.categories.data
                a(href=url_for(item.path)).article-meta__categories #[=item.name]
                if (index < article.categories.data.length - 1)
                  i.fas.fa-angle-right.article-meta-link
          if (theme.post_meta.page.tags && article.tags.data.length > 0)
            span.article-meta.tags
              span.article-meta-separator |
              i.fas.fa-tag
              each item, index in article.tags.data
                a(href=url_for(item.path)).article-meta__tags #[=item.name]
                if (index < article.tags.data.length - 1)
                  span.article-meta-link #[='•']
      
          mixin countBlockInIndex
            - needLoadCountJs = true
            span.article-meta
              span.article-meta-separator |
              i.fas.fa-comments
              if block
                block
              span.article-meta-label= ' ' + _p('card_post_count')
      
          if theme.comments.card_post_count
            case theme.comments.use[0]
              when 'Disqus'
              when 'Disqusjs'
                +countBlockInIndex
                  a(href=full_url_for(link) + '#disqus_thread')
              when 'Valine'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment' itemprop="discussionUrl")
                    span.valine-comment-count(data-xid=url_for(link) itemprop="commentCount")
              when 'Waline'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment')
                    span.waline-comment-count(id=url_for(link))
              when 'Twikoo'
                +countBlockInIndex
                  a.twikoo-count(href=url_for(link) + '#post-comment')
              when 'Facebook Comments'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment')
                    span.fb-comments-count(data-href=urlNoIndex(article.permalink))

    

    if theme.ad && theme.ad.index
      if (index + 1) % 3 == 0
        .recent-post-item.ads-wrap!=theme.ad.index
```

The edited code for butterfly 4.3.1:

```js
mixin postUI(posts)
  each article , index in page.posts.data
    .recent-post-item
      -
        let link = article.link || article.path
        let title = article.title || _p('no_title')
        const position = theme.cover.position
        let leftOrRight = position === 'both'
          ? index%2 == 0 ? 'left' : 'right'
          : position === 'left' ? 'left' : 'right'
        let post_cover = article.cover
        let no_cover = article.cover === false || !theme.cover.index_enable ? 'no-cover' : ''
      -
      if post_cover && theme.cover.index_enable
        .post_cover(class=leftOrRight)
          a(href=url_for(link) title=title)
            img.post_bg(src=url_for(post_cover) onerror=`this.onerror=null;this.src='`+ url_for(theme.error_img.post_page) + `'` alt=title)
      .recent-post-info(class=no_cover)
    
        a.article-title(href=url_for(link) title=title)= title
        case theme.index_post_content.method
          when false
            - break
          when 1
            .content!= article.description
          when 2
            if article.description
              .content!= article.description
            else
              - const content = strip_html(article.content)
              - let expert = content.substring(0, theme.index_post_content.length) 
              - content.length > theme.index_post_content.length ? expert += ' ...' : ''
              .content!= expert
          default
            - const content = strip_html(article.content)
            - let expert = content.substring(0, theme.index_post_content.length) 
            - content.length > theme.index_post_content.length ? expert += ' ...' : ''
            .content!= expert
        .article-meta-wrap
          if (is_home() && (article.top || article.sticky > 0))
            span.article-meta
              i.fas.fa-thumbtack.sticky
              span.sticky= _p('sticky')
              span.article-meta-separator |
          if (theme.post_meta.page.date_type)
            span.post-meta-date
              if (theme.post_meta.page.date_type === 'both')
                i.far.fa-calendar-alt
                span.article-meta-label=_p('post.created')
                time.post-meta-date-created(datetime=date_xml(article.date) title=_p('post.created') + ' ' + full_date(article.date))=date(article.date, config.date_format)
                span.article-meta-separator |
                i.fas.fa-history
                span.article-meta-label=_p('post.updated')
                time.post-meta-date-updated(datetime=date_xml(article.updated) title=_p('post.updated') + ' ' + full_date(article.updated))=date(article.updated, config.date_format)
              else
                - let data_type_updated = theme.post_meta.page.date_type === 'updated'
                - let date_type = data_type_updated ? 'updated' : 'date'
                - let date_icon = data_type_updated ? 'fas fa-history' :'far fa-calendar-alt'
                - let date_title = data_type_updated ? _p('post.updated') : _p('post.created')
                i(class=date_icon)
                span.article-meta-label=date_title
                time(datetime=date_xml(article[date_type]) title=date_title + ' ' + full_date(article[date_type]))=date(article[date_type], config.date_format)
          if (theme.post_meta.page.categories && article.categories.data.length > 0)
            span.article-meta
              span.article-meta-separator |
              i.fas.fa-inbox
              each item, index in article.categories.data
                a(href=url_for(item.path)).article-meta__categories #[=item.name]
                if (index < article.categories.data.length - 1)
                  i.fas.fa-angle-right.article-meta-link
          if (theme.post_meta.page.tags && article.tags.data.length > 0)
            span.article-meta.tags
              span.article-meta-separator |
              i.fas.fa-tag
              each item, index in article.tags.data
                a(href=url_for(item.path)).article-meta__tags #[=item.name]
                if (index < article.tags.data.length - 1)
                  span.article-meta-link #[='•']
      
          mixin countBlockInIndex
            - needLoadCountJs = true
            span.article-meta
              span.article-meta-separator |
              i.fas.fa-comments
              if block
                block
              span.article-meta-label= ' ' + _p('card_post_count')
      
          if theme.comments.card_post_count
            case theme.comments.use[0]
              when 'Disqus'
                +countBlockInIndex
                  a(href=full_url_for(link) + '#disqus_thread')
                    i.fa-solid.fa-spinner.fa-spin
              when 'Disqusjs'
                +countBlockInIndex
                  a(href=full_url_for(link) + '#disqusjs')
                    span.disqus-comment-count(data-disqus-url=full_url_for(link))
                      i.fa-solid.fa-spinner.fa-spin
              when 'Valine'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment')
                    span.valine-comment-count(data-xid=url_for(link))
                      i.fa-solid.fa-spinner.fa-spin
              when 'Waline'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment')
                    span.waline-comment-count(id=url_for(link))
                      i.fa-solid.fa-spinner.fa-spin
              when 'Twikoo'
                +countBlockInIndex
                  a.twikoo-count(href=url_for(link) + '#post-comment')
                    i.fa-solid.fa-spinner.fa-spin
              when 'Facebook Comments'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment')
                    span.fb-comments-count(data-href=urlNoIndex(article.permalink))
                      i.fa-solid.fa-spinner.fa-spin
              when 'Remark42'
                +countBlockInIndex
                  a(href=url_for(link) + '#post-comment')
                    span.remark42__counter(data-url=urlNoIndex(article.permalink))
                      i.fa-solid.fa-spinner.fa-spin

        //- Display the article introduction on homepage
    

    if theme.ad && theme.ad.index
      if (index + 1) % 3 == 0
        .recent-post-item.ads-wrap!=theme.ad.index
```

然后你就能看到合理的文章页面了。
![1660540055941](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660540055941.png)

{% endhideToggle %}

# 友链界面适配

在你弄好了其它内容之后，你会发现一个新的难看之处————友链。

![1660543360935](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660543360935.png)

友链一行默认只显示3个链接，但是就是因为这一点，导致一个友链宽度很大，看起来不舒服。

这时只需要你加入一点点css，就能让一行显示更多的友链图标：

```css
.flink-list-item{
    width:calc(100% / 4 - 15px)!important;
}
@media screen and (max-width: 1250px) {
    .flink-list-item{
        width:calc(100% / 3 - 15px)!important;
    }
}
```

![1660541950424](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/butterflywidescreen/1660541950424.png)

好了，现在你就拥有了一个内容承载更多的博客了！
