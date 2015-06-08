Days = new Meteor.Collection('days');

Days.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in		
        return !!userId;
    },
    update: function(userId, doc) {
    	// TODO: make sure its the right one
    	return !!userId;
    },
    remove: function(userId, doc) {
    	// TODO: make sure its the right one
    	return !!userId;
    }
});
