const db = require("../database");

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT u.*, a.street, a.suite, a.city, a.zipcode, a.lat, a.lng,
                     c.name as companyName, c.catchPhrase, c.bs
                     FROM users u
                     LEFT JOIN addresses a ON u.id = a.userId
                     LEFT JOIN companies c ON u.id = c.userId`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          rows.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: {
              street: user.street,
              suite: user.suite,
              city: user.city,
              zipcode: user.zipcode,
              geo: {
                lat: user.lat,
                lng: user.lng,
              },
            },
            phone: user.phone,
            website: user.website,
            company: {
              name: user.companyName,
              catchPhrase: user.catchPhrase,
              bs: user.bs,
            },
          }))
        );
      }
    });
  });
};

exports.create = (user) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, username, email, phone, website) VALUES (?, ?, ?, ?, ?)",
      [user.name, user.username, user.email, user.phone, user.website],
      function (err) {
        if (err) {
          reject(err);
        } else {
          const userId = this.lastID;
          db.run(
            "INSERT INTO addresses (userId, street, suite, city, zipcode, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              userId,
              user.address.street,
              user.address.suite,
              user.address.city,
              user.address.zipcode,
              user.address.geo.lat,
              user.address.geo.lng,
            ],
            (err) => {
              if (err) {
                reject(err);
              }
            }
          );
          db.run(
            "INSERT INTO companies (userId, name, catchPhrase, bs) VALUES (?, ?, ?, ?)",
            [
              userId,
              user.company.name,
              user.company.catchPhrase,
              user.company.bs,
            ],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  id: userId,
                  ...user,
                });
              }
            }
          );
        }
      }
    );
  });
};

exports.update = (id, user) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET name = ?, username = ?, email = ?, phone = ?, website = ? WHERE id = ?",
      [user.name, user.username, user.email, user.phone, user.website, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          db.run(
            "UPDATE addresses SET street = ?, suite = ?, city = ?, zipcode = ?, lat = ?, lng = ? WHERE userId = ?",
            [
              user.address.street,
              user.address.suite,
              user.address.city,
              user.address.zipcode,
              user.address.geo.lat,
              user.address.geo.lng,
              id,
            ],
            (err) => {
              if (err) {
                reject(err);
              }
            }
          );
          db.run(
            "UPDATE companies SET name = ?, catchPhrase = ?, bs = ? WHERE userId = ?",
            [user.company.name, user.company.catchPhrase, user.company.bs, id],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve({
                  id,
                  ...user,
                });
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
    db.run("DELETE FROM companies WHERE userId = ?", id, (err) => {
      if (err) {
        reject(err);
      }
      db.run("DELETE FROM addresses WHERE userId = ?", id, (err) => {
        if (err) {
          reject(err);
        }
        db.run("DELETE FROM users WHERE id = ?", id, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ id });
          }
        });
      });
    });
  });
};
