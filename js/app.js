const navbar = document.querySelector('#nav');
const navHeightFix = document.querySelector('.nav-height-fix');
const navBtn = document.querySelector('#nav-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('#sidebar');
const dateYear = document.querySelector('.year');
const quicknav = document.querySelector('.quick-nav');
var height = window.innerHeight;
// add fixed class to navbar
window.addEventListener('scroll', function () {
  // if (window.pageYOffset >= 80) {
  //   navbar.classList.add('navbar-fixed');
  //   if (this.screen.width < 1280) {
  //     navHeightFix.style.height = '140px';
  //   } else {
  //     navHeightFix.style.height = '100px';
  //   }
  // } else {
  //   navbar.classList.remove('navbar-fixed');
  //   navHeightFix.style.height = '0px';
  // }
  if (window.pageYOffset > height / 2) {
    quicknav.classList.add('show-quicknav');
  } else {
    quicknav.classList.remove('show-quicknav');
  }
});

// show sidebar
navBtn.addEventListener('click', function () {
  sidebar.classList.add('show-sidebar');
});
closeBtn.addEventListener('click', function () {
  sidebar.classList.remove('show-sidebar');
});
// set year
dateYear.innerHTML = new Date().getFullYear();
// initialize wow animation
// new WOW().init();

//back trigger
