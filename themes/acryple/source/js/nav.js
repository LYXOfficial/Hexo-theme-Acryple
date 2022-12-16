document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
function tonav(){
document.getElementById("name-container").setAttribute("style", "display:none");

var position = $(window).scrollTop();

$(window).scroll(function () {

  var scroll = $(window).scrollTop();

  if (scroll > position) {


    document.getElementById("name-container").setAttribute("style", "");
    document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");

  } else {


    document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
    document.getElementById("name-container").setAttribute("style", "display:none");

  }

  position = scroll;

});

document.getElementById("page-name").innerText = document.title.split(" | Ariasakaの小窝")[0];}