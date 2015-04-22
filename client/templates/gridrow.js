Template.gridrow.helpers({ 
	days: function() {
		return _.map(Session.get('week'), function(str) { return moment(str).format("ddd M/D")});
	} 
});