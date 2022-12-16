// //这里可以定义弹幕的背景色与字体色
// const danmakuColors = [
// 	['#0008','white']
// ]
// //这两个是与随机位置的范围相关的
// const maxdanmakuWidth = 150;
// const maxdanmakuHeight = 100;
// //每个弹幕的间隔时间
// const danmakuTime = 1000;
// //我用的是Vercel部署，这里链接就是Vercel的链接，腾讯云的自己琢磨一下哈，应该也差不多
// const twikooUrl = "https://tkapi.yisous.xyz";
// //token要手动获取（反正我是开发者工具里获取的，教程在下面
// const accessToken = "1059857c25a2ce9fba9cff298f4f33ee";
// const pageUrl = "/messageboard/"

// //同屏密度限制
// const maxdanmaku=25;

// const danmakuTimer = [];
// let danmakuList = [];
// let danmakuIndex = 0;

// function getStyle(obj,name){
//     if(window.getComputedStyle){
//         return getComputedStyle(obj,null)[name];
//     }else{
//         return obj.currentStyle[name];
//     }
// }

// const danmakuDom = document.getElementById('danmaku-container');
// window.addEventListener('load',()=>{

// 	var data = JSON.stringify({
// 	  "event": "COMMENT_GET",
// 	  "accessToken": accessToken,
// 	  "url": pageUrl
// 	});

// 	var xhr = new XMLHttpRequest();
// 	xhr.withCredentials = true;

// 	xhr.addEventListener("readystatechange", function() {
// 	  if(this.readyState === 4) {
// 		danmakuList = linkFilter(JSON.parse(this.responseText).data);
// 		danmakuDom.innerHTML = '';
// 	  }
// 	});

// 	xhr.open("POST", twikooUrl);
// 	xhr.setRequestHeader("Content-Type", "application/json");

// 	xhr.send(data);

// 	setInterval(()=>{
// 		if(danmakuList.length){
// 			popdanmaku(danmakuList[danmakuIndex]);
// 			danmakuIndex += 1;
// 			danmakuIndex %= danmakuList.length;
// 		}

// 		if(danmakuTimer.length > (danmakuList.length > maxdanmaku?maxdanmaku:danmakuList.length)){
// 			removedanmaku(danmakuTimer.shift())
// 		}
// 	},danmakuTime)
// })





// function toggleDanmaku(){
// 	$("#danmaku-container").toggle()
// }
// function linkFilter(data){
// 	const newData = data.filter((comment)=>{
// 		return !comment.master;
// 	})
// 	return newData;
// }
// function popdanmaku(data){
// 	let danmaku = document.createElement('div');
// 	let width = danmakuDom.clientWidth;
// 	let height = danmakuDom.clientHeight;
// 	danmaku.className = 'danmaku'
// 	danmaku.style.top = Math.floor(Math.random()*(height - maxdanmakuHeight))+'px';
// 	danmaku.style.left = width+'px';
// 	let ran = Math.floor(Math.random()*danmakuColors.length)
// 	danmaku.style.background = danmakuColors[ran][0];
// 	danmaku.style.color = danmakuColors[ran][1];
// 	danmaku.innerHTML = `
// 		<div class="danmakuHead">
// 			<div class="danmakuNick">${data.nick}</div>
// 			<img class="danmakuAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}"/>
// 		</div>
// 		<div class="danmakuContent">${data.comment}</div>
// 	`
// 	danmakuTimer.push(danmaku);
// 	danmakuDom.append(danmaku);
// 	setTimeout(()=>{
// 	danmaku.style.left=-(danmaku.clientWidth*3+500).toString()+"px";
// 	setTimeout(()=>{
// 		danmaku.style.left=-(danmaku.clientWidth*3+500).toString()+"px";
// 	},15000)
// },50)
// }