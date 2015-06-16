Template.gridrow.helpers({ 
	week: function() {
		return Session.get('week');
	},
	checkAvailable: function(day, time) {
		var currentDay = day + "";
		var selectedDay = moment(currentDay);		
		var currentTime = time + ""; // cast to string	
		var selectedTime = moment(currentTime);

		selectedDay.hour(selectedTime.hour());
		selectedDay.minute(selectedTime.minute());
		var sDay = selectedDay.format();

		var myAvail = Availability.findOne();

		var found = false;
		for (var i = 0; i < myAvail.days.length; i++) {
			if (myAvail.days[i].day === currentDay) {				
				var day = Days.findOne(myAvail.days[i].id);
				for (var j = 0; j < day.slots.length; j++) {
					if (day.slots[j] === sDay) {
						found = true;
					}
				}
			}
		}

		return found;
    	// // TODO: make correct query
    	// if (Days.findOne({date: currentDay, availability: availID, slots: {$in: [ sDay ]}}) != null) {
    	// 	return true;
    	// }
    	// else {
    	// 	return false;
    	// }
	}
});