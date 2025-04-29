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
    let currentEvents = getEvents();

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

    dropdownMenu.innerHTML = '';

    // make a dropdown item for each unique city name
    for (let i = 0; i < dropdownOptions.length; i++) {

        let cityName = dropdownOptions[i];

        // make a dropdown item
        let dropdownItem = itemTemplate.content.cloneNode(true);

        // put the city name inside the <button>
        let dropdownButton = dropdownItem.querySelector('button.dropdown-item');
        dropdownButton.innerText = cityName;

        dropdownButton.addEventListener('click', filterByCity);

        //stick that dropdown item on the page
        dropdownMenu.appendChild(dropdownItem);
    }


    document.getElementById('stats-city').innerText = 'All';
    document.getElementById('dropdown-btn').innerText = 'All Events';
    // stick those dropdown items on the page
    displayStats(currentEvents);
    displayEvents(currentEvents);
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

// parameter is an array of objects
function displayEvents(events) {

    let template = document.getElementById('event-row-template');
    let eventsTable = document.getElementById('events-table');

    eventsTable.innerHTML = '';

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        let tableRowEl = template.content.cloneNode(true);

        let eventNameCell = tableRowEl.querySelector('.evt-name');
        eventNameCell.innerText = event.event;
        // ....Add the data to the other <td's>
        let cityCell = tableRowEl.querySelector('.evt-city');
        cityCell.innerText = event.city;

        let stateCell = tableRowEl.querySelector('.evt-state');
        stateCell.innerText = event.city;

        let dateCell = tableRowEl.querySelector('.evt-date');
        let eventDate = new Date(event.date);
        dateCell.innerText = eventDate.toLocaleDateString();

        let attendanceCell = tableRowEl.querySelector('.evt-attendance');
        attendanceCell.innerText = event.attendance.toLocaleString();

        eventsTable.appendChild(tableRowEl);
    }
}


function filterByCity(clickEvent) {
    let selectedCity = clickEvent.currentTarget.innerText;

    document.getElementById('stats-city').innerText = selectedCity;
    document.getElementById('dropdown-btn').innerText = `${selectedCity} Events`;

    // get an array of ALL the events I know about
    let allEvents = getEvents();

    // make a new array of ONLY the events from 'selectedCity'
    let filteredEvents = [];

    if (selectedCity == 'All') {
        // if you selected 'All' we'll just use allEvents
        filteredEvents = allEvents;
    } else {
        for (let i = 0; i < allEvents.length; i++) {
            let event = allEvents[i];

            if (event.city == selectedCity) {
                filteredEvents.push(event);
            }
        }
    }
    // pass the filtered array to displayStats and displayEvents
    displayStats(filteredEvents);
    displayEvents(filteredEvents);
}


function saveNewEvent(formSubmitEvent) {
    // stop the form from refreshing the page
    formSubmitEvent.preventDefault();

    // get the data that was entered into the form
    let newEventForm = document.getElementById('new-event-form');
    let formData = new FormData(newEventForm);
    let newEvent = Object.fromEntries(formData.entries());

    // convert attendance from sting to number
    newEvent.attendance = parseInt(newEvent.attendance);

    // format date like the other elements
    newEvent.date = new Date(newEvent.date).toLocaleDateString();

    // save the event to local storage
    let allEvents = getEvents();
    allEvents.push(newEvent);
    saveEvents(allEvents);



    // reset out the form
    newEventForm.reset();

    // Close the Modal
    let modalElement = document.getElementById('new-event-modal');
    bootstrap.Modal.getInstance(modalElement).hide();

    // update our dropdown, update the stats, update the table
    buildDropDown();
}

/* ********* Local Storage Notes *************


- only gets saved in that specific browser
- Only saved on that specific device
- stored based on the URL
- local storage is INSECURE storage
- local storage is NOT PERMANENT
- Local storage is key-value pairs of ONLY STRINGS


********************************************* */


function getEvents() {
    // eventsAsJSON = a string or null
    let eventsAsJson = localStorage.getItem('cm-events');

    let storedEvents = [];

    if (eventsAsJson == null) {
        //there was nothing in local storage
        storedEvents = DEFAULT_EVENTS;
        saveEvents(DEFAULT_EVENTS);
    } else {
        // We found something in local storage
        storedEvents = JSON.parse(eventsAsJson);
    }

    return storedEvents;
}

function saveEvents(events) {
    let eventsAsJson = JSON.stringify(events);

    localStorage.setItem('cm-events', eventsAsJson);
}