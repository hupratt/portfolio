window.addEventListener("load", () => {
  const _duration = 100;
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  sleep(20).then(() => {
    anime
      .timeline({
        easing: "easeInOutCubic"
      })
      .add({
        targets: "#1",
        // strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("1").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#2",
        // strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("2").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#3",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("3").setAttribute("stroke", "black");
          document.getElementById("1").setAttribute("fill", "black");
          document.getElementById("1").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#4",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("4").setAttribute("stroke", "black");
          document.getElementById("2").setAttribute("fill", "black");
          document.getElementById("2").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#5",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("5").setAttribute("stroke", "black");
          document.getElementById("3").setAttribute("fill", "black");
          document.getElementById("3").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#6",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("6").setAttribute("stroke", "black");
          document.getElementById("4").setAttribute("fill", "black");
          document.getElementById("4").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#7",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("7").setAttribute("stroke", "black");
          document.getElementById("5").setAttribute("fill", "black");
          document.getElementById("5").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#8",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("8").setAttribute("stroke", "black");
          document.getElementById("6").setAttribute("fill", "black");
          document.getElementById("6").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#9",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("9").setAttribute("stroke", "black");
          document.getElementById("7").setAttribute("fill", "black");
          document.getElementById("7").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#10",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("10").setAttribute("stroke", "black");
          document.getElementById("8").setAttribute("fill", "black");
          document.getElementById("8").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#11",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("11").setAttribute("stroke", "black");
          document.getElementById("9").setAttribute("fill", "black");
          document.getElementById("9").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#12",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("12").setAttribute("stroke", "black");
          document.getElementById("10").setAttribute("fill", "black");
          document.getElementById("10").setAttribute("stroke", "transparent");
          document.getElementById("11").setAttribute("fill", "black");
          document.getElementById("11").setAttribute("stroke", "transparent");
        }
      })
      .add({
        targets: "#13",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("12").setAttribute("fill", "black");
          document.getElementById("12").setAttribute("stroke", "transparent");
          // document.getElementById("13").setAttribute("stroke-width", "10px");
          // document.getElementById("13").setAttribute("stroke", "black");
          document.getElementById("13").setAttribute("stroke", "black");
        }
      });

    // complete: anim => {
    //   sleep(1000).then(() => {
    //     $(".loading").remove();
    //   });
    // }
    // });
  });
});
