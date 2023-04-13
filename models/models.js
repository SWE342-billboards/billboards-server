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

  // Retrieve a specific billboard from the database by id
  findById: (id, callback) => {
    const sql = 'SELECT * FROM Billboards WHERE id = ?';
    connection.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.error('Error retrieving billboard from database:', error);
        callback(error, null);
      } else if (results.length === 0) {
        callback(new Error(`Billboard with id ${id} not found`), null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  // Update a specific billboard in the database by id
  update: (id, updates, callback) => {
    const sql = 'UPDATE Billboards SET ? WHERE id = ?';
    connection.query(sql, [updates, id], (error, results, fields) => {
      if (error) {
        console.error('Error updating billboard in database:', error);
        callback(error, null);
      } else if (results.affectedRows === 0) {
        callback(new Error(`Billboard with id ${id} not found`), null);
      } else {
        callback(null, results.changedRows);
      }
    });
  },

  // Delete a specific billboard from the database by id
  delete: (id, callback) => {
    const sql = 'DELETE FROM Billboards WHERE id = ?';
    connection.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.error('Error deleting billboard from database:', error);
        callback(error, null);
      } else if (results.affectedRows === 0) {
        callback(new Error(`Billboard with id ${id} not found`), null);
      } else {
        callback(null, results.affectedRows);
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

  getById: (id, callback) => {
    const sql = 'SELECT * FROM Users WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      const user = results[0];
      callback(null, user);
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
