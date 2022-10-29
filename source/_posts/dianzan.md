---
title: 让butterfly主题支持文章点赞
abbrlink: 1b850b16
date: 2022-08-16 10:51:44
tags: 
  - Hexo魔改
  - 干货教程
  - 推荐文章
categories:
  - Hexo魔改
cover: https://bu.dusays.com/2022/08/22/6302df361a344.webp
swiper_index: 8
description: 搞一个像钉钉网课一样可以连点器点的文章点赞
updated: 2022-10-04 08:50:19
---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,Ariasakaの小窝,https://yisous.xyz/posts/583ff077/ %}

# 前言&效果

众所周知，b站的视频有点赞功能，这个功能能够充分地体现出观众们对视频的喜爱程度~~和白嫖率~~。

同样，我们可以在博客中添加这个功能，后续我可能也会增加一个收藏功能（或者说是直接整一个账号登录？~~用静态网页搞登录作死的博主是屑~~）

![1660618508648](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660618508648.png)

效果如下，只需要点击左侧的点赞图标即可点赞：

![1660618730764](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660618730764.png)

不过目前的博文点赞并没有点赞次数限制，像钉钉上课的点赞一样，你甚至可以用连点器点到1919810个赞。当然这个版本采用leancloud存储，肯定会有api调用限制的，而且反应稍慢。

![1660619132596](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660619132596.png)

![1660619528680](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660619528680.png)

![1660627980542](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660627980542.png)

# 教程部分

放出魔改教程吧！

## 改pug

打开 `[blogRoot]\themes\butterfly\layout\includes\header\post-info.pug`，在末尾添加

```js
span.post-meta-separator |&nbsp 
    span.post-meta-dianzan
        if theme.wordcount.post_wordcount
        a(href="javascript:void(0)" class="dianzan"  onclick="dianzan()")
            i.fas.fa-thumbs-up
        span.post-meta-label= _p(' 点赞') + ':'
        span.dianzan-count=0
```

```diff
 - let comments = theme.comments
 #post-info
  h1.post-title= page.title || _p('no_title')
    if theme.post_edit.enable
      a.post-edit-link(href=theme.post_edit.url + page.source title=_p('post.edit') target="_blank")
        i.fas.fa-pencil-alt
      
  #post-meta
    .meta-firstline
      if (theme.post_meta.post.date_type)
        ...
      if comments.count && !comments.lazyload && page.comments !== false && comments.use
        ...
          when 'Twikoo'
            ...
          when 'Facebook Comments'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.fb-comments-count(data-href=urlNoIndex())
+      span.post-meta-separator |&nbsp 
+        span.post-meta-dianzan
+          if theme.wordcount.post_wordcount
+            a(href="javascript:void(0)" class="dianzan"  onclick="dianzan()")
+              i.fas.fa-thumbs-up
+            span.post-meta-label= _p(' 点赞') + ':'
+            span.dianzan-count=0
```

如果你使用的是 `butterfly4.2.2或者4.3.1`的话，可以直接使用我改好的pug (说明一下hexo的语法高亮不支持pug，所以我用js高亮代替)

