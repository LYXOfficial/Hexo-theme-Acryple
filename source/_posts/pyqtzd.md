---
title: PyQt5-论如何让窗口置顶
tags:
  - Python
  - PyQt5
  - 编程
  - uClock
abbrlink: 5e2c4b67
date: 2022-09-01 17:11:14
categories: 编程
cover: https://bu.dusays.com/2022/09/01/6310801a177f7.webp
updated: 2022-10-04 08:50:19
---


这其实是一个远古的问题了，突然想起来就顺便分享一下吧

写uClock的时候为了让窗口右键直接控制窗口是否置顶，可没费过我不少心思：因为这玩意实在是太太太坑了，根本没搜索到什么解决方案，在1.0和1.1旧版中根本没有，1.2又因为折腾博客一直卡在dev版本鸽了~~(...)~~

置顶功能效果如下：

![20220901171505.gif](https://bu.dusays.com/2022/09/01/63107ef8efce4.gif)

这个置顶功能在我不断地试错之后做出来了，期间翻过大量的qt文档和csdn（就是懒得挂梯子

众所周知，可以通过设置WindowFlag的方式来控制显示后的窗口是否置顶，不过并不能在运行时实时控制：

```python
self.setWindowFlags(Qt.WindowStaysOnTopHint)
```

不过我想打破规则看看在运行时能不能使用这个方法

结果我发现在程序运行的时候直接调用这个方法运行的话，窗口会消失。

怎么办呢?

然后我尝试加了一句：

```python
self.show()
```

结果窗口果然就重新显示了：

![1662024864424.png](https://bu.dusays.com/2022/09/01/63107ca273f86.png)

然而现在的窗口状态很奇怪，有托盘，还有最小化关闭窗口图标，实际上是因为并没有继承之前的SplashScreen属性，所以直接继承上以前的窗口状态就好了：

```python
self.setWindowFlags(Qt.WindowStaysOnTopHint|self.windowFlags())
self.show()
```

此时窗口置顶的同时也能够继承以前的状态了。

![1662025524240.png](https://bu.dusays.com/2022/09/01/63107f363aa84.png)

取消置顶同理，从以前的`windowFlags`里面排除掉置顶部分，重新show就可以了
```python
self.setWindowFlags(self.windowFlags() & ~Qt.WindowStaysOnTopHint)
self.show()
```

如果要实现智能切换，只需要简单地加一点料，智能判断`windowFlags`即可：

```python
#置顶bug终于TM修复了！！！！！！！！！！！！！！！
def pin(self):
    if not (self.windowFlags() | Qt.WindowStaysOnTopHint) == self.windowFlags():
        self.setWindowFlags(Qt.WindowStaysOnTopHint|self.windowFlags())
        self.show()
    else:
        self.setWindowFlags(self.windowFlags() & ~Qt.WindowStaysOnTopHint)
        self.show()
```

然后你就可以将这个函数引用在你的程序里面实现智能临时置顶功能了！

_恭喜你解决了一个世纪难题！！！！！！！！！！_

最后打个广告，uClock开源，采用MIT协议，任意代码随便抄！

{% link LYXOfficial/uClock,Github,https://github.com/lyxofficial/uclock %}
