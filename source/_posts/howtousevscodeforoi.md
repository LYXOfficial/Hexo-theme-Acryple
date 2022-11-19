---
title: '工欲善其事,必先利其器————论如何善用VSCode提高写OIの效率'
abbrlink: 5d71c71f
date: 2022-11-19 19:39:27
tags: 
- OI
categories:
- OI
cover: https://bu.dusays.com/2022/11/19/6378dc8f20485.jpg
---

（内心OS：好久没写过这种教程了(。・ω・。)）

众所周知，作为一个权威的认证/比赛机构，CCF的官方编辑器是我们熟知的DevC++。

这个编辑器非常的方便，她不用开项目，不用调配置，不用装编译器，以及她用50+M的安装包就能解决C++开发的优势使得CCF选择了她。

实际上呢，DevC++这玩意却是又落后又难用又难看，没有代码补全，用的还是远古的C++98标准。这与CSP/NOIP/NOI中使用的C++14极其不符，并且调试功能没法用会闪退，极大地降低了OIer们的~~水题冲校榜~~刷题速度，成为了饱受各位OIer们诟病的一个编辑器。

（实际上你也可以用小熊猫，但是没VSCode好看）

于是想到了大名鼎鼎的万能编辑器-VSCode，她支持几乎所有的编程语言：Arduino、Python、Java、C#、.NET、VB、JS等等，以及各种标记语言：HTML、CSS、YAML、Markdown，这东西真的很nb欸qwq。

不过VSCode毕竟是编辑器，配置比较困难，当然只要你弄好了，会非常好用。

# 配置环境

## 装Code

首先安装VSCode，VSCode的安装比较简单，只需要点击[这个链接](http://vscode.cdn.azure.cn/stable/6261075646f055b99068d3688932416f2346dd3b/VSCodeUserSetup-x64-1.73.1.exe)（官网的很慢这个是官方CDN），然后一路安装即可（建议选为所有用户安装）

新版VSCode安装好之后会自动提示装中文语言包，点击即可（我早就装了就没法给图了）

你也可以在左下角的功能栏改些主题啊什么的，也可以把同步开着。

![](https://bu.dusays.com/2022/11/19/6378c635344c0.png)

![](https://bu.dusays.com/2022/11/19/6378c64d365ac.png)

## 配置Mingw

实际上devcpp里面是可以扒到一个gcc的，但是毕竟是很老的版本，所以建议换成新版。

点击[该链接](https://nchc.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/x86_64-8.1.0-release-pos)下载Mingw8.1（新版10.0的安装方案很恶心且没必要用新版）

因为用的是NCHC台湾节点，所以速度稍慢，建议用IDM。

![](https://bu.dusays.com/2022/11/19/6378ce5b35355.png)

然后把压缩包解压，随便找个地方扔出去，然后复制这个链接+bin

e.g.`D:\mingw64\bin`

PS：用dev内置Mingw的路径是`{dev安装路径}\MinGW32(也可能是MinGW64看安装位数)\bin`

把她扔到环境变量（如下图里面）

![（地狱绘图qwq）](https://bu.dusays.com/2022/11/19/6378d1f5ec3f3.png)

然后进入VSCode的插件区安装C/C++扩展

![](https://bu.dusays.com/2022/11/19/6378d26e5e9a0.png)

新建一个文件夹

![](https://bu.dusays.com/2022/11/19/6378d4aa98236.png)

这时你就可以自由写代码了！

![](https://bu.dusays.com/2022/11/19/6378da256d5ec.png)

然后为了运行代码，需要安装一个Code runner

![](https://bu.dusays.com/2022/11/19/6378db21e5b27.png)

安装完之后用`Ctrl+Shift+P`进入面板，打开设置（json），添加：
```json
"code-runner.executorMap": {
    "c": "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    "cpp": "cd $dir && g++ -std=c++14 -o2 $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt", //契合CCF官方环境并开启O2优化
},
"code-runner.runInTerminal": true,
"code-runner.ignoreSelection": true
```

![](https://bu.dusays.com/2022/11/19/6378db8cec0e2.png)

（注意语法qwq）

然后单击右上角运行按钮快乐运行吧！

![](https://bu.dusays.com/2022/11/19/6378dc2a45a59.png)

未完待续咕咕咕。。。
