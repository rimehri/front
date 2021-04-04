
  var dropdownContent = document.querySelector('.dropdown-content');
  var productsButton = document.querySelector('.link_text');
  var box = document.getElementById('dropdown-content');
  document.getElementById('productButton').addEventListener('click', function (e) {
      dropdownContent.classList.toggle('active');
  })
  document.getElementById('main').addEventListener('click', function (e) {
      dropdownContent.classList.remove('active');
  })
function init_carousel() {
$(document).ready(function () {
$("#owl-presse").owlCarousel({
items: 6,
loop: false,
responsive: {
0: {
  items: 2,
},
768: {
  items: 4,
},
991: {
  items: 6,
}
}
})
});
}

var dom_loaded = false;
var scripts_loaded = false;
document.addEventListener("DOMContentLoaded", function () {
dom_loaded = true;

if (scripts_loaded) {
init_carousel();
}
});

function init_aos() {
AOS.init();
}
function end_init() {
scripts_loaded = true;

if (dom_loaded) {
init_carousel();
}
}

function load_bs() {
bootstrap_script = document.createElement("script");
bootstrap_script.setAttribute("src", "/assets/portal_static/dist/bootstrap-4.5.3/js/bootstrap.min.f20fa8b102f2.js");
bootstrap_script.setAttribute("onload", "end_init()")
document.body.appendChild(bootstrap_script);

}
function load_owl() {
owl_script = document.createElement("script");
owl_script.setAttribute("src", "/assets/portal_static/dist/js/owl.carousel.min.f416f9031fef.js");
owl_script.setAttribute("onload", "load_bs()");
document.body.appendChild(owl_script);
}
function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for (var i = 0; i < ca.length; i++) {
var c = ca[i];
while (c.charAt(0) == ' ') {
c = c.substring(1);
}
if (c.indexOf(name) == 0) {
return c.substring(name.length, c.length);
}
}
return "";
}

window.addEventListener('load', function initialize() {
var session = getCookie("gbusersession");
var session_status = "visitor";
var session_userid = null;
if (session != "") {
session_status = session.split("|")[0];
if (session_status != "visitor") {
session_userid = session.split("|")[1];
document.getElementById("login_button").innerHTML = "MES APPS";
}
}
window.dataLayer = window.dataLayer || [];
if (session_userid != null) {
dataLayer.push({ "userStatus": session_status, "userId": session_userid });
} else {
dataLayer.push({ "userStatus": session_status });
}
window.removeEventListener('load', initialize);
});

(function (w, d, s, l, i) {
w[l] = w[l] || []; w[l].push({
'gtm.start':
new Date().getTime(), event: 'gtm.js'
}); var f = d.getElementsByTagName(s)[0],
j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
'../www.googletagmanager.com/gtm5445.html?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-5M43XL6');</script> <script>
document.addEventListener("DOMContentLoaded", function () {
var lazyBackgrounds = [].slice.call(document.querySelectorAll(".background_support"));

if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
entries.forEach(function (entry) {
  if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      lazyBackgroundObserver.unobserve(entry.target);
  }
});
});

lazyBackgrounds.forEach(function (lazyBackground) {
lazyBackgroundObserver.observe(lazyBackground);
});
}
});


function addClassToElements(elements, classToAdd) {
for (var elem of elements) {
elem.classList.add(classToAdd);
}
}

function removeClassToElements(elements, classToRemove) {
for (var elem of elements) {
elem.classList.remove(classToRemove);
}
}

var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
function scrollTop() {
return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;;
}

var scroll = scrollTop();
var navHeight = document.getElementsByClassName('navbar-container')[0].offsetHeight;

