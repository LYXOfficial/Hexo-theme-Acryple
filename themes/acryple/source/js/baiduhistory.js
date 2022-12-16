document.addEventListener('pjax:complete', tohist);
document.addEventListener('DOMContentLoaded', tohist);
function tohist(){
if(document.getElementById('history-container')){
    function append(parent, text) {
        if (typeof text === 'string') {
            var temp = document.createElement('div');
            temp.innerHTML = text;
            // 防止元素太多 进行提速
            var frag = document.createDocumentFragment();
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            parent.appendChild(frag);
        }
        else {
            parent.appendChild(text);
        }
    }

    function history_get_data(){
        var myDate = new Date();
        var myMonth = myDate.getMonth() + 1;
        if (myMonth < 10) {
            getMonth = "0" + String(myMonth);
        } else {
            getMonth = String(myMonth);
        }
        var getDate = String(myDate.getDate());
        if (getDate < 10) {
            getDate = "0" + String(getDate);
        } else {
            getDate = String(getDate);
        }
        var getMonthDate = "S" + getMonth + getDate;
        return ["https://cdn1.tianli0.top/gh/Zfour/Butterfly-card-history@latest/baiduhistory/json/" + getMonth + ".json",getMonthDate]
    }
    var history_data = history_get_data()
    fetch(history_data[0]).then(data=>data.json()).then(data=>{
        console.log(data[history_data[1]])
        html_item =''
        for (var item of data[history_data[1]]){
            html_item += '<div class="swiper-slide history_slide"><span class="history_slide_time">A.D.' +
                item.year +'</span>' + '<span class="history_slide_link">'+ item.title +'</span></div>'

        }
        var history_container_wrapper = document.getElementById('history_container_wrapper')
        append(history_container_wrapper, html_item);
        var swiper_history = new Swiper('.history_swiper-container', {
            passiveListeners:true,
            spaceBetween: 30,
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 30,
                slideShadows: false,
            },
            loop: true,
            direction: 'vertical',
            autoplay: {
                disableOnInteraction: true,
                delay:5000
            },

            mousewheel:false,
            // autoHeight: true,

        });

        var history_comtainer = document.getElementById('history-container');
        history_comtainer.onmouseenter = function () {
            swiper_history.autoplay.stop();
        };
        history_comtainer.onmouseleave = function () {
            swiper_history.autoplay.start();
        }
    })}}