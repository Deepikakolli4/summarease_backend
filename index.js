const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getTranscript } = require('./controllers/authController');

const app = express();

app.use(cors({
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Define routes
app.get("/", (req, res) => {
    res.send("Hello, Vercel!");
});

app.post('/hello', (req, res) => {
    res.send('hello');
});

app.post('/transcript', getTranscript);

module.exports = app; // ✅ Export the Express app
