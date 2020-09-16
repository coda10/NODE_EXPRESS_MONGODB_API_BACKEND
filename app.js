// import packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// import files
const postRoute = require('./routes/posts');

// initialize the server
const app = express();

//create port to listen to
const port = 5000;

// listen on port
app.listen(port, () => console.log(`Server running on port ${port}`));

// connect to databse
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('CONNECTED TO DB'));

// body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// middleware
app.use('/posts', postRoute);

// Routes
app.get('/', (req, res) => {
    res.send('BACKEND WORKS FINE')
});

// app.get('/posts', (req, res) => {
//     res.send('We are on POST')
// });