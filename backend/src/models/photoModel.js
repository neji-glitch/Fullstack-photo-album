const db = require("../database");

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM photos", (err, photos) => {
      if (err) {
        reject(err);
      } else {
        resolve(photos);
      }
    });
  });
};

exports.findByAlbumId = (albumId) => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM photos WHERE albumId = ?",
      [albumId],
      (err, photos) => {
        if (err) {
          reject(err);
        } else {
          resolve(photos);
        }
      }
    );
  });
};

exports.create = (photo) => {
  const { albumId, title, url, thumbnailUrl } = photo;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO photos (albumId, title, url, thumbnailUrl) VALUES (?, ?, ?, ?)",
      [albumId, title, url, thumbnailUrl],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...photo });
        }
      }
    );
  });
};

exports.update = (id, photo) => {
  const { title, url, thumbnailUrl } = photo;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE photos SET title = ?, url = ?, thumbnailUrl = ? WHERE id = ?",
      [title, url, thumbnailUrl, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...photo });
        }
      }
    );
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM photos WHERE id = ?", [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id });
      }
    });
  });
};

exports.findPhotoById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM photos WHERE id = ?", [id], (err, photos) => {
      if (err) {
        reject(err);
        console.log("error ye man");
      } else {
        resolve(photos);
        console.log("mchet s7i7a")
      }
    });
  });
};
