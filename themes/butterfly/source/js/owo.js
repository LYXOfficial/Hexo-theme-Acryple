// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
function owoBig() {
    // 由于无法判断表情创建的时机，使用setInterval循环检测
    let t = setInterval(() => {
        let owo_body = document.querySelector('.OwO-body')
        if (owo_body) {
            // 计时器
            let owo_time = ''
            // 节流阀
            let flag = true;
            // 创建盒子
            let div = document.createElement('div')
            div.id = 'owo-big'
            document.querySelector('body').appendChild(div)

            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            owo_body.addEventListener('contextmenu', e => e.preventDefault())

            // 鼠标移入
            owo_body.addEventListener('mouseover', (e) => {
                if (e.target.tagName == 'IMG' && flag) {
                    flag = false
                    // 移入300毫秒后显示盒子
                    owo_time = setTimeout(() => {
                        div.style.display = 'flex'
                        div.style.left = (e.x - e.offsetX - 30) + 'px'
                        div.style.top = (e.y - e.offsetY - 130) + 'px'
                        div.innerHTML = `<img src="${e.target.src}">`
                    }, 300);
                }
            })

            // 鼠标移出
            owo_body.addEventListener('mouseout', (e) => {
                // 隐藏盒子
                div.style.display = 'none';
                flag = true
                // 取消计时
                clearTimeout(owo_time)
            })
            clearInterval(t)
        }
    }, 200);
}