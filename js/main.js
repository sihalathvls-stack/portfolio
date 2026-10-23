"use strict";

/* ==========================================================
   1) เมนูมือถือ (Hamburger)
   ========================================================== */
const navToggle = document.querySelector("#nav-toggle");
const navMenu = document.querySelector("#nav-menu");

function setMenu(open) {
  navMenu.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

// ปิดเมนูเมื่อกดลิงก์ในเมนู
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// ปิดเมนูเมื่อกดปุ่ม Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

/* ==========================================================
   2) กรองผลงาน
   ========================================================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".portfolio-grid .card");
const emptyMessage = document.querySelector("#filter-empty");

function applyFilter(category) {
  let visibleCount = 0;

  cards.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.hidden = !match;
    if (match) visibleCount += 1;
  });

  emptyMessage.hidden = visibleCount > 0;

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

/* ==========================================================
   3) ไฮไลต์เมนูตาม Section ที่กำลังดู
   ========================================================== */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", current);
        if (current) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // นับว่า "กำลังดู" เมื่อ Section ผ่านกลางจอ
);

sections.forEach((section) => observer.observe(section));