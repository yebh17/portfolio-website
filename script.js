document.getElementById("year").textContent = new Date().getFullYear();
const header = document.querySelector(".site-header");
let lastY = 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (y > 80 && y > lastY) header.style.transform = "translateY(-100%)";
  else header.style.transform = "translateY(0)";
  lastY = y;
}, {passive:true});
