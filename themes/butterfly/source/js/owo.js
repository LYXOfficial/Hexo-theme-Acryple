// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();

function owoBig() {
    // 监听dom插入
    document.getElementById('post-comment').addEventListener('DOMNodeInserted', (dom) => {
        // 如果有class且值为OwO-body
        if (dom.target.classList && dom.target.classList.value == 'OwO-body') {
            let owo_body = dom.target
            if (owo_body) {
                let owo_time = ''
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
                        flag = false;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let m = 4 // 设置倍数
                            let height = e.path[0].clientHeight * m // 盒子高
                            let width = e.path[0].clientWidth * m // 盒子宽
                            let left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2 // 盒子与屏幕左边距离
                            let top = e.y - e.offsetY // 盒子与屏幕顶部距离

                            div.style.height = height + 'px'
                            div.style.width = width + 'px'
                            div.style.left = left + 'px'
                            div.style.top = top + 'px'
                            div.style.display = 'flex'
                            div.innerHTML = `<img src="${e.target.src}">`
                        }, 100);
                    }
                })

                // 鼠标移出
                owo_body.addEventListener('mouseout', (e) => {
                    div.style.display = 'none';
                    flag = true
                    clearTimeout(owo_time)
                })
            }
        }
    });
}