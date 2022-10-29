---
title: GoormIDE的VPS白嫖（3）- 自定义域名教程
abbrlink: ec12b762
date: 2022-08-03 10:45:47
tags:
  - 白嫖
  - 服务器
  - 干货教程
  - 热门文章
  - 推荐文章
  - goorm
categories:
  - 白嫖教程
cover: https://bu.dusays.com/2022/09/01/63103a6a14ff6.webp
updated: 2022-10-04 08:50:19
---

# 前言

因为goorm不能自定义域名，所以后来研究了很多方法，后来发现有个很好用的cloudflared隧道，研究出来了方法，就写了这篇文章，算是[拾贰的教程](https://hehysh.vercel.app/posts/36990.html)的升级版（因为有点麻烦）。

{% note info simple %}

由于未知原因，本教程不适用于wordpress，其它大部分服务可以正常使用（实测hexo、minecraft、网站监测等服务可以正常完美使用）。

此教程要求你使用cloudflare的dns，如果不是，请换成cloudflare来解析，不然不能绑定（可以自己用partner或者之前[那篇文章](https://yisous.xyz/posts/e433f3d.html)的类似的蒙混过关法，he不知可否）

{% endnote %}

不知道为什么我选了免费计划他要绑定信用卡，不过这个教程甚至不需要你进入zero trust仪表板就能完成。

{% note warning simple %}

<del class="noheimu">本教程有封号风险，因为上次okteto已经因为搭隧道封了号，虽然goorm没说，但谁确定呢？</del>
{% endnote %}

{% note warning simple %}

2022-8-11更新：

不建议使用该教程！目前拾贰已经封号了，具体原因还在查明中，可能是因为搭建隧道的原因。

在我确认之前建议不要使用，我的账号目前没有被ban。

免费的才是最贵的！建议购买付费VPS，至少也要是那种大厂用绑定信用卡才行的。

不推荐Okteto、Railway、Github Actions等基于k8e的CI容器，一旦重新部署容易删数据，且稳定性不高。

如果只是想用Typecho的话可以考虑Vercel部署+稳定的云数据库。

{% endnote %}

# 介绍

cloudflare tunnel是cloudflare推出的隧道内网穿透平台，只支持使用自家dns服务器的域名，原名argo tunnel，归并于cloudflare zero trust中，cloudflared是其客户端软件

# 下载cloudflared软件

首先要下载cloudflared软件。

进入终端，输入这串指令安装cloudflared

```bash
wget https://github.com/cloudflare/cloudflared/releases/download/2022.7.1/cloudflared-linux-amd64.deb
dpkg -i ./cloudflared-linux-amd64.deb
rm ./cloudflared-linux-amd64.deb
```

然后输入 `cloudflared -v`检测安装是否成功。

如果提示下面的内容，说明成功运行。

![1659499308874](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormcustomdomain/1659499308874.png)

当然wget后面的deb包链接同样可以通过官方github仓库（cloudflare/cloudflared）的release的latest版本的附带包中找到。

# 配置隧道

输入

```bash
cloudflared tunnel login
```

会显示一个链接，进入这个链接，登录并授权cloudflare账号，然后选择一个你需要穿透的域名，这个域名务必是通过验证可以正常用cloudflare解析的域名。

然后可以配置隧道了，这些隧道配置都在cli中即可完成。

一些常规的配置：

创建隧道：

```bash
cloudflared tunnel create 隧道名
```

删除隧道：

```bash
cloudflared tunnel delete 隧道名
```

列出隧道：

```bash
cloudflared tunnel list
```

配置隧道（配置会一直保存）：

```bash
cloudflared tunnel route dns 隧道名 [CNAME 记录名称].[接入 Cloudflare 的域名]
```

运行隧道：

```bash
cloudflared tunnel run --url https://127.0.0.1:http端口号 隧道名字
```

以博主的为例。

博主的hexo博客在端口233（真的），想部署在vps.yisous.xyz这个域名上面，就这样操作。

先输入

```bash
cloudflared tunnel create hexoblog #创建一个名为hexoblog的隧道
```

然后输入

```bash
cloudflared tunnel route dns hexoblog vps.yisous.xyz #hexoblog这个隧道映射到vps,yisous.xyz这个域名
```

最后输入以下这串来测试隧道运行：

```bash
cloudflared tunnel run --url https://127.0.0.1:233 hexoblog #启动hexoblog这个隧道，映射端口233到指定域名
```

启动隧道之后访问设置的域名，就可以进入你的网站了。

# 配置Apache

除此之外，还要再宝塔的站点部分添加新的自定义域名，才能正常使用，按照下图操作

![1659501476381](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormcustomdomain/1659501476381.png)

# 正式使用隧道

因为你不可能一直守着终端，所以需要后台运行并且守护进程。

可以使用nohup后台运行，

先检测nohup是否安装

```bash
nohup --version
```

如果输出

```plaintext
nohup (GNU coreutils) 8.28
Copyright (C) 2017 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Written by Jim Meyering.
```

说明已经安装，否则请输入 `apt-get install nohup`安装。

安装之后把指令改为

```bash
nohup cloudflared tunnel run --url https://127.0.0.1:http端口号 隧道名字 &
```

即可后台运行。然后输入 `exit`安全退出终端即可

你还可以用宝塔的计划任务实现，不再赘述。

下次更新Minecraft服务器教程~~（为什么现在不更因为博主还是没搞定就是连不上端口ip各种问题）~~，这个系列也算是完结了，至于oj的话，因为问题很多，所以我想独立出这个系列来发文。

等成熟之后我会将更快的vps站作为主站，并且搞定oj和MC服务器，至少有一个完整的~~生态链~~体验了。
