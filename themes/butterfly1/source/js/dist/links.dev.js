"use strict";

document.querySelector('.flink').insertAdjacentHTML('afterbegin', "<div id='friend1'></div>");
xkFriend.init({
  el: '#friend1',
  // 挂载容器
  api: ['https://kkfriend.vercel.app/', 'https://friend.kkfive.top/index.json'],
  // 你的json链接列表，可以是多个。
  loading_img: 'https://7.dusays.com/2021/03/04/d2d5e983e2961.gif',
  // 加载中的图片
  fail_img: 'https://file.acs.pw/picGo/2021/1/22/90331f043583fe472e59602f835cc28c.gif' // // 加载失败的图片

});