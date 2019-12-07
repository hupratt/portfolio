!((n, t, e) => {
  var o = {
    init: e => {
      o.portfolio(), o.navbarChange(), o.showPopUp(), o.toggle_darkmode();
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
    toggle_darkmode: () => {
      let darkMode = localStorage.getItem("darkMode");

      const enableDarkMode = () => {
        document.body.classList.add("darkmode");
        localStorage.setItem("darkMode", "enabled");
      };
      const disableDarkMode = () => {
        document.body.classList.remove("darkmode");
        localStorage.setItem("darkMode", null);
      };
      if (darkMode === "enabled") {
        enableDarkMode();
      }
      const toggle = document.querySelector("#dark-mode-toggle");

      toggle.addEventListener("click", _ => {
        darkMode = localStorage.getItem("darkMode");
        if (darkMode !== "enabled") {
          enableDarkMode();
        } else {
          disableDarkMode();
        }
      });
    }
  };
  n(e).ready(() => {
    o.init(n);
  });
})(window.jQuery, window, document);
