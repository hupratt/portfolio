!((jquery, t, e) => {
  var form = {
    init: e => {
      form.showPage2(), form.showPage3(), form.showPage4(); 
    },

    showPage2: () => {
      jquery("#gotoPage2").click(() => {
        jquery("#page1").hide();
        jquery("#page2").show();
        jquery("#page2").removeClass('hidden');
      });
      jquery("#my-form").on("keyup keypress", e => {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
        }
      });
    },
    showPage3: () => {
      const message =
        '<div class="alert alert-warning"><strong>Howdy captain!</strong> The email address is invalid<button class="close" aria-label="Close" type="button" data-dismiss="alert"><span aria-hidden="true">×</span></button></div>';
      jquery("#gotoPage3").click(() => {
        if (jquery(".alert-warning").prop("outerHTML") == message) {
          console.log("nok");
        } else {
          jquery("#page2").hide();
          jquery("#page3").show();
          jquery("#page3").removeClass('hidden');
          jquery('option[value="Report a bug on this website"]').attr('selected', 'selected');
        }
      });
      jquery("#my-form").on("keyup keypress", e => {
        if (jquery(".alert").prop("outerHTML") == message) {
          var keyCode = e.keyCode || e.which;
          
          if (keyCode === 13) {
            e.preventDefault();
          }
        }
      });
    },
    showPage4: () => {
      jquery("#gotoPage4").click(() => {
        jquery("#page3").hide();
        jquery("#page4").show();
        
        jquery("#page4").removeClass('hidden');
      });
      jquery("#my-form").on("keyup keypress", e => {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
        }
      });
    }
  };
  jquery(e).ready(() => {
    form.init(jquery);
  });
})(window.jQuery, window, document);
