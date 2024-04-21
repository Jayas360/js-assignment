# Event Scheduling

This project is a simple calendar application implemented using JavaScript/HTML/CSS at the frontend and Node.js at the backend. It allows users to add events to the calendar, which are then stored in a PostgreSQL database and displayed on the calendar.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd project-directory
   ```

3. Install dependencies:

   ```bash
   npm install express cors body-parser pg
   ```

   This will install the following additional libraries:
   - [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
   - [cors](https://www.npmjs.com/package/cors): Middleware for enabling CORS (Cross-Origin Resource Sharing)
   - [body-parser](https://www.npmjs.com/package/body-parser): Middleware for parsing request bodies
   - [pg](https://www.npmjs.com/package/pg): PostgreSQL client for Node.js

## Configuration

1. Set up your PostgreSQL database:

   - Create a new database named `postgres`.
   - Create a new table named `events` with the necessary columns to store event data.

2. Configure the database connection in the `db.js` file (if not already done):

   ```javascript
   const { Pool } = require('pg');

   const pool = new Pool({
       user: 'your-username',
       host: 'localhost',
       database: 'postgres',
       password: 'your-password',
       port: 5432
   });

   console.log("Database connected!");

   module.exports = pool;
   ```

## Usage

1. Run the server:

   ```bash
   node index.js
   ```

   This will start the server on port 5000 by default.

2. Use the calendar interface to add events. Events will be stored in the PostgreSQL database and displayed on the calendar.

3. If you want to view the calendar interface directly, open the `main.html` file in your web browser.

## Project Structure(Server)

- `index.js`: The main server file that configures the Express server and defines routes for handling events.
- `db.js`: Configuration file for connecting to the PostgreSQL database.
- `controllers/event.js`: Controller file for handling event-related operations.

## License

This project is licensed under the [MIT License](LICENSE).
