const db = require('./initdb');
const fs = require('fs');

const seeds = fs.readFileSync(__dirname + '/seed.sql').toString();

db.query(seeds, () => console.log('Dev database seeded'));
