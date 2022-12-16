
var evt = document.createEvent("HTMLEvents");
evt.initEvent("pjax:complete", false, false);
window.dispatchEvent(evt);
document.addEventListener('pjax:complete', (e) => {
    $("#setting-buttons").show();
})