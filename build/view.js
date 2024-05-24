/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
const prev = document.querySelector(".post_slider_prev_btn");
const next = document.querySelector(".post_slider_next_btn");
const carousel = document.querySelector(".post_carousel_wrapper");
const track = document.querySelector(".front_posts_wrapper");
const items = document.querySelectorAll(".post_wrapper");
const sliderCount = Number(track.getAttribute("data-sliderCount"));
let width = carousel.offsetWidth;
let index = 0;
let isPressed = false;
let cursorX;
window.addEventListener("resize", function () {
  width = carousel.offsetWidth;
});
if (index === 0) {
  prev.setAttribute("disabled", true);
}
function nextPhase() {
  index = index + 1;
  prev.removeAttribute("disabled");
  track.style.left = "" + index * -width + "px";
  if (sliderCount > items?.length - sliderCount * index) {
    next.setAttribute("disabled", true);
  }
  if (index === 0) {
    prev.setAttribute("disabled", true);
  }
}
function prevPhase() {
  index = index - 1;
  next.removeAttribute("disabled");
  if (index === 0) {
    prev.setAttribute("disabled", true);
  }
  track.style.left = "" + index * -width + "px";
}
next.addEventListener("click", function () {
  nextPhase();
});
prev.addEventListener("click", function () {
  prevPhase();
});
document.body.addEventListener("keydown", function (e) {
  var code = e.keyCode;
  if (code == 39 && sliderCount < items?.length - sliderCount * index) {
    nextPhase();
  }
  if (code == 37 && index !== 0) {
    prevPhase();
  }
}, false);
track.addEventListener("mousedown", e => {
  isPressed = true;
  cursorX = e.offsetX - track.offsetLeft;
  track.style.cursor = "grabbing";
});
track.addEventListener("mouseup", () => {
  track.style.cursor = "grab";
});
window.addEventListener("mouseup", () => {
  isPressed = false;
});
track.addEventListener("mousemove", e => {
  if (!isPressed) return;
  e.preventDefault();
  if (window.innerWidth <= 767) {
    track.style.left = `${Number(e.offsetX) - Number(cursorX)}px`;
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map