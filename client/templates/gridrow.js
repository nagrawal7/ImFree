Template.gridrow.helpers({ 
	week: function() {
		return Session.get('week');
	},
	checkAvailable: function(day, time) {
		var currentDay = day + "";
		var selectedDay = moment(currentDay);		
		var currentTime = time.time + ""; // cast to string	
		var selectedTime = moment(currentTime);

		selectedDay.hour(selectedTime.hour());
		selectedDay.minute(selectedTime.minute());
		var sDay = selectedDay.format();

		var availID = Availability.findOne()._id;
    	// TODO: make correct query
    	if (Days.findOne({date: currentDay, availability: availID, slots: {$in: [ sDay ]}}) != null) {
    		return true;
    	}
    	else {
    		return false;
    	}
	}
});