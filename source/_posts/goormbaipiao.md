---
title: GoormIDE的VPS白嫖（1）-白嫖与安装宝塔面板教程
tags:
  - 白嫖
  - 服务器
  - 干货教程
  - 热门文章
  - 推荐文章
  - goorm
categories:
  - 白嫖教程
description: 无敌好用的免费VPS！！！
swiper_index: 2
abbrlink: 14740f7c
date: 2022-07-25 12:12:10
cover:
updated: 2022-10-04 08:50:19
---

# 前言

想搞一个VPS作为自己的Minecraft服务器和Wordpress站，但是苦于没有平台，最开始用的是三丰云，但是因为实在配置太差而且还有续期很麻烦，就放弃了。后来看到了[拾贰](https://hehysh.vercel.app)写的Okteco的VPS白嫖，就去试了一下，但是官方实在太坑，条款很严格，而且我SSH连接动不动就断（装apt大包和宝塔面板断，比如装Apache和MariaDB），最离谱的是居然Screen、nohup不管用，看样子是自动休眠了。~~fxxk~~。

后来发现能嫖的不多，只有EUServ了，结果呢？一看安装费2欧元，就知道肯定是俺们国人把他们嫖怕了。。。

后来发现很多在线IDE都是用Docker的虚拟机内嵌IDE实现的，就研究了一下Goorm和Coding Web Studio，发现Coding登录宝塔面板MD5校验失败，就用Goorm了。

Goorm是一个韩国在线IDE平台，免费版的东西也不错，而且因为是邻国速度不错，休眠不会删数据且恢复速度很快，所以就选择了它。

# 速度如何？

放图秒懂，同样是这个hexo博客的打开速度

## Vercel

![1659497669012](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1659497669012.png)

## GoormVPS

![1659497634763](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1659497634763.png)

# 注册

goorm的注册非常简单，进入官网[accounts.goorm.io/login](https://accounts.goorm.io/login)，选择顶部的Github登录授权即可。

![1658725806544](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658725806544.png)

# 添加服务器

打开[ide.goorm.io](https://ide.goorm.io)，进入面板，选择New container，进入添加容器界面

![1658725837718](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658725837718.png)

将Name改为你想要的名字（随便不影响），Region改为第一个（韩国节点较快），Visibility改为Public，Stack改为blank，其余保持默认，点击“Create”即可创建容器

![1658726016184](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658726016184.png)

![1658726072422](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658726072422.png)

创建之后，它会准备一段时间，接下来就可以进入IDE了。

![1658726143343](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658726143343.png)

# 始终开启设置

为了防止它休眠导致网站没法访问，我们要在主页打开Always on，也就是下面这个，注意免费版只有一个配额。

![1658733687269](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658733687269.png)

# 使用终端

有两种方式，一种是SSH连接，一种是用自带终端连接。

SSH的连接方式可以通过点击项目右上角三个点-Go to settings-Port forwarding进入设置来找到

{% note info simple %}

以后设置都是通过点击项目右上角三个点-Go to settings这个方法进入，请记住。

{% endnote %}

~~*（为什么没有密码？算了不要SSH了）*~~

![1658900185108](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658900185108.png)

{% note info simple %}

一般首次打开这个的时候，它是不会告诉你密码的，点击右边的刷新键，再点击Issue，重置这些信息时它会告诉你一个只展示一次的密码，这时复制这个密码才能连接SSH

{% endnote %}

自带终端则是点击Run进入IDE后的终端，根据喜好选择。

# 安装宝塔面板

进入[宝塔官网](https://www.bt.cn/new/download.html)的下载区域，找到这个Linux脚本获取，复制Ubuntu/deepin安装脚本

![1658728272479](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658728272479.png)

即

```bash
wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

接下来静待宝塔面板安装，大约需要5-10分钟左右。

如果安装成功的话，它会告诉你默认的安全入口和账号密码。

![1658730089378](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658730089378.png)

宝塔的默认端口是8888，我们还要去给他映射到一个域名。

接下来进入设置，找到URL/Port，然后按照下面来添加一个*.run.goorm.io（免费版不能自定义），输入你想要的名字，Port改为宝塔的端口，选择右边的√即可。

![1658730207401](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658730207401.png)

然后访问这个域名，输入默认账号密码即可进入面板（以后要改），安全入口可以在面板里面修改。

## 修改宝塔的默认账号密码

在命令行中输入bt，选择对应操作按照提示修改即可。

![1658730497308](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/goormbaipiao/1658730497308.png)

# 服务条款限制

我看了一下Goorm的服务条款，相对来说问题不大，但是有几点要注意，不然会被封号，放出原文：

G. 会员的义务

1. 如果根据这些条款和条件要求会员向公司提供信息，则会员必须提供真实和合法的信息，并且他/她不会因提供虚假或非法信息而受到不利影响。
2. 会员应遵守本条款及本公司在服务中的通知，并对因违反或未能遵守本条款而造成的任何损失或损害负责。
3. 因会员疏忽管理其账户信息或同意第三方使用而造成的任何损失，由会员负责。
4. 会员有以下行为时，本公司可依据第N条限制使用服务，在此情况下会员应承担全部责任。如有必要，公司可通知相关政府机构或执法机构。
5. 通过冒充他人的个人信息、支付方式、外部账户等，或向第三方提供访问权限来使用服务
6. 注册虚假内容
7. 冒充公司的员工、经理和其他人
8. 更改公司发布的信息的行为
9. 未经授权收集其他会员的个人信息
10. 通过任何加工活动对服务进行复制、拆解或模仿或其他修改。
11. 通过超载公司的服务器来干扰公司的正常活动。
12. 侵犯知识产权，包括公司和其他第三方的版权
13. 损害公司和其他第三方的声誉或干扰他们的工作
14. 发布淫秽或暴力信息、视频、音频或其他违反道德的内容。
15. 未经本公司同意，将本服务用于营利、销售、广告、政治活动等
16. 传播可能导致计算机或信息设备故障的程序的行为，例如计算机病毒、黑客攻击和恶意软件。
17. 对本公司提供的横幅广告的任何删除、诽谤或其他破坏
18. 用于挖掘加密货币的行为妨碍稳定服务使用
19. 其他非法或不公平行为

说人话呢，就是不能拿这个服务器挖矿、运行高负载应用以及传播一些违法信息、进行违法活动（但是我没搞清楚它的法律是韩国法律还是本国（中国）法律）~~比如干一些涩事情~~。不然肯定会被封号。

好了，这次就到这里吧，总得来说，这个容器除了性能一般，有休眠，其余还好。下次会更新搭建goorm+宝塔MCSManger面板服以及Wordpress博客的教程。
