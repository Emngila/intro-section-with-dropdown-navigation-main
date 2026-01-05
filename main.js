// main.js

// ==================== MOBILE MENU TOGGLE ====================
const menuBtn = document.getElementById("menuBtn");
const menuIcon = document.getElementById("menuIcon");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

let mobileOpen = false;

// Force hidden on load
sidebar.classList.add("translate-x-[100vw]");
overlay.classList.add("invisible", "opacity-0");

menuBtn.addEventListener("click", () => {
  mobileOpen = !mobileOpen;

  menuIcon.src = mobileOpen
    ? "./src/Assets/images/icon-close-menu.svg"
    : "./src/Assets/images/icon-menu.svg";

  overlay.classList.toggle("invisible", !mobileOpen);
  overlay.classList.toggle("opacity-0", !mobileOpen);

  sidebar.classList.toggle("translate-x-[100vw]", !mobileOpen);
});

overlay.addEventListener("click", () => {
  if (mobileOpen) menuBtn.click();
});

// ==================== CLOSE ALL DROPDOWNS ====================
function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-btn").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("data-state", "closed");

    const arrow = btn.querySelector(".dropdown-arrow");
    if (arrow) {
      arrow.classList.remove("rotate-180"); // Ensure closed state
    }

    const menu = btn.closest("li")?.querySelector('[role="menu"]');
    if (menu) {
      menu.setAttribute("data-state", "closed");

      if (sidebar.contains(btn)) {
        menu.classList.add("py-0", "h-0", "overflow-hidden");
        menu.classList.remove("py-4");
      }
    }
  });
}

// Close on click outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".dropdown-btn") &&
    !e.target.closest('[role="menu"]')
  ) {
    closeAllDropdowns();
  }
});

// ==================== DROPDOWN HANDLER ====================
document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = btn.getAttribute("aria-expanded") === "true";
    const arrow = btn.querySelector(".dropdown-arrow");
    const menu = btn.closest("li")?.querySelector('[role="menu"]');

    if (!menu) return;

    // Always close all first
    closeAllDropdowns();

    // If it was closed, open this one
    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("data-state", "open");
      menu.setAttribute("data-state", "open");

      // THIS IS THE KEY FIX: Toggle arrow rotation properly
      if (arrow) {
        arrow.classList.add("rotate-180");
      }

      // Mobile height expand
      if (sidebar.contains(btn)) {
        menu.classList.remove("py-0", "h-0", "overflow-hidden");
        menu.classList.add("py-4");
      }
    }
  });
});
