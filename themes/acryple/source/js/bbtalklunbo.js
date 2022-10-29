
AV.init({
    appId: "IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
    appKey: "vG8s9ukVO5bgozEHzR923dew",
    serverURL: "https://ivw3t1nj.lc-cn-n1-shared.com"
});
var speaks=[];
const query = new AV.Query('content');
query.find().then((talks) => {
    for(i=talks.length-1;i>=0;i--){
        speaks.push(talks[i]["attributes"]["content"]);
    }
    
});
window.onload=function(){
var count=0;
document.getElementsByClassName("shuoshuo")[0].innerHTML=speaks[count%speaks.length];
    count++;
setInterval(()=>{
    document.getElementsByClassName("shuoshuo")[0].innerHTML=speaks[count%speaks.length];
    count++;
},5000)
}
