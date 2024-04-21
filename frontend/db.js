const baseURL = 'http://localhost:5000/'

// Query the database
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error executing query', err.stack);
//   } else {
//     console.log('Query result:', res.rows[0]);
//   }

//   // Close the pool to end the connection
//   pool.end();
// });

function createtable() {
    const query = "create table events(event_desc varchar(255),event_date varchar(12),start_time varchar(10),end_time varchar(10),event_status varchar(12) );";
    pool.query(query, (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Query result:', res.rows[0]);
        }
    });
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
    fetch(baseURL+"addevent", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            outputElement.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error

                ('Error:', error);
        });
}

// Function to retrieve data from the database
async function retrieveData() {
    try {
        // Query to retrieve data from the database
        const query = 'SELECT * FROM your_table_name;';

        // Execute the query
        const result = await pool.query(query);
        console.log('Data retrieved successfully');
        return result.rows; // Return the retrieved data
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}

// Function to retrieve data from the database based on a given field value
async function retrieveDataByField(field, value) {
    try {
        // Query to retrieve data from the database based on a given field value
        const query = `
        SELECT * 
        FROM your_table_name 
        WHERE ${field} = $1;
      `;
        const result = await pool.query(query, [value]);
        console.log('Data retrieved successfully');
        return result.rows; // Return the retrieved data
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw error;
    }
}

module.exports = {
    createtable,
    insertData,
    retrieveData,
    retrieveDataByField
};
