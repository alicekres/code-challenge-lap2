const db = require('../dbConfig');

module.exports = class Story {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.pseudonym = data.pseudonym;
        this.story = data.story;
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const storyData = await db.query('SELECT * FROM stories');
                const stories = storyData.rows.map((s) => new Story(s));
                resolve(stories);
            } catch (err) {
                reject(
                    'Error retrieving stories from database! This error is from models/story!'
                );
            }
        });
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let storyData = await db.query(
                    'SELECT * FROM stories WHERE id = $1',
                    [id]
                );
                let story = new Story(storyData.rows[0]);
                resolve(story);
            } catch (err) {
                reject('Story not found! This Error is from models!');
            }
        });
    }

    static create(newStory) {
        return new Promise(async (resolve, reject) => {
            try {
                let storyData = await db.query(
                    'INSERT INTO stories(title, pseudonym, story) VALUES ($1, $2, $3) RETURNING stories;'[
                        (newStory.title, newStory.pseudonym, newStory.story)
                    ]
                );
                let story = storyData.rows[0];
                resolve(story);
            } catch (err) {
                reject('Error creating a post!');
            }
        });
    }
};
