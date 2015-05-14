Session.setDefault('rows', []);
Session.setDefault('available', []);

Template.freegrid.helpers({
    rows: function() {    	
        return _.map(Session.get('rows'), function(str) { return moment(str).format("LT")});
    },
    available: function() {
    	return Session.get('available');    	
    },
    days: function() {
    	return _.map(Session.get('week'), function(str) { return moment(str).format("ddd M/D")});
    }
});
