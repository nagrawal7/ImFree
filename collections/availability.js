Availability = new Meteor.Collection('availability');

Availability.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in		
        return !!userId;
    }
});
