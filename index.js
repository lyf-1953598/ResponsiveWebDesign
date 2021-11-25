

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
const backDropEl = document.querySelector(".backdrop");
const leftPartImage = document.querySelector(".home-about-left");
// 窗口滚动处理
//#region 固定导航

window.addEventListener("scroll", () => {
  // 固定导航
  let height = headerEl.getBoundingClientRect().height;
  if (window.pageYOffset - height >= (backDropEl.offsetHeight-80)) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // 显示返回顶部
  if (window.pageYOffset > 2 * backDropEl.offsetHeight) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }

  // if(window.pageYOffset >backDropEl.offsetHeight)
  // {
  //   leftPartImage.style.display="block";
    
  // }else{
  //   leftPartImage.style.display = "none";
  // }
  // if (window.pageYOffset - height >= backDropEl.offsetHeight) {
  //   if (!leftPartImage.classList.contains("fixOnLeft")) {
  //     leftPartImage.classList.add("fixOnLeft");
  //   } else {
  //     leftPartImage.classList.remove("fixOnLeft");
  //   }
  // }else{
  //   if (leftPartImage.classList.contains("fixOnLeft")) {
  //     leftPartImage.classList.remove("fixOnLeft");
  //   } else {
  //     leftPartImage.classList.add("fixOnLeft");
  //   }
  // }
});
//#endregion 固定导航

//#region 导航跟随变色部分
$(window).scroll(function () {
  //监听窗口滚动事件
  var scrollTop = $("html").scrollTop(); //获取当前位置到页面顶部的距离
  $("nav a").each(function (index, element) {
    //遍历导航栏选项
    if (
      $(element.hash).offset() &&
      scrollTop >= $(element.hash).offset().top - 300
    ) {
      //判断当前位置是否为导航栏对应区域
      $(this).css({
        color: "rgba(247, 150, 24, 0.555)",
        // "font-style": "solid"
      }); //将导航栏选项设置样式
      $(this).siblings().css({
        color: "black",
      });

      //将其他导航选项取消样式
    }
  });
});

//#endregion

//#region 视频播放部分
//播放以及取消按钮
// src=\"img/gb.png\"
$(".video-play").click(function () {
  $(".video-player").html(
    '<video id="video"  style=\'object-fit: contain;left: 25%;top: 50%;width:90vh; height:80vh;margin: 0; padding: 0;position: relative; transform: translate(-50%, -50%);\' src="videos/mainVideo.mp4"  controls="controls" autoplay="autoplay"></video>' +
      '<button onClick="close1()" class="vclose" src="images/cancel.png" style=\'position:relative;\'  />'
  );
  $(".video-player").show();
  $(".glide__arrow ").hide();
  $("body").css("overflow", "hidden");
});

function close1() {
  var v = document.getElementById("video"); //获取视频节点
  $(".video-player").hide(); //点击关闭按钮关闭暂停视频
  $(".glide__arrow ").show();
  v.pause();
  $(".video-player").html();
}

//播放
// function playVideo(){
//   var videoPLayEl = document.getElementsByClassName("video-play");
//   var player  = document.querySelector(".player");

//   document.querySelectorAll(".video-player").display = 'block';
//   player.display = 'block';
// }
//#endregion

//#region 轮播图部分
// 设置监听事件
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }),
    tarnslateY: [anime.stagger([40, 10]), 0],
  });
});

glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});

glide.mount();

//#endregion 轮播图部分

//#region 筛选图片
// const isotope = new Isotope(".cases", {
//   layoutMode: "fitRows",
//   itemSelector: ".case-item",
// });

// const filterBtns = document.querySelector(".filter-btns");

// filterBtns.addEventListener("click", (e) => {
//   let { target } = e;
//   const filterOption = target.getAttribute("data-filter");
//   if (filterOption) {
//     document
//       .querySelectorAll(".filter-btn.active")
//       .forEach((btn) => btn.classList.remove("active"));
//     target.classList.add("active");
//     isotope.arrange({ filter: filterOption });
//   }
// });
//#endregion

