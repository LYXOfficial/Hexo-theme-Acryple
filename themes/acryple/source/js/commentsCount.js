// 更新的晚了一点，因为我发现如果不存起来的话会导致每进一次页面就重新获取一次，所以我们把它给存到本地。10分钟获取一次（当然，可以自定义时长）
function comCount() {
    let d = loadData('comCount', 10) // 10为10分钟获取一次，可自定义时长
    if (d) document.querySelectorAll('.card_comment').forEach(i => { i.innerHTML = d; })
    else {
        fetch('https://tkapi.yisous.xyz/', { // 此处更换url
            method: "POST",
            body: JSON.stringify({
                "event": "COMMENT_GET_FOR_ADMIN",
                "accessToken": "1059857c25a2ce9fba9cff298f4f33ee", // 此处更换accessToken
                "per": 1,
                "page": 1,
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(data => {
            document.querySelectorAll('.card_comment').forEach(i => { i.innerHTML = data.count; })
            document.getElementsByClassName("card_comment").innerText=data.count;
            saveData('comCount', data.count)
        })
    }
}

// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 下面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let data = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0
    let t = 0
    if (data != null) t = Date.now() - data.time
    if (t < time * 60 * 1000 && t > 0) return data.data;
    // 没过期返回数据
    return 0;
}

window.addEventListener("pjax:complete",comCount)
window.addEventListener("DOMContentLoaded",comCount)
