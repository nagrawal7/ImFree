Template.export.events({
    "click #exportBtn": function(event) {
        doSomething();
    }
});

Template.export.rendered = function() {
    $('.datepicker').pickadate({
        selectYears: 1 // Creates a dropdown of 15 years to control year
    });
};


function doSomething() {
  var $input = $('.datepicker').pickadate();
  var picker = $input.pickadate('picker');
  var selectedDate = moment(picker.get('select', 'mm/dd/yyyy'), 'MM-DD-YYYY');
  var myAvail = Availability.findOne();

  for (var i = 0; i < 7; i++) {
    var day = selectedDate.weekday(i);
    day.hour(0);
    day.minute(0);
    day.second(0);
    var sDay = day.format();
    var availSlots = [];
    if (Days.findOne({date: sDay, availability: myAvail._id})) {
      var availDay = Days.findOne({date: sDay, availability: myAvail._id});
      availSlots = availDay.slots;
    }
    if (availSlots.length > 0) {
      smush(availSlots);
    }
    else {
      // fill as null
    }
  }
}

function smush(slots) {
  
}
