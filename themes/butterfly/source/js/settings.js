function setCookie(cname,cvalue)
{
  var d = new Date();
  d.setTime(d.getTime()+(11451*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
if(getCookie("blur")=="false"){
var blur=0;
document.getElementById("blur").checked=true;
}else{
    var blur=1;

}
if(getCookie("yjjs")=="true"){
    var yjjs=1;
    document.getElementById("yjjs").checked=true;
}else{
    var yjjs=0;
    
}
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
function setBlur(){
    blur=!blur;
    setCookie("blur",blur);
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
function yjjs1(){
    // yjjs=!yjjs;
    // setCookie("yjjs",yjjs)
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
if(getCookie("theme")=="acrylic"){
    document.getElementById("css").href=""
}
switchTheme=function(){
    if(document.getElementById("css").href==window.location.protocol+"//"+window.location.host+"/css/stylessimple.css"){
        document.getElementById("css").href=""
        setCookie("theme","acrylic");
    }else{
        document.getElementById("css").href="/css/stylessimple.css"
        setCookie("theme","simple");
    }
}
setColor=function(c){
    document.getElementById("themeColor").innerText=`:root{--lyx-theme:var(--lyx-${c})!important}`;
    setCookie("themeColor",c);
}

if(getCookie("themeColor")==""){
    setCookie("themeColor","pink");
}

setColor(getCookie("themeColor"));
$("#"+getCookie("themeColor")).attr("checked", true);