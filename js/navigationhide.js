/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    document.getElementById("social-icons").style.visibility= "hidden";
  } else {
    document.getElementById("navbar").style.top = "-90px";
    document.getElementById("social-icons").style.visibility = "visible";
  }
  prevScrollpos = currentScrollPos;
}