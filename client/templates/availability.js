Template.availability.events({
    "change #timelength": function(event) {
        var duration = parseInt($(event.currentTarget).find(':selected').text().substring(1));
        var numcols = 24 * 60 / duration;

        var array = new Array(numcols);
        var curHr = 12;
        var curMin = "00";
        var curPeriod = "AM";

        for (var i = 0; i < array.length; i++) {
            array[i] = {
                hour: curHr,
                min: curMin,
                period: curPeriod
            };
            var numCurMin = parseInt(curMin) + duration;
            if (numCurMin >= 60) {
                numCurMin = numCurMin % 60;
                curHr = curHr + 1;
            }
            if (numCurMin / 10 == 0) {
                curMin = "0" + numCurMin.toString();
            } else {
                curMin = numCurMin.toString();
            }

            if (curHr > 12) {
                curHr = 1;
            }

            if (curHr > 11 && i >= (60 / duration)) {
                curPeriod = "PM";
            }
        }
        Session.set('rows', array);
    },

    "click #availSubmitBtn": function(event) {
        alert(Session.get('available').length);
    }
})

Template.availability.rendered = function() {
    $('#selectable').bind("mousedown", function(e) {
        e.metaKey = true;
    }).selectable({
        filter: 'td.timeslot, th.colhead',
        selecting: function(event, ui) {
            if (ui.selecting.className.indexOf("colhead") > -1) {
                var d = ui.selecting.cellIndex;
                $('table tbody td:nth-child(' + (d + 1) + ')').addClass('ui-selected');
                $($('table tbody td:nth-child(' + (d + 1) + ')')).parent().parent().children().each(
                    function(index, el) {
                        updateAvailable({
                            day: d,
                            row: Session.get('rows')[index]
                        }, false);
                    });
            } else {
                // TODO: SET IMPLEMENTATION 
                var location = determineLocation(ui.selecting);
                updateAvailable(location, false);
            }
        },
        unselecting: function(event, ui) {
            if (ui.unselecting.className.indexOf("colhead") > -1) {
                var d = ui.unselecting.cellIndex;
                $('table tbody td:nth-child(' + (d + 1) + ')').removeClass('ui-selected');
                $($('table tbody td:nth-child(' + (d + 1) + ')')).parent().parent().children().each(
                    function(index, el) {
                        updateAvailable({
                            day: d,
                            row: Session.get('rows')[index]
                        }, true);
                    });
            } else {
                var location = determineLocation(ui.unselecting);
                updateAvailable(location, true);
            }
        }
    });
}

function determineLocation(cell) {
    var myDay = cell.cellIndex;
    var index = $(cell).parent().parent().children().index($(cell).parent());
    var myRow = Session.get('rows')[index];
    var obj = {
        day: myDay,
        row: myRow
    };
    return obj;
}

function updateAvailable(obj, toDelete) {
    var array = Session.get('available');
    var found = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i].day === obj.day && array[i].row.hour === obj.row.hour &&
            array[i].row.min === obj.row.min && array[i].row.period === obj.row.period) {
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
