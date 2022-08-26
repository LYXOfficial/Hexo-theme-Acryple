// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const AV = require('leancloud-storage');
const { Query, User } = AV;
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
console.log(count);
$(".shuoshuo").hover(function(){
	clearInterval(timer);
},function () {
        timer=setInterval(()=>{
            document.getElementsByClassName("shuoshuo")[0].innerHTML=speaks[count%speaks.length];
            count++;
            console.log(count);
        },5000)
})
}
