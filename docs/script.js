"use strict";

/* =========================================================
   LIAM'S MATCH DAY
   GitHub Pages Case Study
   Progressive enhancement and interactions
   ========================================================= */

document.documentElement.classList.add("js");

/* ---------------------------------------------------------
   1. SHARED HELPERS
   --------------------------------------------------------- */

/**
 * Select a single element.
 *
 * @param {string} selector
 * @param {ParentNode} context
 * @returns {Element|null}
 */
function select(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Select multiple elements and return a real array.
 *
 * @param {string} selector
 * @param {ParentNode} context
 * @returns {Element[]}
 */
function selectAll(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Check whether reduced motion is preferred.
 *
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Convert a string into a safe HTML id.
 *
 * @param {string} value
 * @returns {string}
 */
function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Escape plain text before placing it inside generated HTML.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value;

  return element.innerHTML;
}

/**
 * Wait until repeated events stop firing.
 *
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function}
 */
function debounce(callback, delay = 150) {
  let timer;

  return (...args) => {
    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

/* ---------------------------------------------------------
   2. AUTOMATIC CURRENT YEAR
   --------------------------------------------------------- */

function initialiseCurrentYear() {
  const yearElements = selectAll("[data-current-year]");
  const currentYear = new Date().getFullYear().toString();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

/* ---------------------------------------------------------
   3. RESPONSIVE MOBILE NAVIGATION
   --------------------------------------------------------- */

function initialiseMobileNavigation() {
  const navbar = select(".navbar");
  const navigation = select(".nav-links", navbar);

  if (!navbar || !navigation) {
    return;
  }

  if (!navigation.id) {
    navigation.id = "primary-navigation";
  }

  const menuButton = document.createElement("button");

  menuButton.type = "button";
  menuButton.className = "nav-toggle";
  menuButton.setAttribute("aria-controls", navigation.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");

  menuButton.innerHTML = `
    <span class="nav-toggle__line" aria-hidden="true"></span>
    <span class="nav-toggle__line" aria-hidden="true"></span>
    <span class="nav-toggle__line" aria-hidden="true"></span>
  `;

  navbar.insertBefore(menuButton, navigation);

  const mobileMediaQuery = window.matchMedia("(max-width: 850px)");

  function applyButtonStyles() {
    Object.assign(menuButton.style, {
      width: "2.8rem",
      height: "2.8rem",
      display: mobileMediaQuery.matches ? "inline-flex" : "none",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.28rem",
      padding: "0",
      marginLeft: "auto",
      color: "#ffffff",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      borderRadius: "0.65rem",
      cursor: "pointer"
    });

    selectAll(".nav-toggle__line", menuButton).forEach((line) => {
      Object.assign(line.style, {
        display: "block",
        width: "1.25rem",
        height: "2px",
        background: "currentColor",
        borderRadius: "999px",
        transition: "transform 180ms ease, opacity 180ms ease"
      });
    });
  }

  function openMenu() {
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");

    navigation.classList.add("is-open");

    Object.assign(navigation.style, {
      position: "absolute",
      top: "calc(100% + 0.5rem)",
      right: "1rem",
      left: "1rem",
      zIndex: "1001",
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
      gap: "0",
      padding: "0.7rem",
      background: "rgba(3, 20, 38, 0.98)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "1rem",
      boxShadow: "0 18px 50px rgba(0, 0, 0, 0.35)",
      backdropFilter: "blur(18px)"
    });

    selectAll("a", navigation).forEach((link) => {
      Object.assign(link.style, {
        display: "block",
        padding: "0.8rem 0.9rem"
      });
    });

    const lines = selectAll(".nav-toggle__line", menuButton);

    if (lines.length === 3) {
      lines[0].style.transform = "translateY(6px) rotate(45deg)";
      lines[1].style.opacity = "0";
      lines[2].style.transform = "translateY(-6px) rotate(-45deg)";
    }
  }

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    navigation.classList.remove("is-open");
    navigation.removeAttribute("style");

    selectAll("a", navigation).forEach((link) => {
      link.removeAttribute("style");
    });

    const lines = selectAll(".nav-toggle__line", menuButton);

    lines.forEach((line) => {
      line.style.transform = "";
      line.style.opacity = "";
    });
  }

  function toggleMenu() {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleViewportChange(event) {
    applyButtonStyles();

    if (!event.matches) {
      closeMenu();
    }
  }

  menuButton.addEventListener("click", toggleMenu);

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (link && mobileMediaQuery.matches) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (
      isOpen &&
      !navbar.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });

  mobileMediaQuery.addEventListener(
    "change",
    handleViewportChange
  );

  navbar.style.position = "relative";
  applyButtonStyles();
}

/* ---------------------------------------------------------
   4. SMOOTH INTERNAL NAVIGATION
   --------------------------------------------------------- */

function initialiseSmoothScrolling() {
  const internalLinks = selectAll('a[href^="#"]:not([href="#"])');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId) {
        return;
      }

      const target = select(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start"
      });

      window.history.pushState(
        null,
        "",
        targetId
      );

      window.setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, prefersReducedMotion() ? 0 : 450);
    });
  });
}

