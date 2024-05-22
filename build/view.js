/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

const prev = document.querySelector(".post_slider_prev_btn");
const next = document.querySelector(".post_slider_next_btn");
const carousel = document.querySelector(".post_carousel_wrapper");
const track = document.querySelector(".front_posts_wrapper");
const items = document.querySelectorAll(".post_wrapper");
const sliderCount = Number(track.getAttribute("data-sliderCount"));
let width = carousel.offsetWidth;
let index = 0;
window.addEventListener("resize", function () {
  width = carousel.offsetWidth;
});
if (index === 0) {
  prev.setAttribute("disabled", true);
}
next.addEventListener("click", function (e) {
  e.preventDefault();
  index = index + 1;
  prev.removeAttribute("disabled");
  track.style.transform = "translateX(" + index * -width + "px)";
  if (sliderCount > items?.length - sliderCount * index) {
    next.setAttribute("disabled", true);
  }
  if (index === 0) {
    prev.setAttribute("disabled", true);
  }
});
prev.addEventListener("click", function () {
  index = index - 1;
  next.removeAttribute("disabled");
  if (index === 0) {
    prev.setAttribute("disabled", true);
  }
  track.style.transform = "translateX(" + index * -width + "px)";
});
/******/ })()
;
//# sourceMappingURL=view.js.map