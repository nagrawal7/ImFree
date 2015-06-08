TimeSlots = new Meteor.Collection('timeslots');

TimeSlots.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in		
        return !!userId;
    }
});
