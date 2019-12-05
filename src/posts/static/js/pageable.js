$(document).ready(function() {
  "use strict";

  var anchors = [].slice.call(
    document.querySelector(".anchors").firstElementChild.children
  );
  var listeners = [
    "init",
    "update",
    "scroll.before",
    "scroll.start",
    "scroll",
    "scroll.end"
  ];
  var list = document.getElementById("listeners");
  var toggle = document.getElementById("settings-open");
  var settings = document.getElementById("settings");
  var buttons = document.querySelectorAll("button");
  var selects = document.querySelectorAll("select");

  const pageable = new Pageable("main", {
    animation: 400, // the duration in ms of the scroll animation
    onInit: init,
    delay: 300, // the delay in ms before the scroll animation starts
    throttle: 50, // the interval in ms that the resize callback is fired
    onFinish: update,
    events: {
      wheel: true, // enable / disable mousewheel scrolling
      mouse: false, // enable / disable mouse drag scrolling
      touch: false, // enable / disable touch / swipe scrolling
      keydown: false // enable / disable keyboard navigation
    },
    onBeforeStart: function() {
      this.pages.forEach((page, i) => {
        page.classList.remove("pg-active");
      });
    }
  });

  function update(data) {
    var that = this;
    selects[0].value = this.index + 1;
    selects[1].value = this.anchors[this.index];
    selects[2].value = this.horizontal ? "horizontal" : "vertical";

    anchors.forEach(function(anchor, i) {
      anchor.firstElementChild.classList.toggle("active", i === that.index);
    });
  }

  function init() {
    var that = this;

    listeners.forEach(function(listener) {
      var item = document.createElement("li");
      item.textContent = listener;
      list.appendChild(item);

      that.on(listener, function(data) {
        item.classList.add("active");

        setTimeout(function() {
          item.classList.remove("active");
        }, 200);

        if (listener === "scroll.end") {
          setTimeout(function() {
            Array.from(list.children).forEach(function(child) {
              return child.classList.remove("active");
            });
          }, 400);
        }
      });
    });

    window.bar = new MiniBar("#scroll", {
      alwaysShowBars: true
    });

    toggle.addEventListener("click", function(e) {
      settings.classList.toggle("active");
    });

    buttons.forEach(function(button) {
      button.onclick = toggleMethod;
    });

    selects.forEach(function(select) {
      initSelect(select);
    });

    function toggleMethod(e) {
      if ("method" in this.dataset) {
        that[this.dataset.method]();
      }
    }

    function initSelect(select) {
      if (select.id === "scrollToPage") {
        that.pages.forEach(function(page, i) {
          var option = new Option(i + 1, i + 1);
          select.add(option);
        });

        select.onchange = function(e) {
          that.scrollToPage(e.target.value);

          selects[1].value = that.anchors[e.target.value - 1];
        };
      } else if (select.id === "scrollToAnchor") {
        that.pages.forEach(function(page, i) {
          var option = new Option("#" + page.id, "#" + page.id);
          select.add(option);
        });

        select.onchange = function(e) {
          that.scrollToAnchor(e.target.value);

          selects[0].value = that.anchors.indexOf(e.target.value) + 1;
        };
      } else if (select.id === "orientate") {
        ["vertical", "horizontal"].forEach(function(type) {
          var option = new Option(type, type);
          select.add(option);
        });

        select.onchange = function(e) {
          that.orientate(e.target.value);
        };
      }
    }
  }
});
