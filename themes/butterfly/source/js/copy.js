document.body.oncopy = function(){Swal.fire({allowOutsideClick:false,type:'success',title: '复制成功,如转载请注明出处！',showConfirmButton: false,timer: 1000});};
document.onkeypress = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        Swal.fire({allowOutsideClick:false,type:'success',title: '已打开开发者模式，扒源请谨记GPL协议！',showConfirmButton: false,timer: 1000});
    }
}
document.onmousedown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        Swal.fire({allowOutsideClick:false,type:'success',title: '已打开开发者模式，扒源请谨记GPL协议！',showConfirmButton: false,timer: 1000});
    }
}
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        Swal.fire({allowOutsideClick:false,type:'success',title: '已打开开发者模式，扒源请谨记GPL协议！',showConfirmButton: false,timer: 1000});
    }
}
