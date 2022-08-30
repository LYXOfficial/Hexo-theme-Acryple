if(localStorage.getItem("blur")=="false"){
var blur=0;
document.getElementById("blur").checked=true;
}else{
    var blur=1;

}
if(localStorage.getItem("yjjs")=="true"){
    var yjjs=1;
    document.getElementById("yjjs").checked=true;
}else{
    var yjjs=0;
    
}
if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
function setBlur(){
    blur=!blur;
    localStorage.setItem("blur",blur);
    if(!blur){
    document.getElementById("settingStyle").innerText=`
    *{
        -webkit-backdrop-filter: none!important;
        backdrop-filter: none!important;
        -webkit-filter: none!important;
        filter: none!important;
    }`}
    else{
        document.getElementById("settingStyle").innerText=''
    }
}
// if(yjjs){
//     document.getElementById("yjjs").innerText=`
//     *:not(#web_bg){
//         transform:translateZ(0);
//         backface-visibility: hidden
//     }`}
//     else{
//         document.getElementById("yjjs").innerText=``
//     }
function yjjs1(){
    // yjjs=!yjjs;
    // localStorage.setItem("yjjs",yjjs)
    // if(yjjs){
    // document.getElementById("yjjs").innerText=`
    // *:not(#web_bg){
    //     transform:translateZ(0);
    //     backface-visibility: hidden
    // }`}
    // else{
    //     document.getElementById("yjjs").innerText=``
    // }
}
if(localStorage.getItem("theme")=="acrylic"){
    document.getElementById("css").href=""
}
switchTheme=function(){
    if(document.getElementById("css").href==window.location.protocol+"//"+window.location.host+"/css/stylessimple.css"){
        document.getElementById("css").href=""
        localStorage.setItem("theme","acrylic");
    }else{
        document.getElementById("css").href="/css/stylessimple.css"
        localStorage.setItem("theme","simple");
    }
}
setColor=function(c){
    document.getElementById("themeColor").innerText=`:root{--lyx-theme:var(--lyx-${c})!important}`;
    localStorage.setItem("themeColor",c);

}

if(localStorage.getItem("themeColor")==undefined){
    localStorage.setItem("themeColor","pink");
}

setColor(localStorage.getItem("themeColor"));
$("#"+localStorage.getItem("themeColor")).attr("checked", true);


if(localStorage.getItem("hideRightside")==undefined){
    localStorage.setItem("hideRightside","0");
}

if(localStorage.getItem("hideRightside")=="1"){
    $("#rightside").toggle()
    document.getElementById("hideAside").checked=true;
}
function toggleRightside(){
    $("#rightside").toggle();
    localStorage.setItem("hideRightside",Math.abs(Number(localStorage.getItem("hideRightside"))-1))
}
document.getElementsByClassName("reSettings")[0].onclick=function(){
    localStorage.clear()
    window.location.reload()
}













// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "博客设置",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5'
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div class="settings" style="display: block;"><a class="reSettings">恢复默认设置</a>
    <p></p>
    <h2 class="content-head">性能设置</h2>
    <p></p>
    <div class="content" style="display:flex"><input type="checkbox" id="blur" onclick="setBlur()">
        <div class="content-text">禁用模糊效果</div>
    </div>
    <div class="content" style="display:flex"><input type="checkbox" id="yjjs" onclick="yjjs1()"
            value="onrightMenurightMenu">
        <div class="content-text">硬件加速</div>
    </div>
    <p></p>
    <h2 class="content-head">主题设置</h2>
    <p></p>
    <div class="content" style="display:flex"><button class="content-button"
            onclick="switchTheme()">切换主题</button><br><input type="checkbox" id="hideAside" onclick="toggleRightside()">
        <div class="content-text">隐藏侧边栏</div>
    </div>
    <h3 class="content-head">&nbsp;&nbsp;主题色</h3>
    <p></p>
    <div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
            onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
            onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
            onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
            onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
            onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
            onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
            onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
            onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
            onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
            onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
            onclick="setColor('blackgray')"></div>
    <p></p>
    <p></p>
    <p></p>
</div>
    <h2 style="margin-left:10px">背景设置</h2>
    <div id="article-container" style="padding:20px;">
    <h3 id="图片（手机）"><a href="#图片（手机）" class="headerlink" title="图片（手机）"></a>图片（手机）</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4d539a5.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d4e15c9d.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6f22c03c6.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d56c83eb.webp)')"></a>   
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)" class="pimgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d50b439b.webp)')"></a>   

    </div>
    
    <h3 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5574d0e.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d529adf9.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d6d5159b31.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d6d5159b31.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d718bbeef6.webp)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f237d19.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72f2032c8.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72f2032c8.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2021/12/01/7792ff0082ec4.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2021/12/01/7792ff0082ec4.jpg)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ee6d4f3.png)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)" class="imgbox" onclick="changeBg('url(https://bu.dusays.com/2022/08/30/630d72ed76532.jpg)')"></a>
    </div>
    
    
    
    <h3 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(25deg, #31354b, #38536c, #3b738e, #3995b2)" onclick="changeBg('inear-gradient(25deg, #31354b, #38536c, #3b738e, #3995b2)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)" onclick="changeBg('linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)" onclick="changeBg('linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)')"></a>

    </div>
    
    <h3 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h3>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a> 
    </div>
    </br>注意:切换背景功能仅在Acrylic主题中生效，在Simple主题中无效
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:var(--lyx-theme);display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
`;
}

// 适应窗口大小
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();

}