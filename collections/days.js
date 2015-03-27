Days = new Meteor.Collection('days');

Days.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});
