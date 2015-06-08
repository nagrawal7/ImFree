Meteor.publish('availability', function() {
    return Availability.find({user: this.userId});
});

Meteor.publish('timeslots', function() {
    return TimeSlots.find();
});

Meteor.publish('days', function() {
    return Days.find();
});
