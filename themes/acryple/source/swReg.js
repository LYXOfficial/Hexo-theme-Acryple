(async () => {//使用匿名函数确保body已载入
    /*
    ChenBlogHelper_Set 存储在LocalStorage中,用于指示sw安装状态
    0 或不存在 未安装
    1 已打断
    2 已安装
    3 已激活,并且已缓存必要的文件(此处未写出,无需理会)
    */
    const $ = document.querySelector.bind(document);//语法糖
    if ('serviceWorker' in navigator) { //如果支持sw
        if (Number(window.localStorage.getItem('ChenBlogHelper_Set')) < 1) {
            window.localStorage.setItem('ChenBlogHelper_Set', 1)
            window.stop()
            document.innerHTML=""
        }
        navigator.serviceWorker.register(`/sw.js?time=${Math.ceil(Math.random()*10000000000000000000)}`)//随机数,强制更新
            .then(async () => {
                if (Number(window.localStorage.getItem('ChenBlogHelper_Set')) < 2) {
                    setTimeout(() => {
                        window.localStorage.setItem('ChenBlogHelper_Set', 2)
                        //window.location.search = `?time=${ranN(1, 88888888888888888888)}` //已弃用,在等待500ms安装成功后直接刷新没有问题
                        window.location.reload()//刷新,以载入sw
                    }, 500)//安装后等待500ms使其激活
                }
            })
            .catch(err => console.error(`ChenBlogHelperError:${err}`))
    }
    
})()