```js
- let comments = theme.comments
#post-info
  h1.post-title= page.title || _p('no_title')
    if theme.post_edit.enable
      a.post-edit-link(href=theme.post_edit.url + page.source title=_p('post.edit') target="_blank")
        i.fas.fa-pencil-alt
      
  #post-meta
    .meta-firstline
      if (theme.post_meta.post.date_type)
        span.post-meta-date
          if (theme.post_meta.post.date_type === 'both')
            i.far.fa-calendar-alt.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.created')
            time.post-meta-date-created(datetime=date_xml(page.date) title=_p('post.created') + ' ' + full_date(page.date))=date(page.date, config.date_format)
            span.post-meta-separator |
            i.fas.fa-history.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.updated')
            time.post-meta-date-updated(datetime=date_xml(page.updated) title=_p('post.updated') + ' ' + full_date(page.updated))=date(page.updated, config.date_format)
          else
            - let data_type_update = theme.post_meta.post.date_type === 'updated'
            - let date_type = data_type_update ? 'updated' : 'date'
            - let date_icon = data_type_update ? 'fas fa-history' :'far fa-calendar-alt'
            - let date_title = data_type_update ? _p('post.updated') : _p('post.created')
            i.fa-fw.post-meta-icon(class=date_icon)
            span.post-meta-label= date_title
            time(datetime=date_xml(page[date_type]) title=date_title + ' ' + full_date(page[date_type]))=date(page[date_type], config.date_format)
      if (theme.post_meta.post.categories && page.categories.data.length > 0)
        span.post-meta-categories
          if (theme.post_meta.post.date_type)
            span.post-meta-separator |

          each item, index in page.categories.data
            i.fas.fa-inbox.fa-fw.post-meta-icon
            a(href=url_for(item.path)).post-meta-categories #[=item.name]
            if (index < page.categories.data.length - 1)
              i.fas.fa-angle-right.post-meta-separator

    .meta-secondline
      - let postWordcount = theme.wordcount.enable && (theme.wordcount.post_wordcount || theme.wordcount.min2read)
      if (postWordcount)
        span.post-meta-separator |
        span.post-meta-wordcount
          if theme.wordcount.post_wordcount
            i.far.fa-file-word.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.wordcount') + ':'
            span.word-count= wordcount(page.content)
            if theme.wordcount.min2read
              span.post-meta-separator |
          if theme.wordcount.min2read
            i.far.fa-clock.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.min2read') + ':'
            span= min2read(page.content, {cn: 350, en: 160}) + _p('post.min2read_unit')
  
      //- for pv and count
      mixin pvBlock(parent_id,parent_class,parent_title)
        span.post-meta-separator |
        span(class=parent_class id=parent_id data-flag-title=page.title)
          i.far.fa-eye.fa-fw.post-meta-icon
          span.post-meta-label=_p('post.page_pv') + ':'
          if block
            block

      - const commentUse = comments.use
      if commentUse && !comments.lazyload
        case commentUse[0]
          when 'Valine'
            if theme.valine.visitor
              +pvBlock(url_for(page.path),'leancloud_visitors',page.title)
                span.leancloud-visitors-count
          when 'Waline'
            if theme.waline.pageview
              +pvBlock('','','')
                span.waline-pageview-count(data-path=url_for(page.path))
          when 'Twikoo'
            if theme.twikoo.visitor
              +pvBlock('','','')
                span#twikoo_visitors
          default
            if theme.busuanzi.page_pv
              +pvBlock('','post-meta-pv-cv','')
                span#busuanzi_value_page_pv
      else if theme.busuanzi.page_pv
        +pvBlock('','post-meta-pv-cv','')
          span#busuanzi_value_page_pv

      if comments.count && !comments.lazyload && page.comments !== false && comments.use
        - var whichCount = comments.use[0]

        mixin countBlock
          span.post-meta-separator |
          span.post-meta-commentcount
            i.far.fa-comments.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.comments') + ':'
            if block
              block
      
        case whichCount
          when 'Disqus'
          when 'Disqusjs'
            +countBlock
              span.disqus-comment-count
                a(href=full_url_for(page.path) + '#disqus_thread')
          when 'Valine'
            +countBlock
              a(href=url_for(page.path) + '#post-comment' itemprop="discussionUrl")
                span.valine-comment-count(data-xid=url_for(page.path) itemprop="commentCount")
          when 'Waline'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.waline-comment-count(data-path=url_for(page.path))
          when 'Gitalk'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.gitalk-comment-count
          when 'Twikoo'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span#twikoo-count
          when 'Facebook Comments'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.fb-comments-count(data-href=urlNoIndex())
      span.post-meta-separator |&nbsp 
        span.post-meta-dianzan
          if theme.wordcount.post_wordcount
            a(href="javascript:void(0)" class="dianzan"  onclick="dianzan()")
              i.fas.fa-thumbs-up
            span.post-meta-label= _p(' 点赞') + ':'
            span.dianzan-count=0
```

这时重新 `hexo cl&&hexo s`应该就能看到点赞显示了。

![1660621375103](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660621375103.png)

## LeanCloud配置

然后你需要一个LeanCloud数据库。

如果你已经注册并且创建数据库了，就不必看教程了。

{% hideToggle 点击查看创建教程 %}

因为现在Leancloud为了顺从国家政策~~怕被工信部搞没了~~，所以禁用了海外版共享域名，你可以按照以下两种方式来注册

实名认证并没有年龄限制，但是你需要拍摄身份证原件，相信不少的童鞋都只有户口本（我有身份证），那就不行了。

{% tabs %}

<!-- tab 使用国内版（推荐，速度快，出事几率小，但是要实名且绑定域名要备案） -->

进入Leancloud中国版官网注册