/* ---------------------------------------------------------
   5. ACTIVE NAVIGATION HIGHLIGHTING
   --------------------------------------------------------- */

function initialiseScrollSpy() {
  const navigationLinks = selectAll('.nav-links a[href^="#"]');

  if (navigationLinks.length === 0) {
    return;
  }

  const sectionMap = new Map();

  navigationLinks.forEach((link) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const section = select(targetId);

    if (section) {
      sectionMap.set(section, link);
    }
  });

  if (sectionMap.size === 0) {
    return;
  }

  function setActiveLink(activeLink) {
    navigationLinks.forEach((link) => {
      link.removeAttribute("aria-current");
    });

    if (activeLink) {
      activeLink.setAttribute("aria-current", "page");
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio
          );

        const currentEntry = visibleEntries[0];

        if (!currentEntry) {
          return;
        }

        setActiveLink(
          sectionMap.get(currentEntry.target)
        );
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.25, 0.5]
      }
    );

    sectionMap.forEach((link, section) => {
      observer.observe(section);
    });

    return;
  }

  const updateActiveSection = debounce(() => {
    let currentSection = null;
    let smallestDistance = Number.POSITIVE_INFINITY;

    sectionMap.forEach((link, section) => {
      const distance = Math.abs(
        section.getBoundingClientRect().top - 120
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentSection = section;
      }
    });

    if (currentSection) {
      setActiveLink(sectionMap.get(currentSection));
    }
  }, 80);

  window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
  );

  updateActiveSection();
}

/* ---------------------------------------------------------
   6. READING PROGRESS INDICATOR
   --------------------------------------------------------- */

