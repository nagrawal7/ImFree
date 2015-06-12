# TODOS for MyAvail

## Tasks

1. rewrite schema to use slots instead of days
	a. handle the multiple selection
2. Handle 5 min increment to length conversions
3. import google calendar

## Next Features

* import calendars
	* google: should be fairly workable
	* outlook: 
	* duke
* sharing / exporting
	* link with grid view, table of times
	* image

## Notes

* only accept current and future dates
* when rendering a week, you query for those 7 days, determine which slots are available and render those green

for each row in grid:
	for each day in row:
		timeslot.doSomething


* need it to be quick to render weeks