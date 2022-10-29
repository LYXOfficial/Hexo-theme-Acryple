---
title: 宝塔面板部署Apache服务器遇到的坑：Internal Server Error
tags:
  - 服务器
  - 避坑
  - 干货教程
  - 热门文章
  - 推荐文章
categories:
  - 避坑教程
cover: https://bu.dusays.com/2022/09/01/63103bb7690d6.webp
abbrlink: 61b9829e
date: 2022-07-25 15:05:21
updated: 2022-10-04 08:50:19
---

# 前言

小水一篇文章，这次错误非常离谱，网上根本就查不到。。。

用了几个小时失败多次，终于装好了LAMP环境，然鹅当我兴高采烈地部署好Wordpress时，却遇到了这个阴间的：

# Internal Server Error

重启多次都没用。然后我看了看日志，它报了好几次这样的错：

```apache
AH02613: Error loading /www/server/speed/httpd_speed.lua: /www/server/speed/httpd_speed.lua:7: module 'gzip' not found:\n\tno field package.preload['gzip']\n\tno file 
'/www/server/speed/gzip.lua'\n\tno file '/usr/local/share/lua/5.1/gzip.lua'\n\tno file '/usr/local/share/lua/5.1/gzip/init.lua'\n\tno file '/usr/local/lib/lua/5.1/gzip.lua'\n\tno file 
'/usr/local/lib/lua/5.1/gzip/init.lua'\n\tno file '/usr/share/lua/5.1/gzip.lua'\n\tno file '/usr/share/lua/5.1/gzip/init.lua'\n\tno file '/www/server/speed/gzip.so'\n\tno file 
'/usr/local/lib/lua/5.1/gzip.so'\n\tno file '/usr/lib/x86_64-linux-gnu/lua/5.1/gzip.so'\n\tno file '/usr/lib/lua/5.1/gzip.so'\n\tno file '/usr/local/lib/lua/5.1/loadall.so'
```

我想想。。。这段英文的意思大概是说。。。`/www/server/speed/httpd_speed.lua`这个文件出错了，没找到gzip模块~~（我不要gzip啊，有宝塔缓存还要什么gzip）~~，要不就不理她注释掉算了。

# 解决方法

找到这个文件并打开编辑

![1658733758693.png](https://bu.dusays.com/2022/09/03/6313755731b6b.png)

注释掉第七行的gzip，再重启服务器，就能正常使用了！

![1658733803055.png](https://bu.dusays.com/2022/09/03/63137592831e2.png)
