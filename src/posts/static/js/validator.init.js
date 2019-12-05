// initialize a validator instance from the "FormValidator" constructor.
// A "<form>" element is optionally passed as an argument, but is not a must
var validator = new FormValidator({ events: ["blur"] }, document.forms[0]);
validator.settings.classes.alert = "alert alert-warning";
// on form "submit" event
document.forms[0].onsubmit = function(e) {
  var submit = true,
    validatorResult = validator.checkAll(this);

  console.log(validatorResult);
  return !!validatorResult.valid;
};

// on form "reset" event
document.forms[0].onreset = function(e) {
  validator.reset();
};
