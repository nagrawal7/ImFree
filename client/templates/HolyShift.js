$(document).ready(function() {
    $(".button-collapse").sideNav();

    $('.dropdown-button').dropdown({
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on click
        alignment: 'center', // Aligns dropdown to left or right edge (works with constrain_width)
        belowOrigin: true // Displays dropdown below the button
    });

    $('select').material_select();

    $(".timelength").change(function() {
    	var duration = parseInt($( ".timelength option:selected" ).text().substring(1));
    	var numcols = 24*60/duration;

    	var array = new Array(numcols);
    	var curHr = 12;
    	var curMin = "00";
    	var curPeriod = "AM";

    	for(var i=0; i<array.length; i++){
    		array[i] = {
    			hour: curHr,
    			min: curMin,	
    			period: curPeriod
    		};
    		var numCurMin = parseInt(curMin) + duration;
    		if (numCurMin >= 60) {
    			numCurMin = numCurMin % 60;
    			curHr = curHr + 1;
    		}            
            if (numCurMin / 10 == 0) {
                curMin = "0" + numCurMin.toString();            
            } 
            else {
                curMin = numCurMin.toString();
            }

    		if (curHr > 12) {
    			curHr = 1;    			
    		}

            if (curHr > 11 && i >= (60/duration)) {
                curPeriod = "PM";
            }
    	}
    	Session.set('rows', array);
	});

    $("#availSubmitBtn").click(function(){
        alert(Session.get('available').length);
    });
});