function initialiseReadingProgress() {
  const progressTrack = document.createElement("div");
  const progressBar = document.createElement("div");

  progressTrack.className = "reading-progress";
  progressBar.className = "reading-progress__bar";

  progressTrack.setAttribute("aria-hidden", "true");
  progressTrack.appendChild(progressBar);

  Object.assign(progressTrack.style, {
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    zIndex: "2000",
    height: "3px",
    pointerEvents: "none"
  });

  Object.assign(progressBar.style, {
    width: "0%",
    height: "100%",
    background:
      "linear-gradient(90deg, #35c96f, #f4b400)",
    transformOrigin: "left center",
    transition: prefersReducedMotion()
      ? "none"
      : "width 80ms linear"
  });

  document.body.appendChild(progressTrack);

  function updateProgress() {
    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop;

    const progress =
      documentHeight > 0
        ? Math.min(
            100,
            Math.max(
              0,
              (scrollPosition / documentHeight) * 100
            )
          )
        : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    debounce(updateProgress, 100)
  );

  updateProgress();
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL
   --------------------------------------------------------- */

function initialiseScrollReveal() {
  if (prefersReducedMotion()) {
    return;
  }

  const revealElements = selectAll([
    ".section-heading",
    ".editorial-grid__content",
    ".editorial-grid__media",
    ".feature-card",
    ".positioning-card",
    ".outcome",
    ".image-showcase",
    ".image-frame",
    ".callout",
    ".pull-quote",
    ".translation-row",
    ".project-stat"
  ].join(","));

  if (revealElements.length === 0) {
    return;
  }

  revealElements.forEach((element, index) => {
    element.dataset.reveal = "pending";

    Object.assign(element.style, {
      opacity: "0",
      transform: "translateY(22px)",
      transition:
        "opacity 650ms ease, transform 650ms ease",
      transitionDelay: `${Math.min(
        index % 4,
        3
      ) * 70}ms`
    });
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.dataset.reveal = "complete";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";

        activeObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/* ---------------------------------------------------------
   8. BACK-TO-TOP BUTTON
   --------------------------------------------------------- */

function initialiseBackToTop() {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Back to the top");
  button.title = "Back to the top";
  button.innerHTML = `
    <span aria-hidden="true">↑</span>
  `;

  Object.assign(button.style, {
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    zIndex: "900",
    width: "3rem",
    height: "3rem",
    display: "grid",
    placeItems: "center",
    padding: "0",
    color: "#031426",
    background: "#35c96f",
    border: "0",
    borderRadius: "999px",
    boxShadow: "0 10px 30px rgba(3, 20, 38, 0.28)",
    fontSize: "1.35rem",
    fontWeight: "900",
    cursor: "pointer",
    opacity: "0",
    visibility: "hidden",
    transform: "translateY(0.75rem)",
    transition:
      "opacity 180ms ease, transform 180ms ease, visibility 180ms ease"
  });

  document.body.appendChild(button);

  function updateVisibility() {
    const shouldShow = window.scrollY > 700;

    button.style.opacity = shouldShow ? "1" : "0";
    button.style.visibility =
      shouldShow ? "visible" : "hidden";
    button.style.transform =
      shouldShow
        ? "translateY(0)"
        : "translateY(0.75rem)";
  }

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth"
    });
  });

  window.addEventListener(
    "scroll",
    updateVisibility,
    { passive: true }
  );

  updateVisibility();
}

/* ---------------------------------------------------------
   9. RESPONSIVE IMAGE HANDLING
   --------------------------------------------------------- */

function initialiseImages() {
  const heroImage = select(".hero__image");
  const images = selectAll("img");

  images.forEach((image) => {
    if (image !== heroImage) {
      image.loading = image.loading || "lazy";
    }

    image.decoding = "async";

    image.addEventListener("load", () => {
      image.classList.add("is-loaded");
    });

    image.addEventListener("error", () => {
      image.classList.add("has-error");

      const frame = image.closest(
        ".image-frame, .image-showcase"
      );

      if (!frame || frame.dataset.errorHandled === "true") {
        return;
      }

      frame.dataset.errorHandled = "true";

      const message = document.createElement("p");

      message.className = "image-error";
      message.textContent =
        "This project image could not be loaded.";

      Object.assign(message.style, {
        margin: "0",
        padding: "2rem",
        color: "#ffffff",
        background: "#062341",
        fontWeight: "700",
        textAlign: "centre"
      });

      image.hidden = true;
      frame.appendChild(message);
    });
  });
}

/* ---------------------------------------------------------
   10. EXTERNAL LINKS
   --------------------------------------------------------- */

function initialiseExternalLinks() {
  const externalLinks = selectAll('a[href^="http"]');

  externalLinks.forEach((link) => {
    let destination;

    try {
      destination = new URL(link.href);
    } catch (error) {
      return;
    }

    if (destination.origin === window.location.origin) {
      return;
    }

    link.target = "_blank";

    const existingRelationship =
      link.getAttribute("rel") || "";

    const relationships = new Set(
      existingRelationship
        .split(/\s+/)
        .filter(Boolean)
    );

    relationships.add("noopener");
    relationships.add("noreferrer");

    link.setAttribute(
      "rel",
      Array.from(relationships).join(" ")
    );

    if (!link.getAttribute("aria-label")) {
      const linkText =
        link.textContent.trim() || "External link";

      link.setAttribute(
        "aria-label",
        `${linkText}, opens in a new tab`
      );
    }
  });
}

