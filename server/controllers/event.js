const pool = require('../config/db.js');

module.exports.addEvent = async (req, res) => {
    console.log("add event called!");

    try {
        const data = req.body;
        const values = [data.event_desc, data.event_date, data.start_time, data.end_time, data.event_status];
        console.log("body", values);
        // Query to insert data into the database
        const query = `
        insert into events(event_desc, event_date, start_time, end_time, event_status) 
        VALUES ($1, $2, $3, $4, $5);
      `;
        const result = await pool.query(query, values);
        console.log('Data inserted successfully');
        // Return the inserted data if needed
        return res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send(error);
    }
}

module.exports.fetchEvents = async (req, res) => {
    try {
        // Query to retrieve data from the database
        const query = 'SELECT * FROM events;';

        // Execute the query
        const result = await pool.query(query);
        // console.log('Data retrieved successfully');
        // Return the retrieved data
        return res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send(error);
    }
}

module.exports.fetchEventByDate = async (req, res) => {
    const value = req.params.eventdate;
    // console.log("event date is", value)
    try {
        // Query to retrieve data from the database based on a given field value
        const query = `
        SELECT * 
        from events 
        WHERE event_date = $1;
      `;
        const result = await pool.query(query, [value]);
        // const result = await pool.query(query);
        // console.log('Data retrieved successfully');
        // Return the retrieved data
        // console.log(result.rows);
        return res.status(200).send(result.rows);
    } catch (error) {
        console.error('Error retrieving data:', error);
        return res.status(500).send(error);
    }
}