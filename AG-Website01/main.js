function openNav() {
  document.getElementById("sideNav").style.width = "250px";
  document.getElementById("menuIcon").style.opacity = "0";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
  document.getElementById("menuIcon").style.opacity = "1";
}

function goHome() {
  window.location.href = "index.html";
}
