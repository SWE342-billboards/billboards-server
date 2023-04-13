const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'billboards',
});

const Billboard = {
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

const City = {
  create: (city, callback) => {
    const sql = 'INSERT INTO Cities (name) VALUES (?)';
    const values = [city.name];

    connection.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  }
};

const Status = {
  create: (status, callback) => {
    const sql = 'INSERT INTO Status (prerequisite_status_id, name) VALUES (?, ?)';
    const values = [status.prerequisite_status_id, status.name];

    connection.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  },
}

const Order = {
  create: (order, callback) => {
    const sql = 'INSERT INTO Orders (billboard_id, start_date, end_date, status_id, user_id, city_id) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [order.billboard_id, order.start_date, order.end_date, order.status_id, order.user_id, order.city_id];

    connection.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM Orders';
    connection.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = {
  User,
  Billboard,
  City,
  Status,
  Order,
};  
