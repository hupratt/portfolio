window.addEventListener("load", () => {
  const _duration = 300;
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  sleep(20).then(() => {
    anime
      .timeline({
        easing: "easeInOutCubic"
      })
      .add({
        targets: "#one",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("one").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#two",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("two").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#three",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("three").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_5",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_5").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_6",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_6").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_11",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_11").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_12",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_12").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#six",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("six").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_11_2",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document
            .getElementById("Vector_11_2")
            .setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_12_2",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document
            .getElementById("Vector_12_2")
            .setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#eight",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("eight").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_21",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_21").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_13",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_13").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_17",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_17").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#Vector_23",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("Vector_23").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#eleven",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("eleven").setAttribute("stroke", "black");
        }
      })
      .add({
        targets: "#twelve",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: _duration,
        begin: function(anim) {
          document.getElementById("twelve").setAttribute("stroke", "black");
        },
        complete: anim => {
          sleep(1000).then(() => {
            $(".loading").remove();
          });
        }
      });
  });
});
