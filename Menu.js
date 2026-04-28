let cart = [];

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

/* ================= CARD ================= */
document.querySelectorAll(".card").forEach(card=>{
  let plus = card.querySelector(".plus");
  let minus = card.querySelector(".minus");
  let qtyEl = card.querySelector(".qty");

  let qty = 0;

  plus.onclick = ()=>{
    qty++;
    qtyEl.innerText = qty;
    tambah(card.dataset.name, parseInt(card.dataset.price), card); // 🔥 FIX
  };

  minus.onclick = ()=>{
    if(qty > 0){
      qty--;
      qtyEl.innerText = qty;
      kurang(card.dataset.name);
    }
  };
});

/* ================= TAMBAH ================= */
function tambah(name, price, card){ // 🔥 FIX
  let item = cart.find(i=>i.name===name);

  if(item) item.qty++;
  else cart.push({name, price, qty:1});

  renderCart();

  if(card) animate(card); // 🔥 FIX
}

/* ================= KURANG ================= */
function kurang(name){
  let item = cart.find(i=>i.name===name);

  if(item){
    item.qty--;
    if(item.qty <= 0){
      cart = cart.filter(i=>i.name!==name);
    }
  }

  renderCart();
}

/* ================= RENDER CART ================= */
function renderCart(){
  let box = document.getElementById("cart-items");
  let totalEl = document.getElementById("total");

  let total = 0;
  box.innerHTML = "";

  cart.forEach(i=>{
    let sub = i.qty * i.price;
    total += sub;

    box.innerHTML += `<div>${i.name} x${i.qty} - Rp${sub}</div>`;
  });

  totalEl.innerText = "Rp" + total;
  document.getElementById("cart-count").innerText = cart.length;
}

/* ================= TOGGLE POPUP ================= */
function toggleCart(){
  let pop = document.getElementById("cart-popup");

  pop.style.display = pop.style.display === "flex" ? "none" : "flex";

  renderCheckout();
}

/* ================= RENDER CHECKOUT ================= */
function renderCheckout(){
  let box = document.getElementById("checkout-items");
  if(!box) return;

  box.innerHTML = "";

  cart.forEach(i=>{
    let sub = i.qty * i.price;
    box.innerHTML += `<div>${i.name} x${i.qty} - Rp${sub}</div>`;
  });
}

/* ================= KIRIM WA ================= */
function kirimWA(){
  if(cart.length === 0){
    alert("Keranjang kosong!");
    return;
  }

  let nama = document.getElementById("nama").value;
  let hp = document.getElementById("hp").value;
  let alamat = document.getElementById("alamat").value;
  let metode = document.getElementById("metode").value;

  if(!nama || !hp || !alamat){
    alert("Lengkapi data dulu!");
    return;
  }

  let total = 0;
  let msg = `🛍️ *PESANAN DAINTYDROPS*\n\n`;

  msg += `👤 Nama: ${nama}\n`;
  msg += `📞 HP: ${hp}\n`;
  msg += `📍 Alamat: ${alamat}\n\n`;

  msg += `📦 *Detail Pesanan:*\n`;

  cart.forEach(i=>{
    let sub = i.qty * i.price;
    total += sub;
    msg += `- ${i.name} x${i.qty} = Rp${sub}\n`;
  });

  msg += `\n━━━━━━━━━━━━━━\n`;
  msg += `💰 *TOTAL: Rp${total}*\n\n`;

  if(metode.toLowerCase() === "qris"){
    msg += `📲 Pembayaran: QRIS\n`;
    msg += `Scan di sini:\n`;
    msg += `https://drive.google.com/uc?export=view&id=1i2Aph3ey07OK5NeclVjsDo2jHJFhAaUs\n\n`;
  }
  else if(metode.toLowerCase() === "transfer"){
    msg += `🏦 Pembayaran: Transfer\n`;
    msg += `Bank: BCA\n`;
    msg += `No Rek: 1234567890\n`;
    msg += `Atas Nama: Fadly\n\n`;
  }

  msg += `🙏 Mohon konfirmasi setelah pembayaran ya kak`;

  window.open(`https://wa.me/62895331381091?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ================= FIX BUTTON WA ================= */
document.addEventListener("DOMContentLoaded", ()=>{
  const btn = document.getElementById("btn-wa");
  if(btn){
    btn.addEventListener("click", kirimWA);
  }
});

/* ================= SEARCH ================= */
document.getElementById("search").addEventListener("input",function(){
  let key = this.value.toLowerCase();

  document.querySelectorAll(".card").forEach(c=>{
    c.style.display = c.innerText.toLowerCase().includes(key) ? "block" : "none";
  });
});

/* ================= VARIANT ================= */
document.querySelectorAll(".variant").forEach(select=>{
  select.addEventListener("change", function(){
    const selectedOption = this.options[this.selectedIndex];
    const imgSrc = selectedOption.getAttribute("data-img");

    const card = this.closest(".card");
    const img = card.querySelector(".product-img");

    img.classList.add("fade-out");

    setTimeout(()=>{
      img.src = imgSrc;
      img.classList.remove("fade-out");
      img.classList.add("fade-in");

      setTimeout(()=>{
        img.classList.remove("fade-in");
      },300);

    },200);
  });
});

/* ================= ANIMASI ================= */
function animate(card){
  const cartIcon = document.querySelector(".cart-icon");
  const clone = card.cloneNode(true);

  let r1 = card.getBoundingClientRect();
  let r2 = cartIcon.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.top = r1.top + "px";
  clone.style.left = r1.left + "px";
  clone.style.width = "100px";
  clone.style.transition = "0.7s";
  clone.style.zIndex = "9999";

  document.body.appendChild(clone);

  setTimeout(()=>{
    clone.style.top = r2.top + "px";
    clone.style.left = r2.left + "px";
    clone.style.opacity = "0";
    clone.style.transform = "scale(0.1)";
  },10);

  setTimeout(()=>clone.remove(),700);
}