function onwindowScroll() {
if (window.matchMedia("(max-width: 767px)").matches) {
addClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
}
if (window.matchMedia("(min-width: 768px)").matches) {
removeClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button'), 'scroll');
}
var scrolled = scrollTop();
if (scrolled > navHeight) {
addClassToElements(document.getElementsByClassName('navbar-container'), 'animate');
addClassToElements(document.getElementsByClassName('bandeau'), 'animate');
addClassToElements(document.getElementsByClassName('lang_bandeau'), 'animate');
document.getElementById("dropdown-content").classList.remove('active');
if (document.getElementById('bandeau').classList.contains('displayed')) {
document.getElementsByClassName('burger-menu-content')[0].style.marginTop = "55px";
}
if (window.matchMedia("(max-width: 768px) and (min-width: 480)").matches && document.getElementById('bandeau').classList.contains('displayed')) {
document.getElementsByClassName('burger-menu-content')[0].style.marginTop = "55px !important";
}
} else {
removeClassToElements(document.getElementsByClassName('navbar-container'), 'animate');
removeClassToElements(document.getElementsByClassName('bandeau'), 'animate');
removeClassToElements(document.getElementsByClassName('lang_bandeau'), 'animate');
if (document.getElementById('bandeau').classList.contains('displayed')) {
document.getElementsByClassName('burger-menu-content')[0].style.marginTop = "110px";
}
if (window.matchMedia("(max-width: 479px)").matches && document.getElementById('bandeau').classList.contains('displayed')) {
document.getElementsByClassName('burger-menu-content')[0].style.marginTop = "166px";
}
}

addClassToElements(document.getElementsByClassName(''), '');
removeClassToElements(document.getElementsByClassName(''), '');

if (scrolled > scroll) {
removeClassToElements(document.getElementsByClassName('navbar-container'), 'sticky');
removeClassToElements(document.getElementsByClassName('lang_bandeau'), 'sticky');
removeClassToElements(document.getElementsByClassName('link_text_button_login'), 'sticky');
removeClassToElements(document.getElementsByClassName('link_text_button'), 'sticky');
removeClassToElements(document.getElementsByClassName('link_text_button_shop'), 'sticky');
} else {
addClassToElements(document.getElementsByClassName('navbar-container'), 'sticky');
addClassToElements(document.getElementsByClassName('lang_bandeau'), 'sticky');
addClassToElements(document.getElementsByClassName('link_text_button_login'), 'sticky');
addClassToElements(document.getElementsByClassName('link_text_button'), 'sticky');
addClassToElements(document.getElementsByClassName('link_text_button_shop'), 'sticky');
if (window.matchMedia("(max-width: 499px)").matches) {
addClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
addClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button'), 'scroll');
}
if (window.matchMedia("(max-width: 767px)").matches && window.matchMedia("(min-width: 500px)").matches) {
addClassToElements(document.getElementsByClassName('link_text_button'), 'scroll');
addClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
}
if (window.matchMedia("(min-width: 768px)").matches) {
removeClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button'), 'scoll');
}
}
if (scrolled < navHeight) {
removeClassToElements(document.getElementsByClassName('navbar-container'), 'sticky');
removeClassToElements(document.getElementsByClassName('link_text_button_login'), 'sticky');
removeClassToElements(document.getElementsByClassName('link_text_button'), 'sticky');
removeClassToElements(document.getElementsByClassName('link_text_button_shop'), 'sticky');
if (window.matchMedia("(max-width: 767px)").matches) {
removeClassToElements(document.getElementsByClassName('link_text_button'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
}
if (window.matchMedia("(max-width: 499px)").matches) {
removeClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_button'), 'scroll');
removeClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
}
}
if (document.getElementById("burger").classList.contains('active') && scrolled > navHeight) {
addClassToElements(document.getElementsByClassName('navbar-container'), 'sticky');
addClassToElements(document.getElementsByClassName('lang_bandeau'), 'sticky');
addClassToElements(document.getElementsByClassName('link_text_button_login'), 'sticky');
addClassToElements(document.getElementsByClassName('link_text_button'), 'sticky');
addClassToElements(document.getElementsByClassName('link_text_button_shop'), 'sticky');
if (window.matchMedia("(max-width: 499px)").matches) {
addClassToElements(document.getElementsByClassName('link_text_button_phone'), 'scroll');
addClassToElements(document.getElementsByClassName('link_text_login'), 'scroll');
}
}
scroll = scrollTop();
}
window.addEventListener("scroll", onwindowScroll);

var burger = document.querySelector('.burger');
var burgermenu = document.querySelector('.burger-menu');
var langmenu = document.querySelector('.dropdown-languages-container');
var langm = document.querySelector('.dropdown-lang-menu');
var burgerlist = document.querySelector('.burger-list');
var bodyactive = document.querySelector('body-active');
var langma = document.getElementById('.dropdown-lang-menu');
var burger_content = document.getElementById('burger-menu-content');
var goodbarber = document.getElementById('goodbarber-logo');
var goodbarberlogo = document.getElementById('goodbarber-logo-home');
var goodbarberlogogradiant = document.getElementById('goodbarber-logo-home-gradiant');
var loadburger = document.getElementById('loadburger');

window.addEventListener('load', function initialize() {
loadburger.style.display = "block";
burgermenu.style.display = "block";
window.removeEventListener('load', initialize);
})
document.getElementById('burger').addEventListener("click", function (e) {
loadburger.style.display = "block";
burger.classList.toggle('active');
burgermenu.classList.toggle('active');
langmenu.classList.toggle('active');
burgerlist.classList.toggle('right');
langm.classList.remove('active');
if (goodbarber.style.visibility == 'visible') {
loadburger.style.display = "block";
goodbarber.style.visibility = "hidden";
goodbarber.style.backgroundColor = "transparent";
burger_content.style.visibility = "hidden";
burger_content.style.backgroundColor = "transparent";
burger_content.style.borderRight = "1px solid transparent"
goodbarberlogo.style.visibility = "visible";
goodbarberlogogradiant.style.visibility = "hidden";

} else {
goodbarber.style.visibility = 'visible';
goodbarber.style.backgroundColor = "white";
burger_content.style.visibility = "visible";
burger_content.style.backgroundColor = "white";
burger_content.style.borderRight = "1px solid rgb(212, 212, 212)";
burgerlist.style.visibility = "visible";
goodbarberlogo.style.visibility = "hidden";
goodbarberlogogradiant.style.visibility = "visible";
if (document.getElementsByClassName('bandeau')[0].classList.contains('animate') && document.getElementById('bandeau').classList.contains('displayed')) {
burger_content.style.cssText = "margin-top: 55px !important; background-color: white !important; z-index: 9999 !important; visibility: visible !important";
} else if (document.getElementsByClassName('bandeau')[0].classList.contains('displayed')) {
burger_content.style.marginTop = "110px";
}
else {
burger_content.style.marginTop = "55px";
}
}
if (window.matchMedia("(max-width: 600px)").matches) {
document.getElementsByTagName('html')[0].classList.toggle("body-active");
}
});
document.getElementById('main').addEventListener("click", function (e) {
burger.classList.remove('active');
burgermenu.classList.remove('active');
langmenu.classList.remove('active');
langm.classList.remove('active');
burgerlist.classList.remove('right');
document.getElementsByTagName('html')[0].classList.remove("body-active");
goodbarber.style.visibility = 'hidden';
goodbarber.style.backgroundColor = "transparent";
burger_content.style.backgroundColor = "transparent";
burger_content.style.visibility = "hidden";
burger_content.style.borderRight = "1px solid transparent";
goodbarberlogo.style.visibility = "visible";
goodbarberlogogradiant.style.visibility = "hidden";
})
document.getElementById('dropdown-languages').addEventListener("click", function (e) {
langm.classList.toggle('active');
})

function addClassToCookies(elements, classToAdd) {
elements.classList.add(classToAdd);
}

function removeClassToCookies(elements, classToRemove) {
elements.classList.remove(classToRemove);
}

function setCookie(cname, cvalue, exdays) {
var d = new Date();
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
var expires = "expires=" + d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setUdev() {
setCookie("udev", "978", 1);
}

var permission_cookie = getCookie("permission_cookie");
if (permission_cookie == 'y') {
setUdev();
} 
</script>
<script>
function addClassToCookies(elements, classToAdd) {
elements.classList.add(classToAdd);
}

function removeClassToCookies(elements, classToRemove) {
elements.classList.remove(classToRemove);
}

function setCookie(cname, cvalue, exdays) {
var d = new Date();
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
var expires = "expires=" + d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setUdev() {
setCookie("udev", "978", 1);
}

var permission_cookie = getCookie("permission_cookie");
if (permission_cookie == 'y') {
setUdev();
} 





window.addEventListener('load', function initialize() {
var permission_cookie = getCookie("permission_cookie");
if (permission_cookie != 'y') {
addClassToCookies(document.getElementById('cookies-banner'), 'open');
}
window.removeEventListener('load', initialize);
})

document.getElementById('accepte-cookies').addEventListener('click', function () {
removeClassToCookies(document.getElementById('cookies-banner'), 'open');
setCookie("permission_cookie", "y", 10);
setUdev();
})

document.addEventListener("DOMContentLoaded", function (event) {
var classname = document.getElementsByClassName("obl");
for (var i = 0; i < classname.length; i++) {
//click gauche
classname[i].addEventListener('click', myFunction, false);
//click droit
classname[i].addEventListener('contextmenu', myRightFunction, false);
}
});
//fonction du click gauche
var myFunction = function (event) {
var attribute = this.getAttribute("data-obl");
if (event.ctrlKey) {
var newWindow = window.open(decodeURIComponent(window.atob(attribute)), '_blank');
newWindow.focus();
} else {
document.location.href = decodeURIComponent(window.atob(attribute));
}
};
//fonction du click droit
var myRightFunction = function (event) {
var attribute = this.getAttribute("data-obl");
if (event.ctrlKey) {
var newWindow = window.open(decodeURIComponent(window.atob(attribute)), '_blank');
newWindow.focus();
} else {
window.open(decodeURIComponent(window.atob(attribute)), '_blank');
}
}
