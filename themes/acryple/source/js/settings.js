document.addEventListener('pjax:complete', tosetting);
document.addEventListener('DOMContentLoaded', tosetting);
function tosetting(){
$("#settingWindow").hide();
if(localStorage.getItem("blur")=="false"){
    blur=0;
    }else{
        blur=1;
    
    }
    if(localStorage.getItem("yjjs")=="true"){
        yjjs=1;
    }else{
        yjjs=0;
        
    }
    if(localStorage.getItem("fpson")==undefined){
        localStorage.setItem("fpson","1");
    }
if(!blur){
    document.getElementById("settingStyle").innerText=`
    *,*:not(.card-info)::before,*::after{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
setBlur=function(){
    blur=!blur;
    localStorage.setItem("blur",blur);
    if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
}
// if(yjjs){
//     document.getElementById("yjjs").innerText=`
//     *:not(#web_bg){
//         transform:translateZ(0);
//         backface-visibility: hidden
//     }`}
//     else{
//         document.getElementById("yjjs").innerText=``
//     }
yjjs1=function(){
    yjjs=!yjjs;
    localStorage.setItem("yjjs",yjjs)
    // if(yjjs){
    // document.getElementById("yjjs").innerText=`
    // *:not(#web_bg){
    //     transform:translateZ(0);
    //     backface-visibility: hidden
    // }`}
    // else{
    //     document.getElementById("yjjs").innerText=``
    // }
}
if(localStorage.getItem("blogTheme")=="acrylic"){
    document.getElementById("css").href="";
}
switchTheme=function(){
    if(document.getElementById("css").href==window.location.protocol+"//"+window.location.host+"/css/stylessimple.css"){
        document.getElementById("css").href=""
        localStorage.setItem("blogTheme","acrylic");
    }else{
        document.getElementById("css").href="/css/stylessimple.css"
        localStorage.setItem("blogTheme","simple");
    }
}
setColor=function(c){
    document.getElementById("themeColor").innerText=`:root{--lyx-theme:var(--lyx-${c})!important}`;
    localStorage.setItem("themeColor",c);

}
setFont=function(n){
    localStorage.setItem("font",n);
    if(n=="main"){
        var s=document.querySelectorAll("body,.wv-lt-location>a[data-v-4b9dcab4],.wv-lt-location>span[data-v-4b9dcab4],.wv-n-h-now-tmp>span[data-v-5f4c0628],.wv-n-h-now-txt>span[data-v-5f4c0628],.wv-n-h-now-rain>a[data-v-5f4c0628], .wv-n-h-now-rain>span[data-v-5f4c0628],.wv-f-forecast-date>a[data-v-66693262],.wv-f-a,.wv-lt-location>a[data-v-4b9dcab4],.wv-lt-location>span[data-v-4b9dcab4],.wv-n-h-now-tmp>span[data-v-5f4c0628],.wv-n-h-now-txt>span[data-v-5f4c0628],.wv-n-h-now-rain>a[data-v-5f4c0628], .wv-n-h-now-rain>span[data-v-5f4c0628],.wv-f-forecast-date>a[data-v-66693262],.wv-f-a,.aplayer")
        for(var i = 0; i <s.length; i++) {
            s[i].style.fontFamily="-apple-system, IBM Plex Mono ,monospace,'微软雅黑', sans-serif"
        }
    }
    else if(n=="HYPailou"){
        var s=document.querySelectorAll("body,.wv-lt-location>a[data-v-4b9dcab4],.wv-lt-location>span[data-v-4b9dcab4],.wv-n-h-now-tmp>span[data-v-5f4c0628],.wv-n-h-now-txt>span[data-v-5f4c0628],.wv-n-h-now-rain>a[data-v-5f4c0628], .wv-n-h-now-rain>span[data-v-5f4c0628],.wv-f-forecast-date>a[data-v-66693262],.wv-f-a,.wv-lt-location>a[data-v-4b9dcab4],.wv-lt-location>span[data-v-4b9dcab4],.wv-n-h-now-tmp>span[data-v-5f4c0628],.wv-n-h-now-txt>span[data-v-5f4c0628],.wv-n-h-now-rain>a[data-v-5f4c0628], .wv-n-h-now-rain>span[data-v-5f4c0628],.wv-f-forecast-date>a[data-v-66693262],.wv-f-a,.aplayer")
        for(var i = 0; i <s.length; i++) {
            s[i].style.fontFamily="Fredoka,HYPailou,KyoukashoProL,-apple-system, IBM Plex Mono ,monospace,'微软雅黑', sans-serif"
        }
    }
    else{
        var s=document.querySelectorAll("body,.wv-lt-location>a[data-v-4b9dcab4],.wv-lt-location>span[data-v-4b9dcab4],.wv-n-h-now-tmp>span[data-v-5f4c0628],.wv-n-h-now-txt>span[data-v-5f4c0628],.wv-n-h-now-rain>a[data-v-5f4c0628], .wv-n-h-now-rain>span[data-v-5f4c0628],.wv-f-forecast-date>a[data-v-66693262],.wv-f-a,.wv-lt-location>a[data-v-4b9dcab4],.wv-lt-location>span[data-v-4b9dcab4],.wv-n-h-now-tmp>span[data-v-5f4c0628],.wv-n-h-now-txt>span[data-v-5f4c0628],.wv-n-h-now-rain>a[data-v-5f4c0628], .wv-n-h-now-rain>span[data-v-5f4c0628],.wv-f-forecast-date>a[data-v-66693262],.wv-f-a,.aplayer")
        for(var i = 0; i <s.length; i++) {
            s[i].style.fontFamily="var(--global-font),KyoukashoProL,-apple-system, IBM Plex Mono ,monosapce,\"微软雅黑\", sans-serif"
        }
        document.body.style.fontFamily="var(--global-font),KyoukashoProL,-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif"
        document.documentElement.style.setProperty('--global-font', n)
    }
}
if(localStorage.getItem("themeColor")==undefined){
    localStorage.setItem("themeColor","pink");
}

setColor(localStorage.getItem("themeColor"));



if(localStorage.getItem("hideRightside")==undefined){
    localStorage.setItem("hideRightside","0");
}

if(localStorage.getItem("hideRightside")=="1"){
    $("#rightside").toggle()
}
toggleRightside=function(){
    $("#rightside").toggle();
    localStorage.setItem("hideRightside",Math.abs(Number(localStorage.getItem("hideRightside"))-1))
}
if(localStorage.getItem("font")==undefined){
    localStorage.setItem("font","HYTMR")
}
setFont(localStorage.getItem("font"))
// 存数据
// name：命名 data：数据
saveData=function(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
loadData=function(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}
// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
changeBg=function(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}
// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }



fpssw=function(){
    if(localStorage.getItem("fpson")=="1"){
        localStorage.setItem("fpson","0");
    }else{
        localStorage.setItem("fpson","1");
    }
}
$(".asetting").hide();
$('#backer').hide();
$("#"+localStorage.getItem("themeColor")).attr("checked", true);
if(localStorage.getItem("blur")=="false"){
    document.getElementById("blur").checked=true;
}
if(localStorage.getItem("yjjs")=="true"){
    document.getElementById("yjjs").checked=true;
}
if(localStorage.getItem("fpson")=="1"){
    document.getElementById("fpson").checked=true;
}


if(localStorage.getItem("sakurahide")=="false"){
    document.getElementById("hideSakura").checked=true;
    isSakura=1;
}
else if(localStorage.getItem("sakurahide")==null){
    localStorage.setItem("sakurahide","false");
    document.getElementById("hideSakura").checked=true;
    isSakura=1;
}
else{
    setTimeout(
    stopp,1000);
    isSakura=0;
}
if(localStorage.getItem("aplayerhide")=="false"){
    document.getElementById("hideAplayer").checked=true;
}
else if(localStorage.getItem("aplayerhide")==null){
    localStorage.setItem("aplayerhide","false");
    document.getElementById("hideAplayer").checked=true;
}
else{
    doStuff=function() {
        flag=0;
        try{
            ap=aplayers[0];
            ap.list;
            flag=1;
        }catch{
            setTimeout(doStuff, 50);
            return;
        }
        if(flag){
            $(".aplayer-fixed").hide()
        }
    }
    doStuff();
    
}

document.getElementsByClassName("reSettings")[0].onclick=function(){
    localStorage.clear()
    window.location.reload()
}

toggleWinbox=function(){
    $("#settingWindow").fadeToggle();
    if(document.getElementById("settingWindow").style.display!="none"){
        document.getElementById("settingWindow").style.display="flex";
    }
}
fullScreen=function() {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen();
}
toggleAside=function(){
    const $htmlDom = document.documentElement.classList
      $htmlDom.contains('hide-aside')
        ? saveToLocal.set('aside-status', 'show', 2)
        : saveToLocal.set('aside-status', 'hide', 2)
      $htmlDom.toggle('hide-aside')
}
toggleAplayer=function(){
    $(".aplayer-fixed").toggle()
    if(localStorage.getItem("aplayerhide")=="true"){
        localStorage.setItem("aplayerhide",false);
    }
    else{
        localStorage.setItem("aplayerhide",true);
    }
}
// position = $(window).scrollTop();
// $(window).scroll(function () {

//     scroll = $(window).scrollTop();
  
//     if (scroll > position) {
//       document.getElementsByTagName("header")[0].style.transform="translateY(58px)";
//     } else {
  
  
//         document.getElementsByTagName("header")[0].style.transform="";
  
//     }
  
//     position = scroll;
//   });
toggleSakuras=function(){
    isSakura=!isSakura;
    stopp(isSakura);
    if(localStorage.getItem("sakurahide")=="true"){
        localStorage.setItem("sakurahide",false);
    }
    else{
        localStorage.setItem("sakurahide",true);
    }
}
switchAside=function(){
    if(left){
        document.getElementById("aside-content").classList.add("right");
        document.querySelector(".layout > div:first-child").classList.add("left");
        localStorage.setItem("leftAside","false");
    }
    else{
        document.getElementById("aside-content").className="aside-content";
        document.querySelector(".layout > div:first-child").className="";
        try{
        document.querySelector("#recent-posts").className="recent-posts";
    }catch(err){}localStorage.setItem("leftAside","true");}
    left=!left;
}
left=1;
if(localStorage.getItem("leftAside")=="true"||localStorage.getItem("leftAside")==null){
    
}else{
    switchAside();
}
if(localStorage.getItem("autoTheme")=="true"){
    document.getElementById("autoTheme").checked=true;
    $("#con-mode,.rightMenu-item:has(.fa-moon)").hide();
    var time=new Date();
        if(time.getHours()<=7||time.getHours()>=19){
            activateDarkMode()
            localStorage.removeItem("theme");
        }
        else{
            activateLightMode()
            localStorage.removeItem("theme");
        }
}
if(location.href.indexOf('posts')!=-1){
    var xhr = new XMLHttpRequest();
    var url = document.querySelector('#page-header').style.backgroundImage.split('url("')[1].split('")')[0];
    xhr.open("GET","https://apis.yisous.xyz/api/imageColor?imgurl="+url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState===4) {
            if(xhr.status===200) {
                document.getElementById("themeColor").innerText=`:root{--lyx-theme:${xhr.responseText}!important}`;
            }
        }
    }
}
toggleAutoTheme=()=>{
    if(localStorage.getItem("autoTheme")=="true"){
        localStorage.setItem("autoTheme","false");
        $("#con-mode,.rightMenu-item:has(.fa-moon)").show();
    }
    else{
        localStorage.setItem("autoTheme","true");
        var time=new Date();
        if(time.getHours()<=7||time.getHours()>=19){
            activateDarkMode()
            localStorage.removeItem("theme");
        }
        else{
            activateLightMode()
            localStorage.removeItem("theme");
        }
        $("#con-mode,.rightMenu-item:has(.fa-moon)").hide();
    }
}
}