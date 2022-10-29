// 固定卡片点击动作
function FixedCardWidget(type,name,index){
    // 根据id或class选择元素
    if (type === "id"){
      var tempcard = document.getElementById(name);
    }
    else{
      var tempcard = document.getElementsByClassName(name)[index];
    }
    // 若元素存在
    if (tempcard) {
        // 首先判断是否存在fixed-card-widget类
        if (tempcard.className.indexOf('fixed-card-widget') > -1){
          // 存在则移除
          RemoveFixedCardWidget();
        }
        else{
          // 不存在则先初始化防止卡片叠加
          RemoveFixedCardWidget();
          //新建退出蒙版
          CreateQuitBox();
          // 再添加固定卡片样式
          tempcard.classList.add('fixed-card-widget');
        }
    }
  }
  //创建一个蒙版，作为退出键使用
  function CreateQuitBox(){
    var quitBox = `<div id="quit-box" onclick="RemoveFixedCardWidget()"></div>`
    var asideContent = document.getElementById('aside-content');
    asideContent.insertAdjacentHTML("beforebegin",quitBox)
  }
  // 移除卡片方法
  function RemoveFixedCardWidget(){
    var activedItems = document.querySelectorAll('.fixed-card-widget');
    if (activedItems) {
      for (i = 0; i < activedItems.length; i++) {
        activedItems[i].classList.remove('fixed-card-widget');
      }
    }
    //移除退出蒙版
    var quitBox = document.getElementById('quit-box');
    if (quitBox) quitBox.remove();
  }
  // 常规先初始化，确保切换页面后不会有固定卡片留存
  RemoveFixedCardWidget()