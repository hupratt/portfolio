window.addEventListener("load", () => {
  //Getting dom elements
  var ls = localStorage.getItem("namespace.visited");
  
    let mouseCursor = document.querySelector(".cursor-effect");
    let introButton = document.querySelector("#intro-btn");
    //  Mouse effect
    window.addEventListener("mousemove", cursor);

    function cursor(e) {
      mouseCursor.style.top = e.pageY + "px";
      mouseCursor.style.left = e.pageX + "px";
    }


    //GSAP animations
    function fadeOut() {
      if (introButton) {
        // introButton.remove();
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
    tl.to(introButton, {
      opacity: 1,
      duration: 1,
    });


    if (introButton) {
      introButton.addEventListener("click", fadeOut);
      localStorage.setItem("namespace.visited", 1);
    }
});
