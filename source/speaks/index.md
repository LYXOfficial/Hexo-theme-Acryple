---
title: 说说
---
<!-- <script src="//cdn1.tianli0.top/npm/leancloud-storage@4.13.2/dist/av-min.js"></script>
<div id="lyxTalk"></div>

<script src="/js/lyxTalk.js"></script>
<link rel="stylesheet" src="/css/lyxTalk.css">
<script>
  const { Query, User } = AV;
document.title = '说说 | Ariasakaの小窝'; 
lyxTalk.init("IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
  "vG8s9ukVO5bgozEHzR923dew",
  'https://ivw3t1nj.lc-cn-n1-shared.com',
   1919810)
</script> -->
<!-- 存放哔哔的容器 -->
<div id="bbtalk"></div>
<!-- 引用 bbtalk -->
<script data-pjax="" src="/js/bbtalk.js">
  </script>
<script>
  function doSpeaks() {
  document.title = '说说 | Ariasakaの小窝'; 
bbtalk.init({
  appId: "",
  appKey: "",
  serverURLs: '',
  pageSize:1919810
})
}
  document.addEventListener('DOMContentLoaded', (e) => {
    doSpeaks();
})
document.addEventListener('pjax:complete', (e) => {
    doSpeaks();
})
  
</script>