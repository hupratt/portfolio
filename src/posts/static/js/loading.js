window.addEventListener("load", () => {
  const _duration = 200;
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sleep(20).then(() => {
    anime
      .timeline({
        easing: "easeInOutCubic"
      })
      .add({
        targets: "#Letter_1",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_1").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Letter_2",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_2").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Letter_3",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_3").setAttribute("stroke", "black");
          document.getElementById("Letter_1").setAttribute("fill", "black");
          document
            .getElementById("Letter_1")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_4",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_4").setAttribute("stroke", "black");
          document.getElementById("Letter_2").setAttribute("fill", "black");
          document
            .getElementById("Letter_2")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_5",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_5").setAttribute("stroke", "black");
          document.getElementById("Letter_3").setAttribute("fill", "black");
          document
            .getElementById("Letter_3")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_6",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_6").setAttribute("stroke", "black");
          document.getElementById("Letter_4").setAttribute("fill", "black");
          document
            .getElementById("Letter_4")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_7",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_7").setAttribute("stroke", "black");
          document.getElementById("Letter_5").setAttribute("fill", "black");
          document
            .getElementById("Letter_5")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_8",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_8").setAttribute("stroke", "black");
          document.getElementById("Letter_6").setAttribute("fill", "black");
          document
            .getElementById("Letter_6")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_9",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_9").setAttribute("stroke", "black");
          document.getElementById("Letter_7").setAttribute("fill", "black");
          document
            .getElementById("Letter_7")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_10",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_10").setAttribute("stroke", "black");
          document.getElementById("Letter_8").setAttribute("fill", "black");
          document
            .getElementById("Letter_8")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_11",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_11").setAttribute("stroke", "black");
          document.getElementById("Letter_9").setAttribute("fill", "black");
          document
            .getElementById("Letter_9")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Letter_12",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_12").setAttribute("stroke", "black");
          document.getElementById("Letter_10").setAttribute("fill", "black");
          document
            .getElementById("Letter_10")
            .setAttribute("stroke", "transparent");
          document.getElementById("Letter_11").setAttribute("fill", "black");
          document
            .getElementById("Letter_11")
            .setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#Line",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Letter_12").setAttribute("fill", "black");
          document
            .getElementById("Letter_12")
            .setAttribute("stroke", "transparent");
          document.getElementById("Line").setAttribute("stroke", "black");
        },
        complete: anim => {
          sleep(1000).then(() => {
            $(".loading").remove();
          });
        }
      });
  });
});
