$(document).ready(function() {
  $("#price_range").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 10000,
    from: 0,
    to: 0,
    step: 500,
    max_postfix: "+",
    // prefix: "$",
    postfix: "€",
    hide_min_max: true // show/hide MIN and MAX labels
    // hide_from_to: true // show/hide FROM and TO labels
  });
  var custom_values = [
    "Now",
    "1 Month",
    "2 Months",
    "3-6 Months",
    "6-12 Months",
    "1 Year +"
  ];
  var my_from = custom_values.indexOf("Now");
  $("#timeline").ionRangeSlider({
    grid: true,
    from: my_from,
    values: custom_values,
    hide_min_max: true
  });
});
