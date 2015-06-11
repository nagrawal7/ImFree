Template.timelabel.helpers({ 
	formattedTime: function() {
		return moment(this.time + "").format("LT");
	}
});