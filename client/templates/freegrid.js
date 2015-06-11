Session.setDefault('rows', []);
Session.setDefault('available', []);

Template.freegrid.helpers({
    rows: function() {    	
        return Session.get('rows');
    },
    available: function() {
    	return Session.get('available');    	
    },
    days: function() {
    	return _.map(Session.get('week'), function(str) { return moment(str.weekday).format("ddd M/D")});
    }
});
