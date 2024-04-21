
const details = [{
    "event_desc": "abc",
    "event_date": "2024-04-19",
    "start_time": "12:00",
    "end_time": "14:00",
    "event_status": "open"
}];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthOfYear = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let today = new Date();
const tableHead = document.querySelector('thead tr');
const tableBody = document.querySelector('tbody');
const nextWeekBtn = document.getElementById('next-week-btn');
const prevWeekBtn = document.getElementById('prev-week-btn');

// Generate initial calendar
generateCalendar(today);

// Add event listener to the button to change the calendar to the next week
nextWeekBtn.addEventListener('click', () => {
    today.setDate(today.getDate() + 7); // Move to the next week
    generateCalendar(today);
});

// Add event listener to the button to change the calendar to previous week
prevWeekBtn.addEventListener('click', () => {
    today.setDate(today.getDate() - 7); // Move to the next week
    generateCalendar(today);
});


// Function to generate the weekly schedule
async function generateCalendar(date) {
    tableHead.innerHTML = ''; // Clear previous days of the week
    tableBody.innerHTML = ''; // Clear previous calendar body

    tableHead.innerHTML += `<th> </th>`;
    const currentDate = new Date(date);
    // Generate days of the week in the table header
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + i);
        // console.log(currentDate.getDate());
        tableHead.innerHTML += `<th>${daysOfWeek[currentDate.getDay()]} ${currentDate.getDate()} ${monthOfYear[currentDate.getMonth()]}</th>`;
    }

    // Generate rows for each hour in the table body
    for (let hour = 1; hour <= 24; hour++) {
        let row = `<tr><td>${hour}:00</td>`; // Hour column
        // Generate columns for each day of the week

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + i);
            let cdate = currentDate.getDate();
            let cmonth = currentDate.getMonth() + 1;
            if (cmonth < 10) cmonth = "0" + cmonth;
            if (cdate.length == 1) cdate = "0" + cdate;
            let dateString = currentDate.getFullYear() + cmonth + cdate;
            // const current_class = "" + currentDate.getYear() + currentDate.getDay() + currentDate.getMonth(); 

            //fetching data for current cell
            let events = "";
            if (hour == 1) {
                console.log(dateString);
                console.log("retrieving data for cell");
                const data = await retrieveDataByField(dateString);
                // console.log(`data for ${dateString} is`, JSON.parse(data).length);
                events = buildEvent(JSON.parse(data));
            }
            if (hour < 10) dateString += "0";
            dateString = dateString + hour;
            row += `<td class = hour-cell id = ${dateString}>${events}</td>`;
        }
        // row += '</tr>';
        tableBody.innerHTML += row;
    }
    // loadData(keys);
}

// async function loadData(keys) {
//     console.log("Inside load function");
//     keys.forEach(async (element) => {
//         const date = element.slice(0, 8);
//         console.log(date);
//         const data = await retrieveDataByField(date);
//         console.log(`data for ${date} is`, data);
//     });
// }


function buildEvent(data) {
    let row = '<div>';
    // console.log("data type is", typeof data);
    for (let i = 0; i < data.length; ++i) {
        row += '<div>';
        row += `<p class = event> ${data[i].event_desc} <br/> ${data[i].start_time} to ${data[i].end_time} <br/> ${data[i].event_status} </p>`;
        row += '</div>';
    }
    row += '</div>';
    return row;
}

// Adding click listener to the table cells having class 'hour-cell' and unique id's
document.querySelectorAll('.hour-cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const cellId = cell.id;
        console.log(`cell id is ${cellId}`);
    })
})

function getEvents(date) {
    date = date.slice(1);
}

// const baseURL = 'http://localhost:5000/';


// Function to retrieve data from the database based on a given field value
async function retrieveDataByField(value) {
    const apiUrl = `http://localhost:5000/event/${value}`;
    const myHeaders = {
        "Content-Type": "application/json",
        "Accept": "*/*"
    };

    const options = {
        method: "GET",
        headers: myHeaders
    };

    const data = await fetch(apiUrl, options);
    const details = await data.text();
    console.log(details);
    return details;
}

function showForm() {
  const formContainer = document.getElementById('add-event-form');
  const form = document.createElement('form');
  form.id = 'event-form';
  form.addEventListener('submit', handleSubmit); // Add submit event listener

  // Event Description
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Event Description:';
  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.name = 'event_desc';
  descriptionInput.required = true;
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(document.createElement('br'));

  // Date
  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Date:';
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.name = 'event_date';
  dateInput.required = true;
  form.appendChild(dateLabel);
  form.appendChild(dateInput);
  form.appendChild(document.createElement('br'));

  // Starting Time
  const startTimeLabel = document.createElement('label');
  startTimeLabel.textContent = 'Starting Time:';
  const startTimeInput = document.createElement('input');
  startTimeInput.type = 'time';
  startTimeInput.name = 'start_time';
  startTimeInput.required = true;
  form.appendChild(startTimeLabel);
  form.appendChild(startTimeInput);
  form.appendChild(document.createElement('br'));

  // Ending Time
  const endTimeLabel = document.createElement('label');
  endTimeLabel.textContent = 'Ending Time:';
  const endTimeInput = document.createElement('input');
  endTimeInput.type = 'time';
  endTimeInput.name = 'end_time';
  endTimeInput.required = true;
  form.appendChild(endTimeLabel);
  form.appendChild(endTimeInput);
  form.appendChild(document.createElement('br'));

  // Event Status
  const statusLabel = document.createElement('label');
  statusLabel.textContent = 'Event Status:';
  const statusSelect = document.createElement('select');
  statusSelect.name = 'event_status';
  statusSelect.required = true;
  const openOption = document.createElement('option');
  openOption.value = 'open';
  openOption.textContent = 'Open';
  statusSelect.appendChild(openOption);
  const closedOption = document.createElement('option');
  closedOption.value = 'closed';
  closedOption.textContent = 'Closed';
  statusSelect.appendChild(closedOption);
  form.appendChild(statusLabel);
  form.appendChild(statusSelect);
  form.appendChild(document.createElement('br'));

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  form.appendChild(submitButton);

  // Append form to container
  formContainer.appendChild(form);
}

showForm();


