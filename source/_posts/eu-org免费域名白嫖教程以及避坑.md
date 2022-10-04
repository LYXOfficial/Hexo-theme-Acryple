---
title: eu.org免费域名白嫖教程以及避坑
tags:
  - 网络
  - 博客搭建
  - 白嫖
  - 干货教程
  - 推荐文章
  - 热门文章
categories:
  - 白嫖教程
description: eu.org域名注册教程
cover: https://bu.dusays.com/2022/09/01/63103a6ec8591.webp
swiper_index: 1
abbrlink: aedd05c3
date: 2022-07-06 11:50:53
updated: 2022-10-04 08:50:19
---

# 前言

做完了博客，发现Github Pages域名不太喜欢，对SEO也不友好，就萌生想要自己搞域名的想法，自己恰好是学生，没有财力承担任何一点的域名费用，就去白嫖域名了。因为Freenom太难注册了，选择了eu.org域名。~~然鹅后面还是架不住Dynadot14块的便宜xyz域名~~

# 介绍

eu.org这个域名注册服务在1996年就有了，是为无力承担资金的组织提供的免费域名注册服务，所以官网有~~*亿*~~一点点low，得忍一忍。

### 是不是顶级域名？

虽然eu.org本身是二级域名，但是已被大部分DNS服务商认定为顶级域名，不必担心

# 注册

打开[nic.eu.org](https://nic.eu.org)，即可进入官网（当然没有中文，可以自己翻译）。你会看到这个*非常Low的界面，（真就是1996年的水平)。*![1657080187231](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657080187231.png)

然后点击“Sign-in or sign-up"后面的“here”，进入登录界面，点击“Register”进入注册界面

![1657082180223](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657082180223.png)    ![1657080373915](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657080373915.png)

看到这个栏目别慌，只有Name和Email和Password填真的，其它不管，Password填密码，Address（地址）只用填前两行就行，邮箱务必填真实的，待会要验证。

点击"Create"注册后过一会，你会收到如下的邮件，这时点那串链接进行验证。记住以”-FREE“结尾的nic-hdl，待会要用。

![1657080716692](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657080716692.png)

接下来进入登录界面，输入刚刚那个nic-hdl到Handle上面，并且输入密码，就能进入管理界面

![1657080899478](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657080899478.png)

点击“New Domain”添加域名。

进入这个界面，看起来很多~~*（天啊，不会这玩意都要备案吧）（bushi）*~~。不管那么多，我们只需要填写第一行的Complete domain name和nameservers就行了。![1657082001448](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657082001448.png)![1657082112958](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657082112958.png)![1657083508604](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657083508604.png)

domain name填写域名全名，比如我的lyxoff2233.eu.org，nameservers就是dns服务器了。因为eu.org官方并没有提供dns服务器，我们需要自己填写。

nameserver上面选项选第一个，然后name1填[**edmund.dnspod.net**](https://link.zhihu.com/?target=http%3A//edmund.dnspod.net) name2填dempsey.dnspod.net（没有https/http）。

如果出现Done，你就可以关闭页面，静待佳音了。

# 申请DNS服务器

{% note info simple %}

如果你出现报错（底部有n errors，n warnings的提示，没报错就是Done），请看一看这个。

{% endnote %}

网上很多教程都没有说nameserver如何填申请，以至于你可能会抄别人的域名结果提示Empty Answer。

不过有些人用别人的server是可以过的，如果不能过，底部会有n errors，n warnings的提示，这时需要你去注册，如果可以直接跳到后面。

国内最方便的平台是dnspod（没注册也能绑定）。

打开[https://www.dnspod.cn/login?s_url=https://www.dnspod.cn/](https://www.dnspod.cn/login?s_url=https://www.dnspod.cn/)登录/注册，国内平台注册账号不用多说。

进入[https://console.dnspod.cn/dns/adddomain?from=dns_add_domain](https://console.dnspod.cn/dns/adddomain?from=dns_add_domain)添加域名。

![1657083512691](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657083512691.png)

输入你要注册的域名，提示已注册的话也选择继续添加，一路下一步，他会提示：

![1657083921986](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657083921986.png)

这时复制两个服务器到name1和name2上面，就好了

# 喜讯

Done之后，域名不能马上使用，你要等最多几个月的时间审核，我的域名只用了7小时就好了（极为罕见）。审核之后，你会收到这样的邮件。开始绑定服务器建站吧！![1657083181580](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/eu-org免费域名白嫖教程以及避坑/1657083181580.png)