/* ---------------------------------------------------------
   11. ACCESSIBLE ACCORDIONS
   --------------------------------------------------------- */

/*
   Expected HTML:

   <div data-accordion>
     <button data-accordion-trigger>
       Section title
     </button>

     <div data-accordion-panel>
       Content
     </div>
   </div>
*/

function initialiseAccordions() {
  const accordions = selectAll("[data-accordion]");

  accordions.forEach((accordion, index) => {
    const trigger = select(
      "[data-accordion-trigger]",
      accordion
    );

    const panel = select(
      "[data-accordion-panel]",
      accordion
    );

    if (!trigger || !panel) {
      return;
    }

    const triggerId =
      trigger.id || `accordion-trigger-${index + 1}`;

    const panelId =
      panel.id || `accordion-panel-${index + 1}`;

    trigger.id = triggerId;
    panel.id = panelId;

    trigger.setAttribute("aria-controls", panelId);
    trigger.setAttribute("aria-expanded", "false");

    panel.setAttribute("aria-labelledby", triggerId);
    panel.hidden = true;

    trigger.addEventListener("click", () => {
      const isOpen =
        trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      panel.hidden = isOpen;
    });
  });
}

/* ---------------------------------------------------------
   12. CODE-BLOCK COPY BUTTONS
   --------------------------------------------------------- */

function initialiseCodeCopyButtons() {
  const codeBlocks = selectAll("pre");

  codeBlocks.forEach((block, index) => {
    const code = select("code", block);

    if (!code || block.dataset.copyReady === "true") {
      return;
    }

    block.dataset.copyReady = "true";
    block.style.position = "relative";

    const button = document.createElement("button");

    button.type = "button";
    button.className = "copy-code";
    button.textContent = "Copy";
    button.setAttribute(
      "aria-label",
      `Copy code block ${index + 1}`
    );

    Object.assign(button.style, {
      position: "absolute",
      top: "0.7rem",
      right: "0.7rem",
      minHeight: "2.2rem",
      padding: "0.45rem 0.75rem",
      color: "#ffffff",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      borderRadius: "0.45rem",
      fontSize: "0.75rem",
      fontWeight: "800",
      cursor: "pointer"
    });

    block.appendChild(button);

    button.addEventListener("click", async () => {
      const text = code.textContent || "";

      try {
        await navigator.clipboard.writeText(text);

        button.textContent = "Copied";

        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1800);
      } catch (error) {
        const temporaryTextArea =
          document.createElement("textarea");

        temporaryTextArea.value = text;
        temporaryTextArea.setAttribute(
          "aria-hidden",
          "true"
        );

        Object.assign(temporaryTextArea.style, {
          position: "fixed",
          opacity: "0",
          pointerEvents: "none"
        });

        document.body.appendChild(
          temporaryTextArea
        );

        temporaryTextArea.select();

        document.execCommand("copy");

        temporaryTextArea.remove();

        button.textContent = "Copied";

        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1800);
      }
    });
  });
}

/* ---------------------------------------------------------
   13. AUTOMATIC HEADING IDS
   --------------------------------------------------------- */

