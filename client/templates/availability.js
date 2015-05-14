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
            array[i] = time.format();
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
            week[i] = selectedDate.weekday(i).format();
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
            // TODO: SET IMPLEMENTATION 
            var location = determineLocation(ui.selecting);
            updateAvailable(location, false);
        },
        unselecting: function(event, ui) {
            var location = determineLocation(ui.unselecting);
            updateAvailable(location, true);
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

    if (!Availability.findOne()) {
        Availability.insert({
            user: Meteor.userId()
        });
    }
    // console.log(Availability.findOne());
}

function determineLocation(cell) {
    var myDay = moment(Session.get('week')[cell.cellIndex-1]);
    var index = $(cell).parent().parent().children().index($(cell).parent());
    var myRow = moment(Session.get('rows')[index]);
    myDay.hour(myRow.hour());
    myDay.minute(myRow.minute());
    var obj = myDay.format();
    console.log(obj);
    return obj;
}

function updateAvailable(obj, toDelete) {
    var array = Session.get('available');
    var found = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            if (toDelete) {
                array.splice(i, 1);
                Session.set('available', array);
                return;
            }
            found = true;
            break;
        }
    }
    if (!found) {
        array.push(obj);
    }
    Session.set('available', array);
}
