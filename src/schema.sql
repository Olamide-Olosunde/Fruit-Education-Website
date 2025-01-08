CREATE TABLE IF NOT EXISTS users(
    id integer PRIMARY KEY,
    prefix text,--probably limit user input to like 10 chars
    fname text NOT NULL,--probably limit user input to like 20 chars
    lname text NOT NULL,--probably limit user input to like 20 chars
    email text NOT NULL UNIQUE,--probably limit user input to like 30 chars, or less
    dob date NOT NULL,
    gender text,
    profession text NOT NULL,--probably limit user input to like 15 chars
    about text--probably limit user input to like 50 words (or 300 chars)
    --all the probablys are for if there's enough time. They're mostly for security purposes not necessarily for the purpose of building a website for a Web Dev class
)