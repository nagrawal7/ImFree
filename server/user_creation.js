Accounts.onCreateUser(function(options, user) {
	Availability.insert({
        user: user._id,
        days: []
    });
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user;
});
