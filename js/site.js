const DEFAULT_EVENTS = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// generate the drop down menu items
// for each unique city in our events
function buildDropDown() {

    // get a list of all our events we know about
    let currentEvents = DEFAULT_EVENTS; // TODO: add new events???

    // get a list of just the city names
    let cities = [];

    for (let i = 0; i < currentEvents.length; i++) {
        let event = currentEvents[i];
        cities.push(event.city);
    }

    // de-duplicate the list of city names / aka just the UNIQUE cities
    let uniqueCities = new Set(cities);

    // for each unique city name...
    let dropdownOptions = ['All', ...uniqueCities];

    let itemTemplate = document.getElementById('dropdown-item-template');
    let dropdownMenu = document.getElementById('city-dropdown');

    // make a dropdown item for each unique city name
    for (let i = 0; i < dropdownOptions.length; i++) {

        let cityName = dropdownOptions[i];

        // make a dropdown item
        let dropdownItem = itemTemplate.content.cloneNode(true);

        // put the city name inside the <button>
        let dropdownButton = dropdownItem.querySelector('button.dropdown-item');
        dropdownButton.innerText = cityName;

        //stick that dropdown item on the page
        dropdownMenu.appendChild(dropdownItem);
    }
    // stick those dropdown items on the page
    displayStats(currentEvents);
}


function displayStats(events) {
    // parameter 'events' is an array of event objects

    let totalAttendance = 0;
    let maxAttendance = 0;
    let minAttendance = events[0].attendance;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        totalAttendance = totalAttendance + event.attendance;

        if (event.attendance > maxAttendance) {
            maxAttendance = event.attendance;
        }
        if (event.attendance < minAttendance) {
            minAttendance = event.attendance;
        }
    }

    let averageAttendance = Math.round(totalAttendance / events.length);

    document.getElementById('stats-total').innerText = totalAttendance.toLocaleString();
    document.getElementById('stats-max').innerText = maxAttendance.toLocaleString();
    document.getElementById('stats-min').innerText = minAttendance.toLocaleString();
    document.getElementById('stats-average').innerText = averageAttendance.toLocaleString();
}


function displayTable(events) {

    let rowTemplate = document.getElementById('event-row-template')

}
