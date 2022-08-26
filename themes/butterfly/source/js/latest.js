// 新代码

// // 确保其他页面第一个不添加
if (location.pathname == '/') newPost();

// // 最新文章
function newPost() {
    let ls = document.querySelectorAll('.recent-post-info')
    // 先让时间和索引值都等于第一个的
    let time = new Date(ls[0].querySelector('.post-meta-date-created').getAttribute('datetime')).getTime();
    let index = 0
    // 遍历数组，如果有时间比time大的则替换
    ls.forEach((i, num) => {
        let t = new Date(i.querySelector('.post-meta-date-created').getAttribute('datetime')).getTime()
        if (t > time) {
            time = t;
            index = num
        }
    })
    // 单数在右，双数在左
    // let className = index % 2 == 0 ? 'newPost-right' : 'newPost-left'
    // ls[index].innerHTML += '<span class="' + className + '">最 新</span>';
    // 如果你不想让其一左一右，可以注释上面的启用下面的
    ls[index].innerHTML += '<span class="newPost-left">最新</span>';
}


// 老代码
// // 确保其他页面第一个不添加
// if (location.pathname == '/') newPost();

// // 最新文章
// function newPost() {
//     // 获取此类名而不是获取recent-post-item是因为一些插件也会使用recent-post-item类。
//     // 所以获取recent-post-info可以确保每一篇都是文章。
//     let ls = document.querySelectorAll('.recent-post-info')
//     for (let i = 0; i < ls.length; i++) {
//         // 如果是置顶则跳过，所以如果你最新文章置顶的话就无法添加标志，只会给到置顶下面最新的文章。
//         // 不过一般来说置顶文章都会是早期文章，实在不行置顶之后再写一篇😂
//         if (ls[i].querySelector('.sticky')) continue;
//         let className = '';
//         // 封面在右则在左边添加，否则在右边
//         // 其实你也可以直接放在左边，我之所以这样弄是为了避免和分类图标冲突
//         if (ls[i].previousSibling.classList.contains('right')) className = 'newPost-left';
//         else className = 'newPost-right';
//         ls[i].innerHTML += '<span class="' + className + '">最 新</span>';
//         return
//     }
// }
