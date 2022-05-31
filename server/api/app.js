const express = require('express');
const app = express();
const cors = require('cors');
const stories = require('./routes/stories');

app.use(cors());
app.use(express.json());
app.use('/stories', storiesRoutes);

app.get('/', (req, res) => {
    res.send('Ready to tackle the challenge!?');
});

module.exports = app;
