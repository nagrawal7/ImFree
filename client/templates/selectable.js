$(function() {
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
});

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
