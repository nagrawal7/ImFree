Template.export.events({
    "click #exportBtn": function(event) {
        var freeTime = computeFreeTime();
        freeTime = freeTime.sort();
        var parsed = parseSlots(freeTime);
        var smushed = smush(parsed);
        console.log(smushed);
        smushed.forEach(function(slot) {
          $('.freeTime').append(formatTime(slot.start) + ' to ' + formatTime(slot.end));
          $('.freeTime').append('<br />');
        });
    }
});

Template.export.rendered = function() {
    $('.datepicker').pickadate({
        selectYears: 1 // Creates a dropdown of 15 years to control year
    });
};

function formatTime(str) {
  return moment(str).format('dddd MMM D, h:mm a');
}

function computeFreeTime() {
  var $input = $('.datepicker').pickadate();
  var picker = $input.pickadate('picker');
  var selectedDate = moment(picker.get('select', 'mm/dd/yyyy'), 'MM-DD-YYYY');
  var myAvail = Availability.findOne();
  var result = [];
  for (var i = 0; i < 7; i++) {
    var day = selectedDate.weekday(i);
    day.hour(0);
    day.minute(0);
    day.second(0);
    var sDay = day.format();
    if (Days.findOne({date: sDay, availability: myAvail._id})) {
      var availDay = Days.findOne({date: sDay, availability: myAvail._id});
      result = result.concat(availDay.slots);
    }
  }
  return result;
}

function parseSlots(slots) {
    var parsed = [];
    slots.forEach(function (slot) {
      var slotTime = moment(slot);
      var p = {start: "", end: ""};
      p.start = slotTime.format();
      slotTime.minute(slotTime.minute() + 15);
      p.end = slotTime.format();
      parsed.push(p);
    });
    console.log(parsed);
    return parsed;
}

function smush(slots) {
  var smushed = [];
  var index = 0;
  var current = slots[index];
  while (index < slots.length-1) {
      var next = slots[(index+1)];
      console.log("Current:" + current.start + "\t" + current.end);
      console.log("Next:" + next.start + "\t" + next.end);
      if (current.end === next.start) {
        current.end = next.end;
      }
      else {
        smushed.push(current);
        current = next;
      }
      index++;
  }
  smushed.push(current);
  return smushed;
}
