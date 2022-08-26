//这里可以定义弹幕的背景色与字体色
const barrageColors = [
	['#0008','white']
]
//这两个是与随机位置的范围相关的
const maxBarrageWidth = 150;
const maxBarrageHeight = 100;
//每个弹幕的间隔时间
const barrageTime = 1000;
//我用的是Vercel部署，这里链接就是Vercel的链接，腾讯云的自己琢磨一下哈，应该也差不多
const twikooUrl = "https://tkapi.yisous.xyz";
//token要手动获取（反正我是开发者工具里获取的，教程在下面
const accessToken = "1059857c25a2ce9fba9cff298f4f33ee";
const pageUrl = "/messageboard/"


const barrageTimer = [];
let barrageList = [];
let barrageIndex = 0;


const barrageDom = document.getElementById('barrage-container');
window.addEventListener('load',()=>{

	var data = JSON.stringify({
	  "event": "COMMENT_GET",
	  "accessToken": accessToken,
	  "url": pageUrl
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
		barrageList = linkFilter(JSON.parse(this.responseText).data);
		barrageDom.innerHTML = '';
	  }
	});

	xhr.open("POST", twikooUrl);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);

	setInterval(()=>{
		if(barrageList.length){
			popBarrage(barrageList[barrageIndex]);
			barrageIndex += 1;
			barrageIndex %= barrageList.length;
		}

		if(barrageTimer.length > (barrageList.length > maxBarrage?maxBarrage:barrageList.length)){
			removeBarrage(barrageTimer.shift())
		}
	},barrageTime)
})






function linkFilter(data){
	const newData = data.filter((comment)=>{
		return !comment.master;
	})
	return newData;
}
function popBarrage(data){
	let barrage = document.createElement('div');
	let width = barrageDom.clientWidth;
	let height = barrageDom.clientHeight;
	barrage.className = 'barrage'
	barrage.style.top = Math.floor(Math.random()*(height - maxBarrageHeight))+'px';
	barrage.style.left = width+'px';
	let ran = Math.floor(Math.random()*barrageColors.length)
	barrage.style.background = barrageColors[ran][0];
	barrage.style.color = barrageColors[ran][1];

	barrage.innerHTML = `
		<div class="barrageHead">
			<div class="barrageNick">${data.nick}</div>
			<img class="barrageAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}"/>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
	barrageTimer.push(barrage);
	barrageDom.append(barrage);
	setTimeout(()=>{
	barrage.style.left=-(barrage.clientWidth*2+500).toString()+"px";
	
	setTimeout(()=>{
		barrage.style.left=-(barrage.clientWidth*2+500).toString()+"px";
		removeBarrage(barrage);
	},15000)
},50)
}
function removeBarrage(barrage){
	barrage.className = 'barrage out';
	setTimeout(()=>{
		barrageDom.removeChild(barrage);
	},1000)
}
