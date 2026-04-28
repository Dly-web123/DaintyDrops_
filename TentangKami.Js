/* ================= NAVBAR ================= */
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

menuIcon.addEventListener("click",(e)=>{
  e.stopPropagation();
  menuIcon.classList.toggle("active");
  menu.classList.toggle("active");
});

document.addEventListener("click",(e)=>{
  if(!menu.contains(e.target) && !menuIcon.contains(e.target)){
    menu.classList.remove("active");
    menuIcon.classList.remove("active");
  }
});