function initialiseHeadingIds() {
  const headings = selectAll(
    "main h2:not([id]), main h3:not([id])"
  );

  const usedIds = new Set(
    selectAll("[id]").map((element) => element.id)
  );

  headings.forEach((heading) => {
    const baseSlug =
      createSlug(heading.textContent) || "section";

    let uniqueSlug = baseSlug;
    let number = 2;

    while (usedIds.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${number}`;
      number += 1;
    }

    heading.id = uniqueSlug;
    usedIds.add(uniqueSlug);
  });
}

/* ---------------------------------------------------------
   14. IMAGE LIGHTBOX
   --------------------------------------------------------- */

/*
   Add data-lightbox to any image that should open larger:

   <img
     src="images/liam_technical.png"
     alt="..."
     data-lightbox
   >
*/

function initialiseImageLightbox() {
  const lightboxImages = selectAll(
    "img[data-lightbox]"
  );

  if (lightboxImages.length === 0) {
    return;
  }

  const dialog = document.createElement("dialog");
  const closeButton = document.createElement("button");
  const enlargedImage = document.createElement("img");
  const caption = document.createElement("p");

  dialog.className = "image-lightbox";
  closeButton.type = "button";
  closeButton.className = "image-lightbox__close";
  closeButton.textContent = "Close";
  closeButton.setAttribute(
    "aria-label",
    "Close enlarged image"
  );

  Object.assign(dialog.style, {
    width: "min(96vw, 1500px)",
    maxWidth: "none",
    maxHeight: "94vh",
    padding: "1rem",
    color: "#ffffff",
    background: "#031426",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "1rem",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.55)"
  });

  Object.assign(enlargedImage.style, {
    width: "100%",
    maxHeight: "82vh",
    objectFit: "contain",
    borderRadius: "0.7rem"
  });

  Object.assign(closeButton.style, {
    display: "block",
    margin: "0 0 0.75rem auto",
    padding: "0.55rem 0.85rem",
    color: "#031426",
    background: "#35c96f",
    border: "0",
    borderRadius: "999px",
    fontWeight: "900",
    cursor: "pointer"
  });

  Object.assign(caption.style, {
    margin: "0.75rem 0 0",
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: "0.88rem",
    textAlign: "center"
  });

  dialog.append(
    closeButton,
    enlargedImage,
    caption
  );

  document.body.appendChild(dialog);

  function closeLightbox() {
    dialog.close();
    enlargedImage.removeAttribute("src");
    enlargedImage.alt = "";
    caption.textContent = "";
  }

  lightboxImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");

    if (!image.getAttribute("aria-label")) {
      image.setAttribute(
        "aria-label",
        `${image.alt || "Project image"}. Open larger view.`
      );
    }

    image.style.cursor = "zoom-in";

    function openLightbox() {
      enlargedImage.src = image.currentSrc || image.src;
      enlargedImage.alt = image.alt || "";
      caption.textContent = image.alt || "";

      dialog.showModal();
    }

    image.addEventListener("click", openLightbox);

    image.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

  dialog.addEventListener("click", (event) => {
    const rectangle =
      dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < rectangle.left ||
      event.clientX > rectangle.right ||
      event.clientY < rectangle.top ||
      event.clientY > rectangle.bottom;

    if (clickedOutside) {
      closeLightbox();
    }
  });
}

/* ---------------------------------------------------------
   15. SHARE BUTTONS
   --------------------------------------------------------- */

/*
   Optional HTML:

   <button
     type="button"
     data-share-page
   >
     Share this case study
   </button>
*/

function initialiseShareButtons() {
  const buttons = selectAll("[data-share-page]");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const shareData = {
        title: document.title,
        text:
          "Liam’s Match Day: a football-first independence platform.",
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(
              "The page could not be shared.",
              error
            );
          }
        }

        return;
      }

      try {
        await navigator.clipboard.writeText(
          window.location.href
        );

        const originalText =
          button.textContent;

        button.textContent = "Link copied";

        window.setTimeout(() => {
          button.textContent = originalText;
        }, 1800);
      } catch (error) {
        window.prompt(
          "Copy this page link:",
          window.location.href
        );
      }
    });
  });
}

/* ---------------------------------------------------------
   16. INITIALISE THE PAGE
   --------------------------------------------------------- */

function initialisePage() {
  initialiseCurrentYear();
  initialiseMobileNavigation();
  initialiseSmoothScrolling();
  initialiseScrollSpy();
  initialiseReadingProgress();
  initialiseScrollReveal();
  initialiseBackToTop();
  initialiseImages();
  initialiseExternalLinks();
  initialiseAccordions();
  initialiseCodeCopyButtons();
  initialiseHeadingIds();
  initialiseImageLightbox();
  initialiseShareButtons();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initialisePage
  );
} else {
  initialisePage();
}
