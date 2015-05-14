# TODOS

## Tasks

* set block avail --> create a day object for that day if it doesn't exist. add that time slot. link this day object to the availability

* link availability to rendering the grid
* Add set implementation of Availability
* Store everything as 5 min Availiability segmenets even for :15, :30, :60
	* later make sure this converts correctly

## Notes

* only accept current and future dates
* when rendering a week, you query for those 7 days, determine which slots are available and render those green

```
for i = 0,...,6:
	for each availslot in avail.find({date: week.getDay(i)}):
		render availslot selected
	endfor
endfor
```

freegrid > rows (stored as duration or increment in Collection, set to 5 min to begin)

for each row in grid:
	for each day in row:
		timeslot.doSomething