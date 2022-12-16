// console.clear()
// window.onerror=()=>{
//     console.clear()
//     console.log(`Hexo-theme-Acryple based on Butterfly 4.2.2
    
//     欢迎访问本站！等了这么久总算等到你啦！
//     如果有功能喜欢的欢迎扒走，Github上面也已开源。
//     速度有点慢请见谅`)
//     }
//     setInterval(() => {
//         console.clear()
//     console.log(`Hexo-theme-Acryple based on Butterfly 4.2.2
    
//     欢迎访问本站！等了这么久总算等到你啦！
//     如果有功能喜欢的欢迎扒走，Github上面也已开源。
//     速度有点慢请见谅`)
//     }, 500);
document.querySelector('.home .category-list').onmousewheel = function(e){
    if(e.deltaY>=0){
    this.scrollLeft+=20;
    }else{
    this.scrollLeft-=20;
    }return false;}