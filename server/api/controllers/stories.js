const Story = require('../models/story');

const index = async (req, res) => {
    try {
        const stories = await Story.all;
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ err });
    }
};

const show = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        res.status(200).json(story);
    } catch (err) {
        res.status(404).json({ err });
    }
};

const create = async (req, res) => {
    try {
        const story = await Story.create(req.body);
        res.status(201).json(story);
    } catch (err) {
        res.status(422).json({ err });
    }
};

module.exports = { index, show, create };
