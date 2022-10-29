var gitalk = new Gitalk({
    clientID: 'e9c8a4c42b9bd57da9d9',
    clientSecret: '51b45e474eaf45a0b89f25e081da82a69fd47a09',
    repo: 'lyxofficial.github.io',
    owner: 'lyxofficial',
    admin: ['lyxofficial'],
    id: location.pathname,      // Ensure uniqueness and length less than 50
    distractionFreeMode: false  // Facebook-like distraction free mode
})
  
gitalk.render('gitalk-container')