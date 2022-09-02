if (localStorage.getItem("popWelcomeWindow") != "0") {
    if(document.referrer==undefined){
        Snackbar.show({
            pos: "top-right",
            showAction: false,
            text: `欢迎访问本站！`
        })
    }else{
    Snackbar.show({
        pos: "top-right",
        showAction: false,
        text: `欢迎来自${document.referer.split("/")[2]}的童鞋访问本站！`
    })
    localStorage.setItem("popWelcomeWindow", "0");
}
}
if (sessionStorage.getItem("popCookieWindow") != "0") {
    setTimeout(function () {
        Snackbar.show({
            text: '本站使用Cookie和本地/会话存储保证浏览体验和网站统计',
            pos: 'bottom-right',
            actionText: "查看博客声明",
            onActionClick: function (element) {
                window.open("/license")
            },
        })
    }, 3000)
}
sessionStorage.setItem("popCookieWindow", "0");
const { Query, User } = AV;
AV.init({
    appId:"IvW3T1NjMoh7OmKEdAz1tM0o-gzGzoHsz",
    appKey:"vG8s9ukVO5bgozEHzR923dew",
    serverURL:"https://ivw3t1nj.lc-cn-n1-shared.com"
})
// const query3 = new AV.Query('referers');
// query3.equalTo('url',document.referrer.split("/")[2]);
// query3.find().then((counts) => {
//   console.log(counts[0]["count"]);
// });