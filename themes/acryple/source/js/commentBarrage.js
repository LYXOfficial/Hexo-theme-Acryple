document.addEventListener('pjax:complete', startbarrage);
document.addEventListener('DOMContentLoaded', startbarrage);

function startbarrage(){
try{
clearInterval(timer);
document.querySelector('.comment-barrage').innerHTML="";
delete sw;
}catch(err){}
const commentBarrageConfig = {
	//浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
	lightColors:[
		['#ffffffaa!important','var(--lyx-black)'],
	],
	darkColors:[
		['#000a!important','var(--lyx-white)'],
	],
	//同时最多显示弹幕数
	maxBarrage: 1,
	//弹幕显示间隔时间，单位ms
	barrageTime: 3000,
	//twikoo部署地址（Vercel、私有部署），腾讯云的为环境ID
	twikooUrl: "https://tkapi.yisous.xyz",
	//token获取见前文
	accessToken: "1059857c25a2ce9fba9cff298f4f33ee",
	pageUrl: window.location.pathname,
	barrageTimer: [],
	barrageList: [],
	barrageIndex: 0,
	// 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api，可以不改以免出错
	noAvatarType: "retro",
	dom: document.querySelector('.comment-barrage'),
	//是否默认显示留言弹幕
	displayBarrage: true,
	//头像cdn，默认cravatar
	avatarCDN: "cravatar.cn",
}
function checkURL(URL){
	var str=URL;
	//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
	//下面的代码中应用了转义字符"\"输出一个字符"/"
	var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
	return true;
	}else{
	return false;
	}
	} 
function isInViewPortOfOne (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
if(location.href.indexOf("posts")!=-1||location.href.indexOf("posts")!=-1)
document.onscroll = function() {
	if(commentBarrageConfig.displayBarrage){
		if(isInViewPortOfOne(document.getElementById("post-comment"))){
			document.getElementsByClassName("barrageswiper")[0].style.transform="translateX(514px)";
			document.getElementsByClassName("barrageswiper")[0].style.opacity="0";
		}
		else{
			document.getElementsByClassName("barrageswiper")[0].style.transform="";
			document.getElementsByClassName("barrageswiper")[0].style.opacity="1";
		}
	}
  }
function initCommentBarrage(){
	
	var data = JSON.stringify({
		"event": "COMMENT_GET",
		"commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
		"url": commentBarrageConfig.pageUrl
	});
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function() {
		if(this.readyState === 4) {
			commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
			commentBarrageConfig.dom.innerHTML = '';
			for(commentBarrageConfig.barrageIndex=0;commentBarrageConfig.barrageIndex<commentBarrageConfig.barrageList.length;commentBarrageConfig.barrageIndex++){
				popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
			}
			kkksc03=new Swiper('.barrageswiper', {
				direction: "vertical",
				loop: true,
				mousewheel:true,
				autoplay: {
					delay: 3000,
					stopOnLastSlide: false,
					disableOnInteraction: false,
				},
			})
			kkksc03.el.onmouseover = function(){
				kkksc03.autoplay.stop();
			}
			kkksc03.el.onmouseout = function(){
				kkksc03.autoplay.start();
			}
		}
	});
	xhr.open("POST", commentBarrageConfig.twikooUrl);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(data);
	// timer=setInterval(()=>{
	// 	if(commentBarrageConfig.barrageList.length){
	// 		popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
	// 		commentBarrageConfig.barrageIndex += 1;
	// 		commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
	// 	}
	// 	if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
	// 		removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
	// 	}
	// },commentBarrageConfig.barrageTime)
	
}
function commentLinkFilter(data){
	data.sort((a,b)=>{
		return a.created - b.created;
	})
	let newData = [];
	data.forEach(item=>{
		newData.push(...getCommentReplies(item));
	});
	return newData;
}
function getCommentReplies(item){
	if(item.replies){
		let replies = [item];
		item.replies.forEach(item=>{
			replies.push(...getCommentReplies(item));
		})
		return replies;
	}else{
		return [];
	}
}
function popCommentBarrage(data){
	let barrage = document.createElement('div');
	let width = commentBarrageConfig.dom.clientWidth;
	let height = commentBarrageConfig.dom.clientHeight;
	barrage.className = 'comment-barrage-item'
	let ran = Math.floor(Math.random()*commentBarrageConfig.lightColors.length)
	document.getElementById("barragesColor").innerHTML=`[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;
	if(data.avatar!=undefined){
		if(data.link!=undefined){
			if(!checkURL(data.link)){
				data.link="http://"+data.link;
			}
			barrage.innerHTML = `
			<div class="barrageHead">
				<img class="barrageAvatar" src="${data.avatar}"/>
				<a href="${data.link}" class="barrageNick" target="_blank">${data.nick}</a>
				<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
			</div>
			`
		}
		else{
			barrage.innerHTML = `
			<div class="barrageHead">
				<img class="barrageAvatar" src="${data.avatar}"/>
				<div class="barrageNick">${data.nick}</div>
				<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
			</div>
			`
		}
	}
	else{
		if(data.link!=undefined){
			if(!checkURL(data.link)){
				data.link="http://"+data.link;
			}
			barrage.innerHTML = `
			<div class="barrageHead">
				<img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
				<a href="${data.link}" class="barrageNick" target="_blank">${data.nick}</a>
				<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
			</div>
			`
		}
		else{
			barrage.innerHTML = `
			<div class="barrageHead">
				<img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
				<div class="barrageNick">${data.nick}</div>
				<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
			</div>
			`
		}
	}
	barrageContent=document.createElement('a');
	barrageContent.className="barrageContent";
	barrageContent.href="#"+data.id;
	barrageContent.innerHTML=data.comment;
	barrage.appendChild(barrageContent);
	// commentBarrageConfig.barrageTimer.push(barrage);
	aswiper = document.createElement('div');
	aswiper.className="swiper-slide";
	// aswiper.setAttribute("data-swiper-slide-index","8")
	aswiper.setAttribute("style","height: 150px;");
	// aswiper.setAttribute("role","group")
	// aswiper.setAttribute("aria-label","9 / 19");
	aswiper.append(barrage);
	commentBarrageConfig.dom.append(aswiper);
}
switchCommentBarrage = function () {
	localStorage.setItem("isBarrageToggle",Number(!Number(localStorage.getItem("isBarrageToggle"))))
	if(!isInViewPortOfOne(document.getElementById("post-comment"))){
	commentBarrageConfig.displayBarrage=!(commentBarrageConfig.displayBarrage);
    let commentBarrage = document.querySelector('.comment-barrage');
    if (commentBarrage) {
        $(commentBarrage).fadeToggle()
    }
}

}
// $(".comment-barrage").hover(function(){
// 	clearInterval(timer);
// },function () {
// 	timer=setInterval(()=>{
// 		if(commentBarrageConfig.barrageList.length){
// 			popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
// 			commentBarrageConfig.barrageIndex += 1;
// 			commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
// 		}
// 		if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
// 			removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
// 		}
// 	},commentBarrageConfig.barrageTime)
// })
if(localStorage.getItem("isBarrageToggle")==undefined){
	localStorage.setItem("isBarrageToggle","0");
}else if(localStorage.getItem("isBarrageToggle")=="1"){
	localStorage.setItem("isBarrageToggle","0");
	switchCommentBarrage()
}
initCommentBarrage()
}