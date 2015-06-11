Template.availability.events({
    "change #timelength": function(event) {
        var duration = parseInt($(event.currentTarget).find(':selected').text().substring(1));
        var numcols = 24 * 60 / duration;
        var array = new Array(numcols);
        var time = moment();
        time.hour(0);
        time.minute(0);
        time.second(0);
        for (var i = 0; i < array.length; i++) {
            array[i] = {
                time: time.format()
            };
            time.minute(time.minute() + duration);
        }
        Session.set('rows', array);
    },

    "click #availSubmitBtn": function(event) {
        $('#gridcontainer').show();
        var $input = $('.datepicker').pickadate();
        var picker = $input.pickadate('picker');

        var selectedDate = moment(picker.get('select', 'mm/dd/yyyy'), 'MM-DD-YYYY');
        week = new Array(7);
        for (var i = 0; i < 7; i++) {
            week[i] = {
                weekday: selectedDate.weekday(i).format()
            };
        }
        Session.set('week', week);
    }
})

Template.availability.rendered = function() {
    $('#selectable').bind("mousedown", function(e) {
        e.metaKey = true;
    }).selectable({
        filter: 'td.timeslot',
        selecting: function(event, ui) {
            var formattedTime = determineLocation(ui.selecting);
            addAvail(formattedTime);
        },
        unselecting: function(event, ui) {
            var formattedTime = determineLocation(ui.unselecting);
            removeAvail(formattedTime);
        }
    });

    $('#gridcontainer').hide();

    $('.dropdown-button').dropdown({
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'center', // Aligns dropdown to left or right edge (works with constrain_width)
        belowOrigin: true // Displays dropdown below the button
    });

    $('select').material_select();

    $('.datepicker').pickadate({
        selectYears: 1 // Creates a dropdown of 15 years to control year
    });
}

function determineLocation(cell) {
    var myDay = moment(Session.get('week')[cell.cellIndex-1].weekday);
    var index = $(cell).parent().parent().children().index($(cell).parent());
    var myRow = moment(Session.get('rows')[index].time);
    myDay.hour(myRow.hour());
    myDay.minute(myRow.minute());
    var formattedTime = myDay.format();
    return formattedTime;
}

// if we don't have this day for this availability create it and add it
// add the specified slot to that day once obtained
function addAvail(time) {
    // determine day string
    var selectedMoment = moment(time);
    selectedMoment.hour(0);
    selectedMoment.minute(0);
    var sDay = selectedMoment.format();

    var myAvail = Availability.findOne();

    if (Days.findOne({date: sDay, availability: myAvail._id})) {

        // pick selected day and add current timeslot to day
        var selectedDay = Days.findOne({date: sDay, availability: myAvail._id});
        Days.update(selectedDay._id, {$addToSet: {slots: [time] }});
    }   
    else {

        // create day for this availability with given slot
        var selectedDay = {
            availability: myAvail._id,
            date: selectedMoment.format(),
            slots: [time]
        };
        var insertedID = Days.insert(selectedDay);

        // update availability to reference this day
        Availability.update(myAvail._id, {$addToSet: {days: [insertedID] }});
    }    
    
}

// this slot must be deleted from both the day and the days array in availability
function removeAvail(time) {
    // determine day string
    var selectedMoment = moment(time);
    selectedMoment.hour(0);
    selectedMoment.minute(0);
    var sDay = selectedMoment.format();

    var myAvail = Availability.findOne();

    if (Days.findOne({date: sDay, availability: myAvail._id})) {
        // pick selected day delete it
        var deleteID = Days.findOne({date: sDay, availability: myAvail._id})._id;
        Days.remove(deleteID);

        Availability.update(myAvail._id, {$pull: {days: [deleteID] }});
    }     
}
