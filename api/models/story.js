class Story {
    constructor(data) {
        this.id = data.id;
        this.pseudonym = data.pseudonym;
        this.title = data.title;
        this.story = data.story;
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const storyData = await db.query('SELECT * FROM stories');
                const stories = storyData.rows.map((s) => new Story(s));
                resolve(stories);
            } catch (err) {
                reject('Error retrieving dogs');
            }
        });
    }

    static findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let storyData = await db.query(
                    'SELECT * FROM stories JOIN users ON stories.user_id = user.id WHERE stories.id = $1',
                    [id]
                );

                let story = new Story(storyData.rows[0]);
                resolve(story);
            } catch (err) {
                reject('Story not found');
            }
        });
    }

    static create(title, story) {
        return new Promise(async (resolve, reject) => {
            try {
                let storyData = await db.query(
                    'INSERT INTO stories(title, pseudonym, story) VALUES ($1, $2, $3) RETURNING *;',
                    [title, pseudonym, story]
                );
                let newStory = new Story(storyData.rows[0]);
                resolve(newStory);
            } catch (err) {
                reject('Error creating a dog');
            }
        });
    }
}
