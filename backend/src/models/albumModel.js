const db = require("../database");

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM albums", (err, albums) => {
      if (err) {
        reject(err);
      } else {
        resolve(albums);
      }
    });
  });
};

exports.findByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM albums WHERE userId = ?", [userId], (err, albums) => {
      if (err) {
        reject(err);
      } else {
        resolve(albums);
      }
    });
  });
};

exports.create = (album) => {
  const { userId, title } = album;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO albums (userId, title) VALUES (?, ?)",
      [userId, title],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...album });
        }
      }
    );
  });
};

exports.update = (id, album) => {
  const { title } = album;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE albums SET title = ? WHERE id = ?",
      [title, id],
      function (err) {
        if (err) {
          reject(new Error("Failed to update album: " + err.message));
        } else if (this.changes === 0) {
          reject(new Error("No album found with ID: " + id));
        } else {
          db.get(
            "SELECT * FROM albums WHERE id = ?",
            [id],
            function (err, row) {
              if (err) {
                reject(
                  new Error(
                    "Failed to retrieve album after update: " + err.message
                  )
                );
              } else {
                resolve(row);
              }
            }
          );
        }
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM albums WHERE id = ?", [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id });
      }
    });
  });
};
