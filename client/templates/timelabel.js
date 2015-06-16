Template.timelabel.helpers({ 
	formattedTime: function() {
		return moment(this + "").format("LT");
	}
});