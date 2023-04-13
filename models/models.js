const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'billboards',
});

// Define the Billboard model
const Billboard = {
  // Add a new billboard to the database
  create: (billboard, callback) => {
    const sql = 'INSERT INTO Billboards SET ?';
    connection.query(sql, billboard, (error, results, fields) => {
      if (error) {
        console.error('Error adding billboard to database:', error);
        callback(error, null);
      } else {
        callback(null, results.insertId);
      }
    });
  },

  // Retrieve all billboards from the database
  findAll: (callback) => {
    const sql = 'SELECT * FROM Billboards';
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error('Error retrieving billboards from database:', error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },
};

const User = {
  create: (user, callback) => {
    const sql = 'INSERT INTO Users (email, password, type) VALUES (?, ?, ?)';
    const values = [user.email, user.password, user.type];

    connection.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  },

  getByEmailAndPassword: (email, password, callback) => {
    const sql = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    connection.query(sql, [email, password], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      const user = results[0];
      callback(null, user);
    });
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM Users';
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error('Error retrieving billboards from database:', error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  },
};

// module.exports = Billboard;
module.exports = {
  User,
  Billboard,
  // Order,
  // City,
  // Status
};  
