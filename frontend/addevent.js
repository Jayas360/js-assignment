const baseURL = 'http://localhost:5000/';


// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const form = event.target;
  // Get form data
  const formData = new FormData(form);

  let date = event.target.event_date.value;
  date = date.split('-').join("");
  let data = {};

  // event.target.event_date.value = date;

  // Display form data
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  data.event_date = date;

  console.log(data);
  try {
    insertData(data);
    window.alert("Event added!");
    // delete formData;
    form.reset();
  } catch (error) {
    windows.alert.error(error);
  }
}

// Function to insert data into the database
async function insertData(data) {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  // Make a GET request
  fetch(baseURL + "addevent", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // outputElement.textContent = JSON.stringify(data, null, 2);
      console.log("data inserted successfully!");
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.error

        ('Error:', error);
    });
}

function displayForm() {
  // Create form elements
  const formContainer = document.getElementById('form-container');
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

displayForm();