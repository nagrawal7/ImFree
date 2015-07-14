Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
});

Router.map(function() {
    this.route('availability', {
        path: '/availability'
    });

    this.route('import', {
        path: '/import'
    });

    this.route('welcome', {
        path: '/'
    });
});

var requireLogin = function() {
    if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');			
		}					
	} else {
		this.next(); 
	}
}

Router.before(requireLogin, {
    only: ['availability', 'import']
});
