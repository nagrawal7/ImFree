Session.setDefault('rows', []);
Session.setDefault('available', []);

Template.freegrid.helpers({
    rows: function() {
        return Session.get('rows');
    },
    available: function() {
    	return Session.get('available');    	
    }
});
