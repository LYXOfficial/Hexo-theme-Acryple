---
title: 博客魔改日记（1）
date: 2022-10-05 17:35:57
tags:
categories:
---

---
在开始前，请先确保你已看此Hexo魔改系列前置教程，或者你是老司机：

{% link Hexo Butterfly博客魔改的一点点基础,LYXの小破站,https://yisous.xyz/posts/583ff077/ %}

# 前言

因为开学了嘛，学习任务比较重，所以以后的魔改都写成日记，大家自己根据实际情况修改，不做可用性保证。

( ´･･)ﾉ(._.`)

最近大家都看到我博客变了好多，我就把东西分享出来

# 彩色友链

相信大家都看到了，我的友链界面是彩色的，实现也不难

![1664962851812.png](https://bu.dusays.com/2022/10/05/633d5123aa3a2.png)

## 把友链改成外挂标签形式

只需要复制原来的友链yml，然后删除，新建一个与之前同名的page，然后编辑：
```yaml
{% flink %}
# 这里粘贴友链yml
{% endflink %}
```

重新渲染即可生效。

## 修改外挂标签js

修改`[blogRoot]\themes\butterfly\scripts\tag\flink.js`:

```js
/**
 * flink
 */

'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const flinkFn = (args, content) => {
  content = hexo.render.renderSync({ text: content, engine: 'yaml' })

  let result = ''

  content.forEach(i => {
    const className = i.class_name ? `<div class="flink-name">${i.class_name}</div>` : ''
    const classDesc = i.class_desc ? `<div class="flink-desc">${i.class_desc}</div>` : ''

    let listResult = ''

    i.link_list.forEach(j => {
      if(j.theme_color==undefined){
        j.theme_color="#383838"
      }
      listResult += `
          <div class="flink-list-item" style="background-color:${j.theme_color}">
            <a href="${j.link}" title="${j.name}" target="_blank">
              <div class="flink-item-icon">
                <img class="no-lightbox" src="${j.avatar}" onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img.flink)}"' alt="${j.name}" />
              </div>
              <div class="flink-item-name">${j.name}</div> 
              <div class="flink-item-desc" title="${j.descr}">${j.descr}</div>
            </a>
          </div>`
    })

    result += `${className}${classDesc} <div class="flink-list">${listResult}</div>`
  })

  return `<div class="flink">${result}</div>`
}

hexo.extend.tag.register('flink', flinkFn, { ends: true })

```

## 修改css

添加一些css，让友链变得更好看：

```css
#article-container .flink .flink-list {
    text-align: left!important;
}
.flink-item-name, .flink-item-desc {
    color: white!important;
}
```