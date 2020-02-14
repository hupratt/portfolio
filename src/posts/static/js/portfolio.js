!((n, t, e) => {
  var o = {
    init: e => {
      o.portfolio(), o.navbarChange(), o.showPopUp(), o.showAll(), o.toggle_darkmode();
    },

    portfolio: () => {
      var t = n(".grid-portfolio").isotope({
        itemSelector: ".grid-item",
        masonry: { gutter: ".gutter-sizer", columnWidth: ".grid-sizer" },
        percentPosition: !0
      });
      return (
        n(".filter-button-group").on("click", "a", function() {
          var e = n(this).attr("data-filter");
          t.isotope({ filter: e });
        }),
        n(".btn-filter a.is-checked").addClass("active"),
        n(".btn-filter a").on("click", function() {
          n(".btn-filter a").removeClass("active"), n(this).addClass("active");
        }),
        !1
      );
    },
    navbarChange: () => {
      n(t).scroll(function() {
        var e = n(t).scrollTop();
        return (
          150 < e
            ? (n("#header-navbar").removeClass("navbar-transparent"),
              n("body").addClass("not-on-top"))
            : (n("body").removeClass("not-on-top"),
              n("#header-navbar").addClass("navbar-transparent")),
          !1
        );
      });
    },
    
    showPopUp: () => {
      n(".hover_bkgr_fricc").on("mouseleave", e => {
        n(".hover_bkgr_fricc").hide(600);
      });
      n("#book").click(() => {
        n(".hover_bkgr_fricc").show();
      });
    },
    showAll: () => {

      n("#allProjects").click(() => {
        n(".allProjects").show();
      });
    },
    toggle_darkmode: () => {
      let lightMode = localStorage.getItem("lightMode");

      const enableLightMode = () => {
        document.body.classList.add("lightmode");
        localStorage.setItem("lightMode", "enabled");
      };
      const disableLightMode = () => {
        document.body.classList.remove("lightmode");
        localStorage.setItem("lightMode", null);
      };
      if (lightMode === "enabled") {
        enableLightMode();
      }
      const blacktoggle = document.querySelector("#mode-1");
      const whitetoggle = document.querySelector("#mode-2");

      blacktoggle.addEventListener("click", _ => {
        lightMode = localStorage.getItem("lightMode");
        if (lightMode !== "enabled") {
          enableLightMode();

        } else {
          disableLightMode();
        }
      });
      whitetoggle.addEventListener("click", _ => {
        lightMode = localStorage.getItem("lightMode");
        if (lightMode !== "enabled") {
          enableLightMode();
        } else {
          disableLightMode();
        }
      });
    }
  };
  n(e).ready(() => {
    o.init(n);
  });
})(window.jQuery, window, document);
