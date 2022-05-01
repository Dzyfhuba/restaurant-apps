var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector('nav').style.top = "0";
  } else {
    document.querySelector('nav').style.top = "-100%";
  }
  prevScrollpos = currentScrollPos;
}