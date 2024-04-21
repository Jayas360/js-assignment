const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'test',
    port: 5432,
    // idleTimeoutMillis: 300
});

console.log("db is connected!");


// creating events table in the database if do not exist
const query = "create table if not exists events(event_desc varchar(255),event_date varchar(12),start_time varchar(10),end_time varchar(10),event_status varchar(12) );";
    pool.query(query, (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log("table is accessible");
        }
    });

module.exports = pool;