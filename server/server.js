if (Days.find().count() === 0) {
    Days.insert({
        name: "Sunday",
        val: 0
    });
    Days.insert({
        name: "Monday",
        val: 1
    });
    Days.insert({
        name: "Tuesday",
        val: 2
    });
    Days.insert({
        name: "Wednesday",
        val: 3
    });
    Days.insert({
        name: "Thursday",
        val: 4
    });
    Days.insert({
        name: "Friday",
        val: 5
    });
    Days.insert({
        name: "Saturday",
        val: 6
    });
}