//#region 使图片淡入
const pageRightFadeIn = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "right",
};
ScrollReveal().reveal(".fade-in-right", { ...pageRightFadeIn });
const pageLeftFadeIn = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "left",
};
ScrollReveal().reveal(".fade-in-left", { ...pageLeftFadeIn });
//#endregion

// 滚动展示插件
// 通用动画配置，从底部50象素滑出来
const staggeringOption = {
  delay: 3000,
  distance: "50px",
  duration: 5000,
  easing: "ease-in",
  origin: "bottom",
};
// 滚动到业务流程时的展示动画，interval需要单独设置，每个feature元素相继350毫秒，下同
// ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
// ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });

// 数据部分
const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    // 在展示之前，加载anime动画，使数据从0增长到定义好的数值
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo",
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      dataSectionEl.getBoundingClientRect().bottom / 5
    }px)`;
  },
});
// 数据，背景视差滚动
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  // 如果在可见区域内
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      bottom / 5
    }px)`;
  }
});

//#region 实现响应式部分
/* ***** 响应式**** */

// 折叠按钮
const burgerEl = document.querySelector(".burger");
const nav = document.querySelector("header nav");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});

// 流畅滚动
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  // 自动计算固定导航的高度
  header: "header",
  // 偏移80象素
  offset: 80,
});

// 探索更多按钮的处理函数
const exploreBtnEl = document.querySelector(".explores");
exploreBtnEl.addEventListener("click", () => {
  scroll.animateScroll(document.querySelector("#about-us"));
});

// 折叠菜单打开时，如果点击了链接，则自动关闭全屏导航
document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});

//顶部导航栏不显示
window.onmousewheel = function () {
  if (window.scrollY > 1) {
    document.getElementById("navigate").style.display = "block";
    // $('.title').hide;
  } else {
    document.getElementById("navigate").style.display = "none";
  }
};
//#endregion

document.getElementsByTagName("scroll"),
  function () {
    var scrollTop = document.getElementsByTagName("scroll"); // 滚动条距离顶部的高度

    if (scrollTop <= 0) {
      document.getElementById("navigate").style.display = "none";
      // document.getElementsByClassName("title").style.display = "none"
      // document.getElementsByClassName("title").style.visibility = "hidden"
    }
    document.getElementById("navigate").style.display = "block";
  };

//js控制web页面滚动距离 鼠标滚轮移动距离控制 平滑滚动提高web页面体验感
// #region 控制web页面滚动距离 鼠标滚轮移动距离控制 平滑滚动提高web页面体验感
window.addEventListener("mousewheel", WheelGo, { passive: false });
var cur_index = -1;
var invoke = false;
list = [
  { ele: "glide" },
  { ele: "about-us" },
  { ele: "showcases" },
  { ele: "service" },
  { ele: "team-intro" },
  { ele: "data-section" },
  { ele: "company-activities" },
  // { ele: "footer-menus" },
];
list = initSrollPosition("body", list);

function initSrollPosition(ele, list) {
  var container = document.querySelector(ele);
  for (var i in list) {
    list[i].position = document.querySelector("." + list[i].ele).offsetTop- 80;
  }
  return list;
}

function stopDefault(e) {
  e.preventDefault();
  return false;
}

function WheelGo(e) {
  //判断当前所处位置

  var isDown = e.deltaY > 0 ? true : false;

  stopDefault(e);
  if (invoke) {
    return;
  }
  moveTo(isDown);
}
function moveTo(isDown) {
  var cur_state;
  if (isDown) {
    cur_index = cur_index >= list.length - 1 ? list.length - 1 : cur_index + 1;
    var cur_state = list[cur_index];
  } else {
    cur_index = cur_index <= 0 ? 0 : cur_index - 1;
    cur_state = list[cur_index];
  }

  console.log("invoke");

  invoke = true;

  window.scrollTo({ top: cur_state.position, left: 0, behavior: "smooth" });

  setTimeout(() => {
    invoke = false;
  }, 500);
}

// #endregion

new Action({
  title_item: $(".title"),
  item: $(".item-group"),
});


