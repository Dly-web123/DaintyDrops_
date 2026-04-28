const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

// TOGGLE
menuIcon.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 penting

  menuIcon.classList.toggle("active");
  menuList.classList.toggle("active");
});

// KLIK LUAR = TUTUP
document.addEventListener("click", (e) => {
  if (!menuList.contains(e.target) && !menuIcon.contains(e.target)) {
    menuIcon.classList.remove("active");
    menuList.classList.remove("active");
  }
});

// KLIK MENU = TUTUP
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("active");
    menuList.classList.remove("active");
  });
});


// ================= SLIDER NEXT LEVEL =================

const track = document.getElementById("slider-track");
const slides = document.querySelectorAll("#slider-track .card");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dotsContainer = document.getElementById("dots");

let index = 0;
const total = slides.length;
let autoSlide;

// === BUAT DOT ===
slides.forEach((_, i)=>{
  const dot = document.createElement("span");
  if(i === 0) dot.classList.add("active");

  dot.addEventListener("click", ()=>{
    index = i;
    updateSlider();
    resetAuto();
  });

  dotsContainer.appendChild(dot);
});

function updateDots(){
  document.querySelectorAll(".dots span").forEach((dot,i)=>{
    dot.classList.toggle("active", i === index);
  });
}

// === UPDATE SLIDER ===
function updateSlider(){
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// === NEXT ===
next.addEventListener("click", ()=>{
  index = (index + 1) % total;
  updateSlider();
  resetAuto();
});

// === PREV ===
prev.addEventListener("click", ()=>{
  index = (index - 1 + total) % total;
  updateSlider();
  resetAuto();
});

// === AUTO ===
function startAuto(){
  autoSlide = setInterval(()=>{
    index = (index + 1) % total;
    updateSlider();
  }, 3000);
}

function resetAuto(){
  clearInterval(autoSlide);
  startAuto();
}

startAuto();

// ================= SWIPE MOBILE =================

let startX = 0;

track.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  if(startX - endX > 50){
    index = (index + 1) % total;
  } else if(endX - startX > 50){
    index = (index - 1 + total) % total;
  }

  updateSlider();
  resetAuto();
});

// =======================
// NAV ACTIVE SCROLL
// =======================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", ()=>{
  let currentSection = "";

  sections.forEach(section=>{
    const top = section.offsetTop - 120;
    if(scrollY >= top){
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link=>{
    link.classList.remove("active");
    if(link.getAttribute("href") === "#" + currentSection){
      link.classList.add("active");
    }
  });
});


//SLider tambahan
// =======================
// MENU HERO SLIDER (SAFE)
// =======================

const heroTrack = document.getElementById("menu-hero-track");

if(heroTrack){

  const heroSlides = heroTrack.querySelectorAll(".menu-hero-card");
  const heroDotsContainer = document.getElementById("menu-hero-dots");
  const heroPrev = document.querySelector(".menu-hero-prev");
  const heroNext = document.querySelector(".menu-hero-next");

  let heroIndex = 0;

  // DOT
  heroSlides.forEach((_, i)=>{
    const dot = document.createElement("span");
    if(i === 0) dot.classList.add("active");

    dot.addEventListener("click", ()=>{
      heroIndex = i;
      updateHero();
    });

    heroDotsContainer.appendChild(dot);
  });

  function updateHero(){
    heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;

    heroDotsContainer.querySelectorAll("span").forEach((dot,i)=>{
      dot.classList.toggle("active", i === heroIndex);
    });
  }

  // NEXT
  heroNext.addEventListener("click", ()=>{
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHero();
  });

  // PREV
  heroPrev.addEventListener("click", ()=>{
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    updateHero();
  });

  // AUTO
  setInterval(()=>{
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHero();
  }, 3500);
}