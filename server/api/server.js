const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const storyRoutes = require('./controllers/stories');

app.use('/', storyRoutes);

module.exports = app;
