---
title: GoormIDE封号原因分析以及解决办法
abbrlink: 3ee11b0f
cover: https://bu.dusays.com/2022/09/01/63103a66d8213.webp
tags:
  - 白嫖
  - 服务器
  - 干货教程
  - 推荐文章
  - goorm
categories:
  - 白嫖教程
swiper_index: 5
description: 白嫖Goorm的用户速看！紧急！
date: 2022-08-12 08:30:50
updated: 2022-10-04 08:50:19
---

{% note warning simple %}

在看本文章之前，请尽快登录后台备份你的网站数据库和文件夹并且备份到本地！你的账号随时有ban的可能！后面慢慢看都没关系。

{% endnote %}

今天一早起来本来要在Goorm上面研究MC服务器搭建的，看到可以用Rclone挂载Onedrive网盘，刚好前几天搞了一个E5 5T，准备搞一个放存档，结果下软件一直killed，然后宝塔ssh下一半突然连不上了，以为只是服务器出了小bug，结果刷新直接404了，然后我紧随着就收到了我被ban掉的邮件，好家伙，我以为我不会被封的，goorm这波直接在大气层。

![1660264550749](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/whygoormbanned/1660264550749.png)

先说明一下，我有1个大号2个小号，因为goorm只能同时运行一个容器而且一个容器的性能存储太差，就开了小号。

目前1号服务器在运行[typecho博客](https://tc.yisous.xyz)，我也把[hexo博客](https://vps.yisous.xyz)扔上去了，不过速度一般就没怎么考虑。

2号服务器运行着[Minecraft服务器](https://mc.yisous.xyz)和[OJ](https://oj.yisous.xyz)，这就是我今天被ban的那个小号的服务器。

3号运行着[短链服务](https://yisous.tk)和[论坛](https://bbs.yisous.xyz)。

所幸数据损失不大，因为数据前面全部丢了，2号vps的数据基本上没有，只有软件，1号的typecho本体和数据库已经备份，3号的短链服务和数据库也已经备份，随时可以跑路。

我去官网申请了解封（被ban之后登录就是），理由是用我一年级到初一上册学的散装英语（其实还行就是实际使用能力不够）写的

![1660265105243](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/whygoormbanned/1660265105243.png)![1660265116506](https://cdn1.tianli0.top/gh/LYXOfficial/LYXOfficial.github.io/image/whygoormbanned/1660265116506.png)

我是这样写的，大家可以照抄试试看看能不能解封（主要是看你被ban的时候在干什么，一定用英语或者韩文写（不会韩文就用英语就行了，你用中文多半给你永封，哪家公司不怕国人把他们薅爆啊））：

`i just download a package in web and install is for my develop,but i don't know now my account is banned.`

然后提交。因为今天是星期五，所以工作人员很快就解封了，大概只用了10分钟左右我就收到了解封邮件，赶紧进去备份了数据。

# 为什么被封号

现在研究一下为什么被封号吧，下一次小心一点。

Goorm的服务条款什么都没写，让你不要挖矿搞黄色违法对吧。

可是呢，我太天真了，Okteto还算老实，这个goorm呢就离谱了。它把封号原因写在了帮助文档的一个极其隐蔽的地方，我翻了很久帮助文档都没看到就离谱。

在邮件里面，官方说的原因是Malware detection，即恶意软件检测。

然后具体为什么被封号，在你封号登录的下方就有，就是那个What kind of program is blocked里面，我也放出链接，大家可以自己理解一下：

{% link I don't know why i am blocked - goorm,GoormIDE,https://help.goorm.io/en/goormide/18.faq/general/why-blocked %}

{% hideToggle 点击查看官网原文 %}

# I don't know why i am blocked.

If the following program is detected to run, you will be blocked about using goormIDE

| Program type               | Reason                                                               |
| -------------------------- | -------------------------------------------------------------------- |
| DDoS tool                  | Used in malicious acts                                               |
| DNS server                 | Used in malicious acts                                               |
| Exploit                    | Used in malicious acts                                               |
| Malicious mail sender      | Used in malicious acts                                               |
| Miner                      | Affects service operations adversely due to high computing resources |
| Scanner                    | Used in malicious acts                                               |
| Proxy server               | Affects service operations adversely due to high computing resources |
| Messenger                  | High compute and network resource consumption                        |
| File Uploader & Downloader | Affects service operations adversely due to high computing resources |
| Browser                    | Affects service operations adversely due to high computing resources |
| Cryptocurrency trading bot | Affects service operations adversely due to high computing resources |

{% endhideToggle %}

然后我结合机翻和自己的理解和英语能力大概翻译了以下这个表格

{% hideToggle 点击查看翻译内容 %}

# 我不知道我为什么被封号了

如果检测到以下程序正在运行，您将会被暂时封号并无法使用GoormIDE。

| 程序类型                                                               | 原因                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------ |
| DDoS攻击工具<br />~~（博主PS：这玩意性能太差了吧）~~                  | 用于恶意行为                                           |
| DNS服务器<br />~~（博主PS：谁会用这个垃圾玩意做解析啊，根本不可能）~~ | 用于恶意行为                                           |
| 利用漏洞<br />（博主PS：比如像是破解啥的）                             | 用于恶意行为                                           |
| 垃圾/恶意邮件发送服务<br />（博主PS：就是广告和骚扰）                  | 用于恶意行为                                           |
| 矿机                                                                   | 占用性能，影响正常服务运行                             |
| 扫描器<br />（博主：应该是处理图像的AI？搞不懂）                       | 用于恶意行为                                           |
| 代理服务器<br />（博主PS：科学上网所用，不可言喻之物）                 | 占用性能，影响正常服务运行（博主：自用不占啥性能的吧） |
| Messenger<br />（博主：邮件转发服务器还是说Messenger软件的机器人？）   | 高计算和网络资源消耗                                   |
| 下载文件和上传文件服务器                                               | 占用性能，影响正常服务运行                             |
| 浏览器<br />（博主：浏览器占什么性能?服务器或者说IDE当成浏览器用？）   | 高计算和网络资源消耗                                   |
| 加密货币交易机器人                                                     | 占用性能，影响正常服务运行                             |

{% endhideToggle %}

这个翻译也是够头疼，根据拾贰的推测来看，是因为Cloudflare Tunnel判断为代理服务器，不过我认为这个服务器顶多是个代理客户端而已，当时我正在下载deb包，wget被killed，我认为也很有可能是因为下载上传文件过多误识别的原因，cloudflare tunnel也不是不可能。

当然不太可能是搭服务器，不然goorm官方都支持开放端口自带wordpress也是离谱了。

Cloudflare Tunnel已经不建议搭建，尽量少下载上传文件，安装软件尽量使用git和apt。

# 如何解决

建议尽快备份文件和数据库，如果你也被封号了的话，就先申请解封，然后再看看。

建议尽早换用其它平台，不过目前没有找到其它的这么方便的免费vps了，你也可以搞信用卡去嫖aws/oracle/azure/gcp之类的，不过只有一年，还是建议买vps，免费的才是最贵的。

祝大家早日拥有一个适合自己的VPS！
