document.oncopy = function () {
    Snackbar.show({
        text: '复制成功,如转载请注明出处！',
        pos: 'top-right',
        onActionClick: function (element) {
            window.open("/license")
        },
        actionText: "查看博客声明",
    });
};
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        Snackbar.show({
            text: '已打开开发者模式，扒源请谨记GPL协议！',
            pos: 'top-right',
            onActionClick: function (element) {
                window.open("/license")
            },
            actionText: "查看博客声明",
        });
    }
}
if(sessionStorage.getItem("popWelcomeWindow")!=0){
Snackbar.show({
    text: '欢迎访问本站！',
    pos: 'top-right',
    showAction: false
});
setTimeout(function(){Snackbar.show({
    text: '本站使用Cookie和本地/会话存储保证浏览体验和网站统计',
    pos: 'bottom-right',
    showAction: false,
})},3000)}
sessionStorage.setItem("popWelcomeWindow","0");
