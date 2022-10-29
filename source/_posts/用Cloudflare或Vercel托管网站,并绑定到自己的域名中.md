---
title: 用Cloudflare或Vercel、Netlify托管网站
tags:
  - 网络
  - 博客搭建
  - CDN加速
  - 干货教程
  - 推荐文章
  - 热门文章
categories:
  - 经验教程
cover: https://bu.dusays.com/2022/09/01/63103a73b198b.webp
description: Github Pages的加速方式
abbrlink: e433f3d
date: 2022-07-08 16:30:51
updated: 2022-10-04 08:50:19
---

# 前言

给博客做托管，因为[Github Pages](https://github.com)太慢了，而且GFW老墙老抽风~~（大天朝啊为什么这些都不让我们好好弄啊）~~，所以研究了其它几个托管商的托管服务，并且给网站做了分支，顺便分享一下托管的注册方法。

# 对比

## 本机（重庆电信2022-7-17）的四个分支Ping信息

### Github

![1658048585324](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048585324.png)

### Vercel

![1658048530089](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048530089.png)

### Cloudflare（延时高但是带宽高）

![1658048616721](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048616721.png)

### Netlify

![1658048673439](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048673439.png)

## 全国Ping（浅蓝说明没节点或超时）

### Vercel

![1658049126660](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658049126660.png)

### Github

![1658049228277](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658049228277.png)

### Cloudflare

![1658049416932](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658049416932.png)

### Netlify

![1658049316900](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658049316900.png)

具体情况因~~脸（bushi、~~运营商、地区、网速、时间、人、~~天时地利人和~~而异。自己选择托管方式（Github的不用看），个人比较推荐Vercel，况且其实Netlify和Cloudflare抽风的时候比Github还垃圾（比如这次），所以Vercel是最好的了。

虽然Vercel的Ping最低，但是因为Cloudflare有大陆节点（看脸），所以带宽高一点。

经过测试，本站分配三大运营商节点分别是电信用Cloudflare、移动用Vercel、联通用Netlify。默认分配Vercel节点。

# Cloudflare Pages

为什么先讲它呢？因为它的优势就是可以和他们家的DNS无缝集成啊！如果想用Cloudflare的DNS服务的话，这是一个不错的选择。~~*（不过ping最高，丢包率中等）*~~

## 注册

首先注册一个Cloudflare账号并验证邮箱。因为Cloudflare有国区，所以没有太大的问题，直接按照提示来进入仪表板就行了。![1657349994694](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657349994694.png)

## 创建Pages

然后点击"Pages"，连接你的github账号，把原来的github仓库里面的pages克隆过来（如果点连接Github加载半天没反应，可以试着科学上网）。

![1657350777816](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657350777816.png)

![1657350837811](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657350837811.png)

接着它会跳转到Github的这个页面，保持默认，Save即可（手机部分浏览器和IE可能会出现save点不了的现象）然后会跳转回去。

![1657351500630](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657351500630.png)

按照向导，点连接到git。

![1657351520703](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657351520703.png)

选择github pages对应的仓库。

![1657351544073](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657351544073.png)

然后进入选项，因为Hexo博客都是编译好再上传的，所以无需修改配置，但是名字最好起一个好一点的，这样能增加辨识度，名字会影响域名，所以选择一个简单的增加辨识度。

然后保存并部署，它会自动把github的repo克隆到cloudflare的服务器上。

![1657351715884](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657351715884.png)

Cloudflare会自动给你的Pages颁发自己的Cloudflare SSL证书。接下来你可以使用域名 `你的项目名.pages.dev`来访问你的站点了，每次仓库更新，它都会自动克隆过来。这样你的域名Ping就从超时变成了30-180ms了，虽然比国内服务器的50ms一下有差距，但是已经好了很多。

## 绑定自己的域名

返回Pages主页，进入这个域名的设置界面（顶上的项目名）

![1657351964108](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657351964108.png)

然后选择自定义域-设置自定义域

![1657352147619](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657352147619.png)

输入你的域名（前缀可以是没有、www、cloudflare等等），然后继续。

![1657352221251](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站，并绑定到自己的域名中/1657352221251.png)

如果你用的是Cloudflare的DNS选第一个，其它dns选第二个。~~（图没了）~~

按照这个cname配置到你的dns服务商那里，点击激活域，如果服务商就是cloudflare的话，它会自动添加，如果有冲突，就会提示是否替换。

至此，你就可以用自己的域名访问站点了（可能等0min-72小时才能激活）。

## 绑定域名遇到的坑

Cloudflare想办法给自己的公司引流，以至于一级域名只能集成到自己家。

比如你输入你注册的顶级域名的根域名的话，就只能迁入他们家的DNS来绑定。这就很坑。

比如我的：

![1658221973975](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658221973975.png)

这个情况困扰了我很久，后来我想到两个方法。

### 第一种解决方案：放弃根域名用www

这种方法就是用www.lyxop.xyz域名了，不过我不喜欢这种复杂的写法，如果你喜欢就用吧。

### 第二种解决方案：忽悠Cloudflare

这种方法比较离谱，就是先把域名dns转到Cloudflare那里，然后成功设置这个自定义域名之后，就偷偷把域名dns转回去，Cloudflare也没发现，但是他们觉得他们又忽悠到了一个用户。[doge~~]你以为我会被你骗？~~

实操来看，就是先去域名注册商那里换dns服务器，把cloudflare连上去（一般需要几十分钟-48h），完成所谓的“DNS转移”之后又切回以前的dns，并且加上cname，就能正常使用了。

为什么非要用DNSPOD不用Cloudflare呢？因为DNSPod可以运营商分流，而Cloudflare并没有贴合国情搞这个。

# Vercel

*~~咕咕咕...~~* 继续来写吧，Vercel算是一个不错的托管商，速度是这三个里面最快的，而且它还可以线上托管代码函数api执行，这些先搁着不讲，如何把网站部署到Vercel上呢？一般有两种方法

## 第一种：官方客户端+内置Hexo框架

这种方法稍微要配置一下，没那么方便，所以不用。

## 第二种：克隆Github Pages

因为Hexo自带Github Pages克隆，所以这个方法简单，每次部署到Github上之后就会自动克隆过去。

### 注册

Vercel的注册也很简单，进入[vercel.com/signup](https://vercel.com/signup)，由于是国外网站，所以进去会很慢，建议搭配Steam++食用。~~（没恰饭啦）~~ ![1658047811939](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658047811939.png)

一般都是用github登录，点Continue with Github，如果你授权过Github的话，会直接进入，没登录就登陆呗。没有授权过的会进入授权界面（图找不到了，网图，侵删），大概如图
![1658047644296](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658047644296.png)

点击绿色按钮就能自动登录了（网络不好容易登陆失败）。

{% note info simple %}
如果出现灰色点不了的现象，请检查：

1. 是否是用的手机浏览器（夸克、UC等），如果是请使用微信（新版）自带浏览器，实测可以过Github。
2. 是否用的浏览器版本过时，请更新。
3. 是否用的是IE，Github不支持。
   {% endnote %}

### 部署

进入仪表板，你会看到这个界面(我这里之前已经有过项目了，应该是空的)~~（博主居然懒得为了科普开小号，垃圾博主再也不关注了）~~
![1658047928139](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658047928139.png)

点击New Project，从你的Github导入博客对应的Pages仓库
![1658048033201](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048033201.png)

选择你博客Pages的仓库，import即可。
![1658048115127](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048115127.png)
这个配置界面我们并不需要选择什么，只要确认framework-reset为other，修改project name为你想要的名字（不宜太长！！！），点击Deploy即可部署。
![1658048242621](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658048242621.png)
部署之后用 `项目名.vercel.app`进入博客就行了，跟Cloudflare一样，Vercel也会给你颁发有效期为三个月的R3证书并自动续期，每次博客部署到Github也会同步进行。

### 调整节点

虽然Vercel没有大陆节点，但是还是有香港节点的，还是要调整一下，会加快一点速度。~~香港节点永远都是最能用的，一国两制yyds~~

进入项目主页，选择Setting-Serverless Functions，在右侧选择框选择Hong Kong(East)-hkg1
![1658105420370](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658105420370.png)

设置节点之后下一次部署就会生效

### 绑定自己的域名

返回项目主页，选择顶部的Setting-Domains
![1658104564627](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658104564627.png)
![1658104824236](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658104824236.png)

在顶部的文本框输入你的域名，比如lyxofficial.eu.org，点击Add，这个选择框是让你选择www和根域名的关系（第一个就是输入根域名跳转到www，第二个就是输入www会跳转到根域名，根据你的喜好选择（如果不是www或者根域名就没有提示）），我选择第二个，然后点击Add就行了。

添加之后它会让你加入A记录或者CNAME记录，按照它的提升添加，Vercel会给你颁发证书，稍等一会即可正常访问了。

开始建站吧！

# Netlify

Netlify同样也是一家老牌网站托管商，但是国内常被GFW墙掉，所以不是很建议选择。不过不抽的时候也挺快，有些地区速度不错。

## 注册

Netlify的注册托管也很简单，进入[app.netlify.com](https://app.netlify.com/)，选择Github登录

![1658222818677](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658222818677.png)

跟Vercel一样，会进入Github的验证界面，按照前面的方式验证。

接下来它会让你填一些信息，这个可以随便填。

![1658223525473](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658223525473.png)

## 部署

接下来部署项目，Netlify注册后会自动进入首次部署界面，选择从Import from Git

![1658223610009](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658223610009.png)

选择你的Github Pages对应的仓库

![1658223666105](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658223666105.png)

进入部署选项界面，你会看到它在加载分支。

![1658223732693](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658223732693.png)

{% note info simple %}

不知道是什么bug~~Bugjump：特性！~~，它会一直加载分支，这时你需要手动点击“Customize build settings”来加载

{% endnote %}

加载完后，选项不用改，直接点击Deploy site即可

![1658223918842](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658223918842.png)

不同于vercel，Netlify的首次部署较慢，总之等一等就好了。

![1658224003023](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658224003023.png)

等到部署完成之后，你就可以用 `项目名.netlify.app`访问站点了，不同的是，Netlify的项目名是自动生成的，就是顶上导航栏的那一个。

### 更改项目名

如果你不喜欢这个名字当然也可以更改项目名，进入项目主页-Site settings-General-Site Details，选择右侧的Change Site name，输入自己喜欢的名字，Save即可。

![1658304921066](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658304921066.png)
![1658304991839](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658304991839.png)

Netlify也会自动给你颁发R3证书并自动续期，同样每一次hexo d会自动部署到Netlify上面。

## 绑定自己的域名

进入项目主页-Site settings-Domain management-domains

![1658306246373](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658306246373.png)

选择Add domain alias，输入你的域名，域名就添加成功了。

![1658306279005](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658306279005.png)

如果你没有预先设置cname的话，就选择域名后面的![1658306361482](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658306361482.png)，然后按照上面的方式把域名解析到上面就好了。

![1658306423645](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/用Cloudflare或Vercel托管网站,并绑定到自己的域名中/1658306423645.png)

开始研究你的网站吧！