{% link 注册-Leancloud中国版,Leancloud,https://console.leancloud.cn/register %}

然后按照注册指引来做。

接下来你需要实名认证才可以正常使用，点账号头像-账号设置-实名认证，

![1660626531641](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660626531641.png)

在这个界面里面拍摄你的身份证照片和名字身份证号码进行认证（我已经验证过了）。

如果你没有身份证或者拿不到身份证的话，就使用国际版，但是不能直接用共享域名，需要你自己绑定。如果你身份证和域名都没有的话，那就没办法了。

然后创建应用，选择开发版，自己改名字创建即可。
![1660626905154](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660626905154.png)
<!-- endtab -->
<!-- tab 使用国际版自定义域名（免实名，需要自己有域名，以后有墙掉的可能，速度慢） -->
我其实不太推荐这一个方法，因为很有可能有些人没事点赞就给你点爆没反应了。

如果你没有自定义域名的话，可以申请一个Freenom或者euorg域名，参考：

{% link eu.org免费域名白嫖教程以及避坑,我的第一篇文章，怀念...,https://yisous.xyz/posts/aedd05c3/ %}

一样进入Leancloud国际版官网注册

{% link 注册-Leancloud国际版,Leancloud,https://console.leancloud.app/register %}

然后注册之后创建一个应用

![1660626905154](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660626905154.png)

进入管理页面，输入你的域名（是子域名），绑定域名

![1660626976454](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660626976454.png)

输好之后按照她给的cname去你的dns解析商添加这个cname，稍等几分钟即可使用

![1660627133930](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660627133930.png)

建议绑定之后访问一次这个域名可以让leancloud更快检测到dns绑定，稍等一会就绑定成功了。

![1660627220283](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660627220283.png)

![1660627232588](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660627232588.png)

<!-- endtab -->
{% endtabs %}
{% endhideToggle %}

{% note warning simple %}
如果你已经注册过用于评论系统的话（比如Valine），请务必使用同样的数据库，否则会出现bug导致损坏评论数据库！<del class="noheimu">（我也不知道为什么，很多大佬们用Leancloud都会提示）</del>
{% endnote %}

进入你的应用-数据存储-结构化数据，创建一个名为**dianzan**的class，权限改为无限制（反正点赞这玩意又不重要），创建这个class

![1660627525521](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/dianzan/1660627525521.png)

然后在设置-应用凭证复制你的AppID、AppKey和REST API服务器地址，一定要保密。

至此，Leancloud部分就配置完了。

## JS部分

然后用一小段JS访问API就可以实现点赞了，在`[blogRoot]/themes/butterfly/source/js`里面新建`dianzan.js`文件，粘贴以下代码，把 __{YOUR_APPID}__ 换成开始复制的AppId， **{YOUR_APPKEY}** 换成开始复制的AppKey， **{YOUR_URL}** 换成开始复制的分配的共享域名或者你自己绑定的域名

```javascript
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
$(document).ready(function () {
    const {
        Query,
        User
    } = AV;
    AV.init({
        appId: "{YOUR_APPID}",
        appKey: "{YOUR_APPKEY}",
        serverURL: "{YOUR_URL}"
    });
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
        }
    });
})

function setCount() {
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index] + 1;
        }
    });
}

function dianzan() {
    try {
        var dianzans = [];
        var hrefs = [];
        var ids = [];
        const query = new AV.Query('dianzan');
        query.find().then((dzs) => {
            for (i = dzs.length - 1; i >= 0; i--) {
                dianzans.push(dzs[i]["attributes"]["count"]);
                hrefs.push(dzs[i]["attributes"]["href"]);
                ids.push(dzs[i]["id"])
            }
            if (hrefs.indexOf(GetUrlRelativePath()) == -1) {
                console.log(1)
                const TestObject = AV.Object.extend('dianzan');
                const testObject = new TestObject();
                testObject.set('href', GetUrlRelativePath());
                testObject.set('count', 1);
                testObject.save();
            } else {
                index = hrefs.indexOf(GetUrlRelativePath());
                console.log(ids[index])
                query.get(ids[index]).then((todo) => {
                    todo.set('count', dianzans[index] + 1);
                    todo.save();
                });
            }
            setCount();
        });
    } catch (err) {
        const TestObject = AV.Object.extend('dianzan');
        const testObject = new TestObject();
        testObject.set('href', GetUrlRelativePath());
        testObject.set('count', 1);
        testObject.save();
    }

}
```
然后在主题配置文件中插入：
```yaml
inject:
  head:
  - ...
  bottom:
  - ...
  - <script type="text/javascript" src="/js/dianzan.js"></script>
```

你也可以用我目前的cdn（一样不保证可用性）

```yaml
inject:
  head:
  - ...
  bottom:
  - ...
  - <script type="text/javascript" src="https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/js/dianzan.js"></script>
```



恭喜你获得了好玩的<del class="noheimu">无限</del>点赞功能！

## TODO

{% checkbox checked, 魔改主题显示点赞 %}
{% checkbox checked, 点赞云存储 %}
{% checkbox checked, 显示点赞个数 %}
{% checkbox  首页显示点赞个数 %}
{% checkbox cookies记录是否点赞，一个人只能点一个 %}
{% checkbox <del class="noheimu">账号登录功能</del>~~(番外个体计划)~~ %}
