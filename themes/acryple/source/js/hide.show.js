function isInViewPortOfOne (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
$(window).scroll(function () {
    if(isInViewPortOfOne(document.getElementsByTagName("footer")[0])){
        $(".aplayer .aplayer-body").hide();
        $("#fps").hide();
    }   
    else{
        $(".aplayer .aplayer-body").show();
        $("#fps").show();
    }
})