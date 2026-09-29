(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const year = document.querySelector("#year");

  const setMenuState = (open) => {
    if (!menuButton || !mobileMenu) return;

    menuButton.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  };

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      setMenuState(!isOpen);
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setMenuState(false);
    }
  });

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const animatedElements = document.querySelectorAll(
    ".intro-grid, .intro-gallery, .works-heading, .work-card, " +
    ".manifesto-inner, .services-heading, .service-item, .process-grid, " +
    ".person-grid, .contact-inner"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal", "is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("reveal", "is-visible");
    });
  }
})();
