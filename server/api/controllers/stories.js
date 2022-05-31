const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const Story = require('../models/story');

app.get('/', async (req, res) => {
    try {
        const stories = await Story.all;
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const storyId = req.params.id;
        let storyData = await Story.findById(storyId);
        res.status(200).json(storyData);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/', async (req, res) => {
    try {
        let storyData = req.body;
        let newStory = await Story.create(storyData);
        res.status(201).json(newStory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;
