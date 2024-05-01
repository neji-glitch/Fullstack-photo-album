const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./myapidb.sqlite", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Database connected.");
    // Creating users table
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, username TEXT, email TEXT, phone TEXT, website TEXT)",
      (err) => {
        if (err) {
          console.error("Error creating table users " + err.message);
        }
      }
    );
    // Creating addresses table
    db.run(
      "CREATE TABLE IF NOT EXISTS addresses (userId INTEGER, street TEXT, suite TEXT, city TEXT, zipcode TEXT, lat TEXT, lng TEXT, FOREIGN KEY(userId) REFERENCES users(id))",
      (err) => {
        if (err) {
          console.error("Error creating table addresses " + err.message);
        }
      }
    );
    // Creating companies table
    db.run(
      "CREATE TABLE IF NOT EXISTS companies (userId INTEGER, name TEXT, catchPhrase TEXT, bs TEXT, FOREIGN KEY(userId) REFERENCES users(id))",
      (err) => {
        if (err) {
          console.error("Error creating table companies " + err.message);
        }
      }
    );
    // Creating albums table
    db.run(
      "CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, title TEXT, FOREIGN KEY(userId) REFERENCES users(id))",
      (err) => {
        if (err) {
          console.error("Error creating table albums " + err.message);
        }
      }
    );
    // Creating photos table
    db.run(
      "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, albumId INTEGER, title TEXT, url TEXT, thumbnailUrl TEXT, FOREIGN KEY(albumId) REFERENCES albums(id))",
      (err) => {
        if (err) {
          console.error("Error creating table photos " + err.message);
        }
      }
    );
  }
});

module.exports = db;
