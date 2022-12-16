if(location.href.split('/')[location.href.split('/').length - 1]=="index.html"){
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("Trident")>-1||userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
var a=myBrowser();
if(a=="IE"){
    alert("IE已经停止支持！！！本博客不支持IE浏览器！！！推荐使用Chrome 100+或新版Edge。要强制浏览请再点5次");
    alert("本博客不支持IE浏览器！！！推荐使用Chrome 100+或新版Edge。要强制浏览请再点4次");
    alert("本博客不支持IE浏览器！！！推荐使用Chrome 100+或新版Edge。要强制浏览请再点3次");
    alert("本博客不支持IE浏览器！！！推荐使用Chrome 100+或新版Edge。要强制浏览请再点2次");
    alert("本博客不支持IE浏览器！！！推荐使用Chrome 100+或新版Edge。要强制浏览请再点1次");
    document.getElementById("loading-box").innerHTML=""
}
else if(a=="FF"){
    alert("本博客可能在FireFox浏览器上有少许兼容问题，推荐使用Chrome 100+或新版Edge。");
}
else if(a=="Opera"){
    alert("本博客可能可能在Opera浏览器上有少许兼容问题，推荐使用Chrome 100+或新版Edge。");
}}