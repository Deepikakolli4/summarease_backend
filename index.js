const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { getTranscript } = require('./controllers/analyzerController');
const authRouter = require('./routes/authRoutes');
const connectDB = require('./db');
const router = express.Router();
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

app.get('/hello', (req, res) => {
    res.send('hello');
});

app.post('/transcript', getTranscript);
app.use('/user',authRouter)

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
connectDB();
