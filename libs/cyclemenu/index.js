$(document).ready(function () {
  var pclickNum = 0;
  var clickNum = 0;

  /**
   * 导航栏点击事件
   */
  $(".nav-wrap").on("click", function () {
    if (clickNum == 0) {
      clickNum++;
      $(this).addClass("nav-active"); //旋转导航块
      $(".tab-wrap").addClass("tab-active"); //收缩选项卡
      $(".tab-wrap div").removeClass("show-plist"); //收缩选项卡
    } else {
      clickNum = 0;
      $(this).removeClass("nav-active");
      $(".tab-wrap").removeClass("tab-active");
      // $(".tab-wrap div").css("transition","0.4s ease-in");
      $(".tab-wrap div").addClass("show-plist");
      // $(".tab-wrap p").css("display","none");
    }
  });

  /**
   * 选项卡点击事件
   */

  //   $(".tab-content>.tab-wrap p:nth-child(3)").click(function () {
  //     if (pclickNum == 0) {
  //       pclickNum++;
  //       console.log(1);
  //       $(".city").stop(true).show();
  //     } else {
  //       pclickNum = 0;
  //       console.log(0);
  //       $(".city").stop(true).hide();
  //     }
  //   });

  var btns = document.getElementsByClassName("fa-style"); //获取内容盒子
  var contents = document.getElementsByClassName("test");

  for (var i = 0; i < btns.length; i++) {
    btns[i].index = i;
    btns[i].onclick = function () {
      if (pclickNum == 0) {
        pclickNum++;
        console.log(contents[this.index].style.display);
        contents[this.index].style.display = "block";
      } else {
        console.log();
        if (contents[this.index].style.display == "block") {
          console.log(contents[this.index].style.display);
          contents[this.index].style.display = "none";
          pclickNum = 0;
        } else {
          for (j = 0; j < contents.length; j++) {
            contents[j].style.display = "none";
          }
          contents[this.index].style.display = "block";
        }
      }
    };

    //需要做的事： 当某个按钮点击后，如果之前处于未点击状态即 pclickNum=0，
    //则将对应展示并pclickNum=1，show一个组件
    //如果之前处于点击状态，判断
    //如果之前点击的和本次是同一按钮，及hide一个组件 pclickNum=0
    //如果之前点击的和本次不同，则hide之前的组件并开启目前的组件，pclickNum=1
    //   for (var j = 0; j < btns.length; j++) {
    //     //需要做的事，第一个有技术
    //   }
    //   this.className = this.className + " active";
    //   contents[this.index].className = contents[this.index].className + " show";
  }
});
