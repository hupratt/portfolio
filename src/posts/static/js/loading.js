window.addEventListener("load", () => {
  //Getting dom elements
  let mouseCursor = document.querySelector(".cursor-effect");
  let ctaLinks = document.querySelectorAll(
    ".about-content a, .footer-links a, .more-about a"
  );

  //  Mouse effect
  window.addEventListener("mousemove", cursor);

  function cursor(e) {
    mouseCursor.style.top = e.pageY + "px";
    mouseCursor.style.left = e.pageX + "px";
  }

  ctaLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
      mouseCursor.classList.add("link-grow");
    });
    link.addEventListener("mouseleave", () => {
      mouseCursor.classList.remove("link-grow");
    });
  });

  //GSAP animations
  function fadeOut() {
    if (document.querySelector("#intro-btn")) {
      // document.querySelector("#intro-btn").remove();
      TweenMax.to("#intro-btn", 1, {
        opacity: 0,
        y: -100,
      });
      TweenMax.to(".text", 1, {
        y: "-100%",
      });
      TweenMax.to(".slider", 2, {
        y: "-100%",
        delay: 1,
        ease: Expo.easeInOut,
      });
      TweenMax.to(".slider-2", 2, {
        y: "-100%",
        delay: 1.4,
        ease: Power2.easeInOut,
      });
      TweenMax.to(
        ".intro",
        2,
        {
          y: "-100%",
          delay: 2,
          ease: Power2.easeInOut,
        },
        "-=.5"
      );
      TweenMax.to(".content", 2, {
        y: 0,
        ease: Power2.easeInOut,
      });
    } else {
      console.log(
        "=== element not found loading.js [60] ===",
        "element not found"
      );
    }
  }
  ///Timeline
  const tl = gsap.timeline({
    defaults: { ease: "power1.out" },
  });

  tl.to(".text", {
    y: "0%",
    duration: 1,
    stagger: 0.4,
  });

  let trans = () => {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1200);
  };
  if (document.querySelector("#intro-btn")) {

  document.getElementById("intro-btn").addEventListener("click", fadeOut);
}});
