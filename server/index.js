const express = require('express');
const app = express();
const port  = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
require('./config/db.js');
const event = require('./controllers/event.js');

app.use(jsonParser);
app.use(express.urlencoded({extended: true}));
app.use(cors());

// app.use('/', require('./routes'));
app.get('/events', event.fetchEvents);
app.post('/addevent', event.addEvent);
app.get('/event/:eventdate', event.fetchEventByDate);

app.listen(port, () => {
    console.log(`server running on port : ${port}`);
});

