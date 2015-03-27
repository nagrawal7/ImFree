Meteor.publish('days', function() {
    return Days.find();
});
