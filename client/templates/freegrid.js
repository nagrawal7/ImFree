Session.setDefault('rows', []);

Template.freegrid.helpers({
    rows: function() {    	
        return Session.get('rows');
    },
    days: function() {
    	return _.map(Session.get('week'), function(str) { return moment(str).format("ddd M/D")});
    }
});
