const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
const NUM_PARTICLES = 80;

const PARTICLE_COLOR = "232, 33, 46";
const PARTICLE_COLOR_2 = "192, 200, 208";

for (let i = 0; i < NUM_PARTICLES; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? PARTICLE_COLOR : PARTICLE_COLOR_2,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(232, 33, 46, 0.03)";
  ctx.lineWidth = 0.5;
  const gridSize = 80;
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
    ctx.fill();

    particles.slice(i + 1).forEach((p2) => {
      const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${p.color}, ${(1 - dist / 120) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

let currentSlide = 0;
const totalSlides = 4;
let slideInterval;

function goToSlide(index) {
  document
    .querySelectorAll(".slide")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".dot")
    .forEach((d) => d.classList.remove("active"));
  currentSlide = index;
  document.getElementById(`slide-${currentSlide}`).classList.add("active");
  document.querySelectorAll(".dot")[currentSlide].classList.add("active");
}

function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 3000);
}

function resetSlideshow() {
  clearInterval(slideInterval);
  startSlideshow();
}

startSlideshow();

document.querySelectorAll(".dot").forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goToSlide(i);
    resetSlideshow();
  });
});

const typingWords = [
  "iPhone 17 Pro Max",
  "Samsung S21 Ultra",
  "Vivo X300",
  "iPhone 15 Pro Max",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

const fadeEls = document.querySelectorAll(
  ".product-card, .feature-card, .contact-item, .contact-form, .section-header",
);

fadeEls.forEach((el) => el.classList.add("fade-in-up"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
      }
    });
  },
  { threshold: 0.1 },
);

fadeEls.forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 4px 30px rgba(0, 212, 255, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

function toggleMenu() {
  document.querySelector(".menu").classList.toggle("open");
}

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".menu").classList.remove("open");
  });
});

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function buyNow(productName) {
  document.getElementById("modalTitle").textContent = productName;

  const waNumber = "6285188604704";
  const message = encodeURIComponent(
    `Halo Amran Web! Saya tertarik dengan *${productName}*. Apakah masih tersedia? Berapa harga terbaiknya? Terima kasih 🙏`,
  );
  document.getElementById("modalWALink").href =
    `https://wa.me/${waNumber}?text=${message}`;
  document.getElementById("modal").classList.add("active");
}

function closeModal(e) {
  if (
    !e ||
    e.target === document.getElementById("modal") ||
    !e.target.closest(".modal-box")
  ) {
    document.getElementById("modal").classList.remove("active");
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function sendMessage() {
  const name = document.getElementById("formName").value.trim();
  const phone = document.getElementById("formPhone").value.trim();
  const msg = document.getElementById("formMsg").value.trim();

  if (!name || !phone || !msg) {
    showToast("⚠️ Mohon isi semua kolom!");
    return;
  }

  const waNumber = "6285188604704";
  const waMsg = encodeURIComponent(
    `Halo Amran Web! 👋\n\nNama: *${name}*\nNo. HP: *${phone}*\nPesan: ${msg}`,
  );

  window.open(`https://wa.me/${waNumber}?text=${waMsg}`, "_blank");
  showToast("✅ Mengalihkan ke WhatsApp...");

  document.getElementById("formName").value = "";
  document.getElementById("formPhone").value = "";
  document.getElementById("formMsg").value = "";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const slideIndex = parseInt(card.getAttribute("data-slide"));
    if (!isNaN(slideIndex)) {
      goToSlide(slideIndex);
      clearInterval(slideInterval);
    }
  });

  card.addEventListener("mouseleave", () => {
    startSlideshow();
  });
});
