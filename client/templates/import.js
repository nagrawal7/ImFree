Template.import.events({
    "click #authorize-button": function(event) {
        handleAuthClick(event);
    }
});

Template.import.rendered = function() {
    $('.datepicker').pickadate({
        selectYears: 1 // Creates a dropdown of 15 years to control year
    });
}

var CLIENT_ID = '705243275938-ganet9fba3785vc3i6niestgc2e2q967.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// Check if current user has authorized this application.
function checkAuth() {
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES,
        'immediate': true
    }, handleAuthResult);
}

// Handle response from authorization server.
// @param {Object} authResult Authorization result.
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        loadCalendarApi();
    }
}

// Initiate auth flow in response to user clicking authorize button.
// @param {Event} event Button click event.
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

// Load Google Calendar client library. List upcoming events once client library is loaded.
function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}


// MY CUSTOM METHOD TO ADD METHODS TO CALENDAR
function listUpcomingEvents() {
    var $input = $('.datepicker').pickadate();
    var picker = $input.pickadate('picker');
    var selectedDate = moment(picker.get('select', 'mm/dd/yyyy'), 'MM-DD-YYYY');

    var request = gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': selectedDate.weekday(0).format(),
        'timeMax': selectedDate.weekday(6).format(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 672,
        'orderBy': 'startTime'
    });

    request.execute(function(resp) {
        var events = resp.items;
        var busyTimes = [];
        for (i = 0; i < events.length; i++) {
            var event = events[i];
            busyTimes.push({
                start: event.start.dateTime,
                end: event.end.dateTime
            })            
        }

        imFree(selectedDate.weekday(0).format());    
        addBusyTimes(busyTimes);
        
    });
}

function imFree(weekStart) {
    // make everything in the week free
    // then call add busy times afterwards

    var startDay = moment(weekStart);
    for (var i = 0; i < 7; i++) {
        var day = startDay.weekday(i);
        // create day and add it to my avail
        
        // go thru day and add all the slots
    }
}

function addBusyTimes(busyTimes) {
    busyTimes.forEach(function (time) {
        var startFormatted = computeStartBlock(time.start);
        var endFormatted = computeEndBlock(time.end);

        // while (time < endformatted) 
        //      create and add this day to availability if necessary
        //      add the slot to the day if it is not already present
    });
}

function computeStartBlock(startTime) {
    var time = moment(startTime);
    var minute = time.minute();
    if (minute > 0 && minute < 14) {
        time.minute(0);
    } else if (minute > 15 && minute < 30) {
        time.minute(15);        
    } else if (minute > 30 && minute < 45) {
        time.minute(30);        
    } else if (minute > 45 && minute < 60) {
        time.minute(45);        
    }
    return time.format();
}

function computeEndBlock(startTime) {
    var time = moment(startTime);
    var minute = time.minute();
    if (minute > 0 && minute < 14) {
        time.minute(15);
    } else if (minute > 15 && minute < 30) {
        time.minute(30);        
    } else if (minute > 30 && minute < 45) {
        time.minute(45);        
    } else if (minute > 45 && minute < 60) {
        time.minute(0);
        time.hour(time.hour() + 1);        
    }
    return time.format();
}
