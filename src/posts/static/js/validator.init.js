
window.addEventListener("load", () => {

var formsCollection = document.getElementsByTagName("form");
for(var i=0;i<formsCollection.length;i++){
    // initialize a validator instance from the "FormValidator" constructor.
    // A "<form>" element is optionally passed as an argument, but is not a must
    var validator = new FormValidator({ events: ["blur"] }, formsCollection[i]);
    validator.settings.classes.alert = "alert alert-warning";
    // on form "submit" event
    formsCollection[i].onsubmit = function(e) {
      var submit = true,
        validatorResult = validator.checkAll(this);
    
      console.log(validatorResult);
      return !!validatorResult.valid;
    };
    
    // on form "reset" event
    formsCollection[i].onreset = function(e) {
      validator.reset();
    };
  }

});