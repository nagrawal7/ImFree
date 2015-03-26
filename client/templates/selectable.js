$(function() {
    $('#selectable').bind("mousedown", function(e) {
        e.metaKey = true;
    }).selectable({
        filter: 'td.timeslot, th.colhead',
        selected: function(event, ui) {
            var array = Session.get('available');
            var myDay = ui.selected.cellIndex;
            var index = $(ui.selected).parent().parent().children().index($(ui.selected).parent());
            var myRow = Session.get('rows')[index];
            var obj = {
                day: myDay,
                row: myRow
            };
            if (-1 === $.inArray(obj, array)) {
                array.push({
                    day: myDay,
                    row: myRow
                });
            }                             
            Session.set('available', array);
        },
        unselected: function(event, ui) {
            var array = [];
            $(".ui-selected", this).each(function() {
                var index = $(this).parent().parent().children().index($(this).parent());
                var myRow = Session.get('rows')[index];
                array.push({
                    day: $(this).parent().children().index($(this)) - 1,
                    row: myRow
                });
            });
            Session.set('available', array);
        }
    });
});
