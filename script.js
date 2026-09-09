document.getElementById("year").textContent = new Date().getFullYear();

const header = document.querySelector(".site-header");
let lastY = 0;

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (y > 80 && y > lastY) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  header.classList.toggle("is-scrolled", y > 40);
  lastY = y;
}, { passive: true });

/* ---------------------------------------------------------
   SUNNY v7 motion system
   GSAP + ScrollTrigger are loaded from CDN in index.html.
   --------------------------------------------------------- */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Scroll progress line.
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.appendChild(progress);

  gsap.to(".scroll-progress-bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2
    }
  });

  // Short cinematic loader.
  const loaderTl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  loaderTl
    .from(".page-loader-inner img", {
      scale: 0.74,
      opacity: 0,
      duration: 0.65
    })
    .from(".page-loader-inner span", {
      y: 14,
      opacity: 0,
      letterSpacing: "0.65em",
      duration: 0.5
    }, "-=0.3")
    .to(".page-loader-inner", {
      y: -18,
      opacity: 0,
      duration: 0.45,
      delay: 0.18
    })
    .to(".page-loader", {
      yPercent: -100,
      duration: 0.85,
      ease: "power4.inOut"
    })
    .set(".page-loader", { display: "none" });

  // Hero reveal starts while loader finishes.
  const heroTl = gsap.timeline({
    defaults: { ease: "power4.out" },
    delay: 0.65
  });

  heroTl
    .from(".hero .eyebrow", {
      y: 20,
      opacity: 0,
      duration: 0.65
    })
    .from(".hero-title em", {
      yPercent: 115,
      rotate: 2,
      duration: 1.05
    }, "-=0.25")
    .from(".hero-bio", {
      y: 28,
      opacity: 0,
      stagger: 0.14,
      duration: 0.8
    }, "-=0.55")
    .from(".hero-socials-label", {
      y: 14,
      opacity: 0,
      duration: 0.5
    }, "-=0.35")
    .from(".hero-social", {
      y: 18,
      opacity: 0,
      stagger: 0.07,
      duration: 0.58,
      ease: "power3.out"
    }, "-=0.28")
    .from(".hero-bottom", {
      y: 18,
      opacity: 0,
      duration: 0.65
    }, "-=0.32")
    .from(".hero-photo-wrap", {
      x: 60,
      scale: 0.94,
      opacity: 0,
      duration: 1.15
    }, "-=1")
    .from(".hero-index", {
      opacity: 0,
      duration: 0.45
    }, "-=0.35");

  // Hero image moves slightly slower than the page.
  gsap.to(".hero-photo-wrap", {
    yPercent: 11,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.1
    }
  });

  gsap.to(".hero-cutout", {
    scale: 1.035,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    }
  });

  // Arrow motion.
  gsap.to(".circle-button", {
    y: 9,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Marquee moves with scroll rather than at a fixed CSS speed.
  gsap.fromTo(".motion-marquee-track",
    { xPercent: 0 },
    {
      xPercent: -24,
      ease: "none",
      scrollTrigger: {
        trigger: ".motion-marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1
      }
    }
  );

  // Shared section labels.
  gsap.utils.toArray(".section-label").forEach(label => {
    gsap.from(label, {
      scrollTrigger: {
        trigger: label,
        start: "top 90%"
      },
      y: 18,
      opacity: 0,
      duration: 0.65,
      ease: "power3.out"
    });
  });

  // Latest release.
  gsap.from(".release .real-artwork", {
    scrollTrigger: {
      trigger: ".release-grid",
      start: "top 80%"
    },
    y: 70,
    scale: 0.91,
    opacity: 0,
    duration: 1.05,
    ease: "power4.out"
  });

  gsap.from(".release-info > *", {
    scrollTrigger: {
      trigger: ".release-grid",
      start: "top 78%"
    },
    y: 34,
    opacity: 0,
    stagger: 0.11,
    duration: 0.72,
    ease: "power3.out"
  });

  gsap.to(".real-artwork img", {
    yPercent: 6,
    scale: 1.045,
    ease: "none",
    scrollTrigger: {
      trigger: ".release",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  });

  // Lightweight pointer tilt for the current release.
  const artwork = document.querySelector(".real-artwork");
  if (artwork && window.matchMedia("(pointer:fine)").matches) {
    artwork.addEventListener("pointermove", event => {
      const rect = artwork.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(artwork, {
        rotateY: px * 5,
        rotateX: py * -5,
        transformPerspective: 900,
        duration: 0.35,
        ease: "power2.out"
      });
    });

    artwork.addEventListener("pointerleave", () => {
      gsap.to(artwork, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        ease: "power3.out"
      });
    });
  }

  // Statement line reveals.
  gsap.from(".statement-small", {
    scrollTrigger: {
      trigger: ".statement",
      start: "top 72%"
    },
    y: 20,
    opacity: 0,
    duration: 0.6
  });

  gsap.from(".statement-line", {
    scrollTrigger: {
      trigger: ".statement-title",
      start: "top 80%"
    },
    yPercent: 115,
    opacity: 0,
    rotate: 1.5,
    stagger: 0.14,
    duration: 0.95,
    ease: "power4.out"
  });

  // Portfolio intro.
  gsap.from(".portfolio-intro", {
    scrollTrigger: {
      trigger: ".portfolio-intro",
      start: "top 88%"
    },
    y: 25,
    opacity: 0,
    duration: 0.7
  });

  // Cards animate as they enter, not all at once.
  ScrollTrigger.batch(".video-card", {
    start: "top 90%",
    once: true,
    onEnter: batch => {
      gsap.from(batch, {
        y: 55,
        opacity: 0,
        scale: 0.975,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true
      });
    }
  });

  // Featured card gets a mild cinematic emphasis.
  gsap.to(".featured-card", {
    scale: 1.018,
    ease: "none",
    scrollTrigger: {
      trigger: ".featured-card",
      start: "top 78%",
      end: "bottom 30%",
      scrub: 1
    }
  });

  // Artist section: text and image move at different speeds.
  gsap.from(".signature-copy > *", {
    scrollTrigger: {
      trigger: ".signature-grid",
      start: "top 80%"
    },
    y: 36,
    opacity: 0,
    stagger: 0.12,
    duration: 0.75,
    ease: "power3.out"
  });

  gsap.from(".signature-photo-wrap", {
    scrollTrigger: {
      trigger: ".signature-grid",
      start: "top 82%"
    },
    x: 55,
    opacity: 0,
    duration: 0.95,
    ease: "power4.out"
  });

  gsap.to(".signature-photo-wrap img", {
    yPercent: 7,
    ease: "none",
    scrollTrigger: {
      trigger: ".artist-signature",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.1
    }
  });

  // Contact finish.
  gsap.from(".contact-logo", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 72%"
    },
    scale: 0.76,
    rotate: -5,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.4)"
  });

  gsap.from(".contact .kicker", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 72%"
    },
    y: 18,
    opacity: 0,
    duration: 0.65
  });

  gsap.from(".contact h2", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 70%"
    },
    y: 90,
    opacity: 0,
    duration: 1.05,
    ease: "power4.out"
  });

  gsap.from(".contact-email", {
    scrollTrigger: {
      trigger: ".contact",
      start: "top 62%"
    },
    y: 20,
    opacity: 0,
    duration: 0.7
  });

  gsap.to(".contact-bg", {
    scale: 1.14,
    filter: "brightness(1.08)",
    ease: "none",
    scrollTrigger: {
      trigger: ".contact",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1.2
    }
  });

  // Refresh positions after fonts and remote YouTube images settle.
  window.addEventListener("load", () => ScrollTrigger.refresh());
} else {
  const loader = document.querySelector(".page-loader");
  if (loader) loader.remove();
}
