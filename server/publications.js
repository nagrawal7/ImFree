Meteor.publish('availability', function() {
    return Availability.find({user: this.userId});
});
