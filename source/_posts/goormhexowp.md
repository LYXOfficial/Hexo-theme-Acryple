---
title: GoormIDE的VPS白嫖（2）-搭配宝塔面板搭建你的wordpress或Hexo服务器
abbrlink: bbc95d58
date: 2022-07-28 14:00:32
cover: https://bu.dusays.com/2022/09/01/63103a6c77dde.webp
tags:
  - 白嫖
  - 服务器
  - 干货教程
  - 热门文章
  - 推荐文章
  - goorm
categories:
  - 白嫖教程
updated: 2022-10-04 08:50:19
---

# 前言

上期安装了宝塔面板，这次就来弄一下服务器吧。其实宝塔面板安装这些东西都差不多，让我们开始吧。

# 安装LAMP环境

按照账号密码与安全入口登录并进入宝塔面板，注册一个宝塔账号并绑定，就可以看到宝塔面板的界面了。

在一般情况下，宝塔会弹出建议安装的软件的界面（不知道为什么我没有），选择LAMP环境，对应Wordpress友好，安装成功率也更高，但是时间长、性能开销高。LNMP的话，问题就是我按照LNMP安装时Nginx老是安装失败。根据你的想法来装吧，PHP版本一定选最新，其余默认，不需要Ftpd（常传文件可以加）。（网图侵删）

![1658992046876](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658992046876.png)

如果你不需要搭建动态网页，可以不选择MySQL和PHP、phpMyAdmin这几个选项。

然后极速安装即可。如果没有的话，就去软件商店一个一个搜索点安装也行。

# 安装的一些问题

## 安装速度

由于服务器性能一般，安装非常漫长，而且是从国内服务器下载到韩国服务器再编译，速度真的很慢。

我的信息：

Apache安装失败3次，成功那一次用时1700+秒，并且还有问题（见上一篇）。

MySQL安装失败9次，不同版本都试过，包括MariaDB和MySQL5.x、8.x，最后一次用时2700+秒。

PHP安装一次成功，用时700+秒.

phpMyadmin安装一次成功，用时1500+秒。

Nginx1.22无法安装，使用小号MC服务器安装了1.18，成功，用时133秒。

## 安装失败怎么办

### 一些解决方案

安装失败一般就是几十秒就显示成功，或者启动服务失败，或者终端有Error提示，说明安装失败了。

有时安装失败是网络原因，有时是玄学原因，还有是某些版本的bug或者环境要求不满足。

首先再试几遍，就能排除前两种可能，如果再试不行的话，就要考虑34了。

34的话就可以尝试更换一些更稳定的版本或者老版本（比如Nginx1.22不能用换成1.18）。

如果都不行的话，你就要清除残留再试了。

### 清除残留的教程

不同环境清除方法不同，我给出几个容易出错的来解决。

#### 进入命令行

清除残留的工作大部分只能用命令行解决。

如何进入命令行呢？

第一种就是用官方终端，就是那个可以单独进入或者用IDE内置的（单独的终端有滚动界限bug，下面的东西看不到，要手动输入clear清除）。

第二种就是自己连SSH了。

第三种就是用宝塔终端，因为这个较为方便，以后都会用这个终端。

进入宝塔的自带终端，默认无法自动认证，这时可以输入goorm给的SSH密码，其余不变，即可登录。

SSH密码的获取教程在[上一篇教程](/posts/14740f7c.html)里面写有。

![1658993077003](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658993077003.png)

#### MySQL

MySQL的修复教程网上很多，这里不赘述，推荐一篇

