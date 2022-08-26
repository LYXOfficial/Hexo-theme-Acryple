hexo.extend.generator.register('random', function (locals) {
    const config = hexo.config.random || {}
    const posts = []
    for (const post of locals.posts.data) {
        if (post.random !== false) posts.push(post.path)
    }
    return {
        path: config.path || '/js/random.js',
        data: `var posts=${JSON.stringify(posts)};function toRandomPost(){window.open('/'+posts[Math.floor(Math.random() * posts.length)],"_self");};`
    }
})