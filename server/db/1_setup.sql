DROP TABLE IF EXISTS stories;

CREATE TABLE stories (
    id serial PRIMARY KEY,
    title VARCHAR(200),
    pseudonym VARCHAR(200),
    story VARCHAR(1000) 
)
