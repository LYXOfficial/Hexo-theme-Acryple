
document.getElementById("name-container").setAttribute("style","display:none");

var scrollFunc = function (e) {
    var e = e || window.event;
    if (e.wheelDelta) {
      if (e.wheelDelta > 0) { //当鼠标滚轮向上滚动时
        document.getElementsByClassName("menus_items")[1].setAttribute("style","");
        document.getElementById("name-container").setAttribute("style","display:none");
      }
      if (e.wheelDelta < 0) { //当鼠标滚轮向下滚动时
        document.getElementById("name-container").setAttribute("style","");
        document.getElementsByClassName("menus_items")[1].setAttribute("style","display:none!important");
      }
    } else if (e.detail) {
      if (e.detail < 0) { //当鼠标滚轮向上滚动时
        document.getElementsByClassName("menus_items")[1].setAttribute("style","");
        document.getElementById("name-container").setAttribute("style","display:none");
      }
      if (e.detail > 0) { //当鼠标滚轮向下滚动时
        document.getElementById("name-container").setAttribute("style","");
        document.getElementsByClassName("menus_items")[1].setAttribute("style","display:none!important");
      }
    }
  }
  // 给页面绑定鼠标滚轮事件,针对火狐的非标准事件 
  window.addEventListener("DOMMouseScroll", scrollFunc) // 给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
  window.addEventListener("wheel", scrollFunc)  

document.getElementById("page-name").innerText=document.title.split(" | LYXの小破站")[0];