[Ubuntu 彻底清除 MySQL 配置和残留数据(非常实用)_一米九零小胖子的博客-CSDN博客_ubuntu清除mysql](https://blog.csdn.net/weixin_47156401/article/details/121089118)

为了方便大家不经常跳转，我把原文放上来：

{% hideToggle 原文 %}

### 1、删除 MySQL ；

```bash
sudo apt-get remove mysql-*
```

### 2、清理残留数据；

```bash
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

### 3、移除apparmor；

```bash
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

该三个过程中如果弹出对话框，一路回车即可；
{% endhideToggle %}

其实清除MySQL残留不难，需要博主补充说明的一点是，由于MySQL有MariaDB的分支，如果你安装了这个版本的话，那么你不仅要执行第一句，还要加上：

```bash
apt-get remove mariadb-*
```

#### Apache

同样引用文章：

[Ubuntu 彻底删除apache_ChengHai37的博客-CSDN博客_ubuntu卸载apache](https://blog.csdn.net/chenghai37/article/details/80646684)

{% hideToggle 原文 %}

1. 删除apache

代码:

```bash
sudo apt-get --purge remove apache-common
sudo apt-get --purge remove apache
```

2. 找到没有删除掉的配置文件，一并删除

代码:

```bash
sudo find /etc -name "apache" |xargs  rm -rf
sudo rm -rf /var/www
sudo rm -rf /etc/libapache2-mod-jk
```

3. 删除关联，这样就可以再次用apt-get install apache2 重装了

```bash
dpkg -l | grep apache2 | awk'{print $ 2}'| xargs dpkg -P
```

{% endhideToggle %}

#### PHP

还是引用文章：

[完全卸载PHP，重新安装_坏小哥的博客-CSDN博客_linux 重装php](https://blog.csdn.net/weixin_43885417/article/details/84873721)

{% hideToggle 原文 %}

##### 卸载（以php7为例）

###### 删依赖包：

```bash
sudo apt-get autoremove php + 你的版本号+（如：sudo apt-get autoremove php7）
```

###### 删关联：

```bash
sudo find /etc -name "php" |xargs  rm -rf
```

###### 清除dept列表里的残留信息：

```bash
sudo apt purge dpkg -l | grep php| awk '{print $2}' |tr "\n" " "
```

###### 检查一下是否卸载干净，如无返回即干净卸载：

```bash
dpkg -l | grep php.+你的版本号（如：dpkg -l | grep php.7）
```

##### 安装

先更新本地内置的程序

```bash
sudo apt-get update
sudo apt-get upgrade
```

接着，判断系统是否内置了add-apt-repository命令，如果没有执行下列命令安装

```bash
sudo apt-get install software-properties-common
```

添加最新的PHP源，然后安装（如php7.1）

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.1 php7.1-common php7.1-fpm php7.1-dev
sudo apt-get install php7.1-mbstring php7.1-xml
```

安装结束之后就可以执行php -i命令查看到php-cli的信息 。

###### 为了遵守规矩，放上版权声明

————————————————
版权声明：本文为CSDN博主「坏小哥」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_43885417/article/details/8487372

{% endhideToggle %}

因为默认root用户，所以不要加上sudo，有时会提示找不到sudo。

大概就是这些了，如果还是不行，就去宝塔社区提问解决吧。

## 测试服务器是否正常运行

安装完了服务器，接下来就是测试服务器了，在此之前你需要开放80端口。

进入goorm的设置，找到URL/Port，点Add

![1658994317747](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658994317747.png)

再选第一个~~白嫖到的服务器是没法自定义域名的，后面我会着手解决~~

![1658994411989](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658994411989.png)

端口输入80，然后输入你想要的域名，点击√即可，如果已经有了可以把原来默认的删掉。

~~免费版™只能开3个端口，垃圾~~

进入这个域名，如果显示的是服务器（你的apache/nginx）默认的404或者欢迎界面就说明ok了，如果是goorm的404界面的话，请在宝塔面板的软件管理界面检测是否已经打开服务。

已经打开就重装吧。

如果显示xxx error，请自行查看日志、搜索教程、请教他人~~（或者博主）~~。~~那就sudo rm -rf删了跑路换小号重开呗~~

# 部署Hexo

Hexo是静态网页，部署十分简单。

在宝塔的网站-添加站点里面按下图操作

![1658995139653](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658995139653.png)

修改后点击提交即可。（端口一定是80-65536，某些特定端口可能待会添加不了，自己看）

然后到你的项目设置里面绑定域名，按照下图编写

![1658995298433](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658995298433.png)

提交即可。

然后你就可以用你的域名访问网站了（没有端口）。

![1658995491200](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658995491200.png)

~~*虽然Ping比较高，甚至超时，但是速度真心可以，比Vercel快得多，以后就用这个算了。*~~

# 部署WordPress

在部署前，请确定你的LAMP是否全部启动，可以在软件商店里面找到启动。

接下来就来部署吧。因为宝塔有自带的WordPress部署器，所以可以直接在软件商店的一键部署分类找到，按照下图操作。

![1658996288063](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormhexowp/1658996288063.png)

静等它创建完成，部署完后，按照Hexo的方法映射端口，访问网站就能进入wordpress的设置界面了，数据库和用户名、密码就是上面你填的。

今天就到这里吧，后续更新自定义域名、MC服务器、Hexo自动部署的终极教程。
