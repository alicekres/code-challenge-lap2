const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const Story = require('../models/story');

app.get('/', async (req, res) => {
    try {
        const stories = await Story.all;
        res.status(200).send(stories);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/:id', async (req, res) => {
    try {
        const storyId = req.params.id;
        let storyData = await Story.findById(storyId);
        res.status(200).send(storyData);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/', async (req, res) => {
    try {
        let storyData = req.body;
        let newStory = await Story.create(storyData);
        res.status(201).send(newStory);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;
