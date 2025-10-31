import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`);

db.exec(`
    CREATE TABLE todos (
        id INTEGER primary key AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    
`);

export default db;
