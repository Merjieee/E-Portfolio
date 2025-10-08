<script>
document.getElementById("year").textContent = new Date().getFullYear();

function sendEmail(e){
  e.preventDefault();
  const {name,email,message} = e.target;
  window.location.href = `mailto:jermiegapas102@gmail.com?subject=Message from ${name.value}&body=${message.value} (${email.value})`;
}

function toggleMode(event) {
  event?.stopPropagation(); // prevent double triggering

  const body = document.body;
  const isDark = body.classList.toggle("dark");

  // Update ALL toggle buttons (desktop + mobile)
  const buttons = document.querySelectorAll(".toggle-btn");
  buttons.forEach((btn) => {
    const icon = btn.querySelector("span");
    btn.classList.add("spin");
    icon.textContent = isDark ? "☀️" : "🌙";

    // remove spin animation after effect
    setTimeout(() => btn.classList.remove("spin"), 600);
  });
}


// Typing
/* === Smooth typing animation === */
const typingEl = document.querySelector(".typing");
const words = ["Merjieee!", "Jermie G."];
let i = 0, j = 0, deleting = false;

function typeEffect() {
  const current = words[i];
  typingEl.textContent = current.substring(0, j);

  if (!deleting && j < current.length) {
    j++;
  } else if (deleting && j > 0) {
    j--;
  } else if (!deleting && j === current.length) {
    deleting = true;
    setTimeout(typeEffect, 1000);
    return;
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(typeEffect, deleting ? 70 : 120);
}

typeEffect();

// Lightbox
// === FIXED Lightbox ===
const items = document.querySelectorAll(".portfolio .item img");
const lightbox = document.getElementById("lightbox");
const imgBox = lightbox.querySelector("img");
const titleBox = document.getElementById("lightbox-title");
const descBox = document.getElementById("lightbox-desc");

items.forEach(img => {
  img.addEventListener("click", () => {
    const parent = img.closest(".item");
    lightbox.classList.add("active");
    imgBox.src = img.src;
    titleBox.textContent = parent.dataset.title || "";
    descBox.textContent = parent.dataset.desc || "";
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  imgBox.src = "";
}

// Scroll reveal
function revealSections(){
  document.querySelectorAll(".reveal").forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top<window.innerHeight-150)el.classList.add("active");
    else el.classList.remove("active");
  });
}
window.addEventListener("scroll",revealSections);
window.addEventListener("load",revealSections);

// Navbar active highlight
window.addEventListener("scroll",()=>{
  const sections=document.querySelectorAll("section[id]");
  const scrollY=window.scrollY+150;
  sections.forEach(sec=>{
    const top=sec.offsetTop;
    const height=sec.offsetHeight;
    const id=sec.getAttribute("id");
    const link=document.querySelector(`nav a[href="#${id}"]`);
    if(link){
      if (scrollY >= top - 100 && scrollY < top + height) link.classList.add("active");
      else link.classList.remove("active");
    }
  });
});
/* Mobile menu open/close helpers (safe, minimal) */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu(){
  if(!mobileMenu || !menuOverlay || !hamburgerBtn) return;
  const open = mobileMenu.classList.toggle('open');
  menuOverlay.classList.toggle('show', open);
  hamburgerBtn.classList.toggle('active', open);
  document.body.classList.toggle('menu-open', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  menuOverlay.setAttribute('aria-hidden', !open);
}

/* explicit close function used on overlay & link clicks */
function closeMenu(){
  if(!mobileMenu || !menuOverlay || !hamburgerBtn) return;
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('show');
  hamburgerBtn.classList.remove('active');
  document.body.classList.remove('menu-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuOverlay.setAttribute('aria-hidden', 'true');
}

/* close on ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* if user resizes to desktop, ensure mobile menu is closed */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});
function scrollToTopAndCloseMenu(event) {
  event.preventDefault(); // stop default anchor jump
  // Smooth scroll all the way to the very top (not just the hero)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  // Close the hamburger menu on mobile
  if (window.innerWidth <= 768) {
    closeMenu();
  }
}
  
</script>
<!-- your other JS functions above here (toggleMenu, scrollToTop, etc.) -->

<!-- === EMAILJS Integration === -->
<!-- === EMAILJS Integration (Modern Glass Popup + Sending Button) === -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script>
  // Initialize EmailJS
  emailjs.init("y1kWrgPMKvqAyX4rY"); // your public key

  const form = document.getElementById("contact-form");

  // Glass-style popup message
  function showPopup(message, isSuccess = true) {
    const existingPopup = document.querySelector(".popup-message");
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement("div");
    popup.className = "popup-message";
    popup.textContent = message;

    Object.assign(popup.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(1)",
      padding: "1.5rem 2.5rem",
      borderRadius: "16px",
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#fff",
      textAlign: "center",
      zIndex: "9999",
      letterSpacing: "0.5px",
      background: isSuccess
        ? "rgba(124, 58, 237, 0.8)" // purple glass
        : "rgba(225, 29, 72, 0.85)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      opacity: "0",
      transition: "all 0.4s ease",
      pointerEvents: "none",
    });

    document.body.appendChild(popup);

    // Animate fade in
    requestAnimationFrame(() => {
      popup.style.opacity = "1";
      popup.style.transform = "translate(-50%, -50%) scale(1.05)";
    });

    // Fade out
    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.transform = "translate(-50%, -50%) scale(0.95)";
      setTimeout(() => popup.remove(), 400);
    }, 3000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit");
    const originalText = submitBtn.textContent;

    // Disable and show "Sending..."
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs
      .send("service_et50cuh", "template_j8pzyk9", {
        from_name: this.name.value,
        from_email: this.email.value,
        message: this.message.value,
      })
      .then(() => {
        showPopup("Successfully sent!");
        this.reset();
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        showPopup("Failed to send. Please try again later.", false);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
  // === Replay hero animation only when coming back from another section ===
const heroSection = document.querySelector(".hero");
const heroText = document.querySelector(".hero-text");
const heroPic = document.querySelector(".hero-pic img");

let heroWasVisible = true; // track if user has left the hero section

window.addEventListener("scroll", () => {
  const rect = heroSection.getBoundingClientRect();

  // Detect when hero section leaves viewport
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
    heroWasVisible = false;
  }

  // Detect when user comes back to hero section
  if (!heroWasVisible && rect.top < window.innerHeight - 100 && rect.bottom > 0) {
    heroWasVisible = true;

    // Reset animations
    heroText.style.animation = "none";
    heroPic.style.animation = "none";

    // Replay them smoothly
    setTimeout(() => {
      heroText.style.animation = "slideInLeft 1s forwards";
      heroPic.style.animation = "popIn 1s forwards 0.5s";
    }, 100);
  }
});
</script>

</script>