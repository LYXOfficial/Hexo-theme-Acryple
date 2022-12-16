function doStuff() {
    var flag=0;
    try{
        ap=aplayers[0];
        ap.list;
        flag=1;
    }catch{
        setTimeout(doStuff, 50);
        return;
    }
    if(flag){
        ap.list.add([{
            name: 'Grow Slowly',
            artist: '井口裕香',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Grow%20Slowly.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Grow%20Slowly.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Grow%20Slowly.lrc',
        },
        {
            name: '霜雪千年（Cover 洛天依 / 乐正绫）',
            artist: '双笙（陈元汐） / 封茗囧菌',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E9%9C%9C%E9%9B%AA%E5%8D%83%E5%B9%B4%EF%BC%88Cover%20%E6%B4%9B%E5%A4%A9%E4%BE%9D%20%20%E4%B9%90%E6%AD%A3%E7%BB%AB%EF%BC%89.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E9%9C%9C%E9%9B%AA%E5%8D%83%E5%B9%B4%EF%BC%88Cover%20%E6%B4%9B%E5%A4%A9%E4%BE%9D%20%20%E4%B9%90%E6%AD%A3%E7%BB%AB%EF%BC%89.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E9%9C%9C%E9%9B%AA%E5%8D%83%E5%B9%B4%EF%BC%88Cover%20%E6%B4%9B%E5%A4%A9%E4%BE%9D%20%20%E4%B9%90%E6%AD%A3%E7%BB%AB%EF%BC%89.lrc',
        },
        {
            name: '灯火里的中国 (舒楠监制 官方正式版)',
            artist: '张也 / 周深',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E7%81%AF%E7%81%AB%E9%87%8C%E7%9A%84%E4%B8%AD%E5%9B%BD%20%28%E8%88%92%E6%A5%A0%E7%9B%91%E5%88%B6%20%E5%AE%98%E6%96%B9%E6%AD%A3%E5%BC%8F%E7%89%88%29.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E7%81%AF%E7%81%AB%E9%87%8C%E7%9A%84%E4%B8%AD%E5%9B%BD%20%28%E8%88%92%E6%A5%A0%E7%9B%91%E5%88%B6%20%E5%AE%98%E6%96%B9%E6%AD%A3%E5%BC%8F%E7%89%88%29.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E7%81%AF%E7%81%AB%E9%87%8C%E7%9A%84%E4%B8%AD%E5%9B%BD%20%28%E8%88%92%E6%A5%A0%E7%9B%91%E5%88%B6%20%E5%AE%98%E6%96%B9%E6%AD%A3%E5%BC%8F%E7%89%88%29.lrc',
        },
        {
            name: 'Windows Welcome Music (Remix) (Remix)',
            artist: 'Sugar95',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Windows%20Welcome%20Music%20%28Remix%29%20%28Remix%29.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Windows%20Welcome%20Music%20%28Remix%29%20%28Remix%29.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Windows%20Welcome%20Music%20%28Remix%29%20%28Remix%29.lrc',
        },
        {
            name: 'Falling Again',
            artist: 'Nurko / Roniit',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Falling%20Again.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Falling%20Again.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Falling%20Again.lrc',
        },
        {
            name: '云女孩',
            artist: '符白牙 / lunari.io',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E4%BA%91%E5%A5%B3%E5%AD%A9.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E4%BA%91%E5%A5%B3%E5%AD%A9.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E4%BA%91%E5%A5%B3%E5%AD%A9.lrc',
        },
        {
            name: 'See You Again',
            artist: 'See You Again',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/See%20You%20Again.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/See%20You%20Again.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/See%20You%20Again.lrc',
        },
        {
            name: 'sister\'s noise',
            artist: 'fripSide',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/sister%27s%20noise.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/sister%27s%20noise.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/sister%27s%20noise.lrc',
        },
        {
            name: '心做し',
            artist: '一之瀬ユウ / GUMI',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E5%BF%83%E5%81%9A%E3%81%97.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E5%BF%83%E5%81%9A%E3%81%97.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E5%BF%83%E5%81%9A%E3%81%97.lrc',
        },
        {
            name: '君に嘘',
            artist: '湊貴大 / 初音ミク',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E5%90%9B%E3%81%AB%E5%98%98.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E5%90%9B%E3%81%AB%E5%98%98.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E5%90%9B%E3%81%AB%E5%98%98.lrc',
        },
        {
            name: '溯 (Reverse)',
            artist: 'CORSAK胡梦周 / 马吟吟',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E6%BA%AF%20%28Reverse%29.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E6%BA%AF%20%28Reverse%29.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E6%BA%AF%20%28Reverse%29.lrc',
        },
        {
            name: 'ふわふわ♪',
            artist: '牧野由依',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E3%81%B5%E3%82%8F%E3%81%B5%E3%82%8F%E2%99%AA.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E3%81%B5%E3%82%8F%E3%81%B5%E3%82%8F%E2%99%AA.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E3%81%B5%E3%82%8F%E3%81%B5%E3%82%8F%E2%99%AA.lrc',
        },
        {
            name: 'LEVEL5 -judgelight-',
            artist: 'fripSide',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/LEVEL5%20-judgelight-.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/LEVEL5%20-judgelight-.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/LEVEL5%20-judgelight-.lrc',
        },
        {
            name: '打上花火',
            artist: 'Daoko / 米津玄師',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.lrc',
        },
        {
            name: '勾指起誓',
            artist: '洛天依 / ilem',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E5%8B%BE%E6%8C%87%E8%B5%B7%E8%AA%93.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E5%8B%BE%E6%8C%87%E8%B5%B7%E8%AA%93.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E5%8B%BE%E6%8C%87%E8%B5%B7%E8%AA%93.lrc',
        },
        {
            name: '红莲华（《鬼灭之刃》动画OP）',
            artist: '池绛不吃姜',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E7%BA%A2%E8%8E%B2%E5%8D%8E%EF%BC%88%E3%80%8A%E9%AC%BC%E7%81%AD%E4%B9%8B%E5%88%83%E3%80%8B%E5%8A%A8%E7%94%BBOP%EF%BC%89.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E7%BA%A2%E8%8E%B2%E5%8D%8E%EF%BC%88%E3%80%8A%E9%AC%BC%E7%81%AD%E4%B9%8B%E5%88%83%E3%80%8B%E5%8A%A8%E7%94%BBOP%EF%BC%89.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E7%BA%A2%E8%8E%B2%E5%8D%8E%EF%BC%88%E3%80%8A%E9%AC%BC%E7%81%AD%E4%B9%8B%E5%88%83%E3%80%8B%E5%8A%A8%E7%94%BBOP%EF%BC%89.lrc',
        },
        {
            name: 'Lemon',
            artist: '是Wei呀',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Lemon.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Lemon.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Lemon.lrc',
        },
        {
            name: 'Alive',
            artist: 'ReoNa',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Alive.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Alive.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Alive.lrc',
        },
        {
            name: 'All in good time',
            artist: '川田まみ',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/All%20in%20good%20time.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/All%20in%20good%20time.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/All%20in%20good%20time.lrc',
        },
        {
            name: 'aLIEz (澤野弘之 LIVE[nZk]004 (2016/11/03@TOKYO DOME CITY HALL))',
            artist: '瑞葵(mizuki)',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/aLIEz%20%28%E6%BE%A4%E9%87%8E%E5%BC%98%E4%B9%8B%20LIVE%5BnZk%5D004%20%2820161103%40TOKYO%20DOME%20CITY%20HALL%29%29.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/aLIEz%20%28%E6%BE%A4%E9%87%8E%E5%BC%98%E4%B9%8B%20LIVE%5BnZk%5D004%20%2820161103%40TOKYO%20DOME%20CITY%20HALL%29%29.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/aLIEz%20%28%E6%BE%A4%E9%87%8E%E5%BC%98%E4%B9%8B%20LIVE%5BnZk%5D004%20%2820161103%40TOKYO%20DOME%20CITY%20HALL%29%29.lrc',
        },
        {
            name: 'only my railgun',
            artist: 'fripSide',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/only%20my%20railgun.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/only%20my%20railgun.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/only%20my%20railgun.lrc',
        },
        {
            name: '恋愛サーキュレーション',
            artist: '花澤香菜',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E6%81%8B%E6%84%9B%E3%82%B5%E3%83%BC%E3%82%AD%E3%83%A5%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E6%81%8B%E6%84%9B%E3%82%B5%E3%83%BC%E3%82%AD%E3%83%A5%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E6%81%8B%E6%84%9B%E3%82%B5%E3%83%BC%E3%82%AD%E3%83%A5%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3.lrc',
        },
        {
            name: '千本桜',
            artist: '黒うさP / 初音ミク',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E5%8D%83%E6%9C%AC%E6%A1%9C.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E5%8D%83%E6%9C%AC%E6%A1%9C.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E5%8D%83%E6%9C%AC%E6%A1%9C.lrc',
        },
        {
            name: '起风了',
            artist: '买辣椒也用券',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/%E8%B5%B7%E9%A3%8E%E4%BA%86.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/%E8%B5%B7%E9%A3%8E%E4%BA%86.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/%E8%B5%B7%E9%A3%8E%E4%BA%86.lrc',
        },
        {
            name: 'Heaven is a Place On Earth',
            artist: 'fripSide',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Heaven%20is%20a%20Place%20On%20Earth.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Heaven%20is%20a%20Place%20On%20Earth.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Heaven%20is%20a%20Place%20On%20Earth.lrc',
        },
        {
            name: 'とある日の午後',
            artist: 'Laqshe',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/とある日の午後.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/とある日の午後.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/とある日の午後.lrc',
        },
        {
            name: '群青',
            artist: 'YOASOBI',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/群青.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/群青.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/群青.lrc',
        },
        {
            name: 'WATER',
            artist: 'A-39 / 沙包P / 初音ミク',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/WATER.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/WATER.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/WATER.lrc',
        },
        {
            name: 'Minecraft',
            artist: 'C418',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Minecraft.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Minecraft.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Minecraft.lrc',
        },
        {
            name: 'Haggstrom',
            artist: 'C418',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/Haggstrom.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/Haggstrom.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/Haggstrom.lrc',
        },
        {
            name: '横竖撇点折',
            artist: '米白',
            url: 'https://npm.elemecdn.com/musiccdn-ariasaka/music/横竖撇点折.mp3',
            cover: 'https://npm.elemecdn.com/musiccdn-ariasaka/pic/横竖撇点折.jpg',
            lrc: 'https://npm.elemecdn.com/musiccdn-ariasaka/lyric/横竖撇点折.lrc',
        }
    ]);
        
        ap.list.remove(0);
        ap.lrc.hide();
        ap.setMode("normal");
        document.getElementsByClassName("aplayer-icon-menu")[0].click()
        if(localStorage.getItem("musicIndex")!=null){
            musicIndex = localStorage.getItem("musicIndex");
            ap.list.switch(musicIndex);
            //歌曲可以本地储存
        }
        if(sessionStorage.getItem("musicTime") != null){
            window.musict = sessionStorage.getItem("musicTime");
            ap.setMode(sessionStorage.getItem("musicMode"));
            if(sessionStorage.getItem("musicPaused")!='1'){
                ap.play();
            }
            var g=true;
            ap.on("canplay",function(){
                if(g){
                    ap.seek(window.musict);
                    g=false;
                }
            });
        }else{
            sessionStorage.setItem("musicPaused",1);
            ap.setMode("normal");
        }
        if(sessionStorage.getItem("musicVolume") != null){
            ap.audio.volume=Number(sessionStorage.getItem("musicVolume"));
        }
        ap.on("pause",function(){sessionStorage.setItem("musicPaused",1);ap.lrc.hide()});
        ap.on("play",function(){sessionStorage.setItem("musicPaused",0);ap.lrc.show()});
        ap.audio.onvolumechange=function(){sessionStorage.setItem("musicVolume",ap.audio.volume);};
        setInterval(function(){
            musicIndex = ap.list.index;
            musicTime = ap.audio.currentTime;
            localStorage.setItem("musicIndex",musicIndex);
            sessionStorage.setItem("musicTime",musicTime);
            sessionStorage.setItem("musicMode",ap.mode);
        },200);
    }
}
document.addEventListener('DOMContentLoaded', (e) => {
    doStuff();
})