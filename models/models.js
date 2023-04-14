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

  getBillboardByParams: (type, material, size, min_cost, max_cost, callback) => {
    const sql = 'SELECT * FROM Billboards WHERE type = ? AND material = ? AND size = ? AND costPerDay >= ? AND costPerDay <= ?';
    const values = [type, material, size, min_cost, max_cost];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error finding billboard in database:', error);
        callback(error, null);
      } else if (results.length > 0) {
        callback(null, results[0]);
      } else {
        const newBillboard = { type, material, size, costPerDay: 120 };
        Billboard.create(newBillboard, callback);
      }
    });
  }
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
};

const City = {
  getIdByName: (name, callback) => {
    const sql = 'SELECT id FROM Cities WHERE name = ?';
    const values = [name];

    connection.query(sql, values, (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) {
        // If the city does not exist in the database, create a new one
        City.create({ name: name }, (err, cityId) => {
          if (err) return callback(err);
          callback(null, cityId);
        });
      } else {
        // If the city exists, return its ID
        callback(null, results[0].id);
      }
    });
  },

  create: (city, callback) => {
    const sql = 'INSERT INTO Cities (name) VALUES (?)';
    const values = [city.name];

    connection.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM Cities';

    connection.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

const Order = {
  create: (order, callback) => {
    const sql = 'INSERT INTO Orders (billboard_id, start_date, end_date, status_id, user_id, city_id, cost) VALUES (?, ?, ?, ?, ?, ?, ?)';
      
    // Set the status_id to 'pending'
    const status_id = 1;
    const values = [order.billboard_id, order.start_date, order.end_date, status_id, order.user_id, order.city_id, order.cost];
    
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
  },

  getAllByUser: (user_id, callback) => {
    const sql = `SELECT Orders.id as order_id, Orders.start_date, Orders.end_date, 
                  Status.name as status, Cities.name as city, Billboards.costPerDay as cost,
                  Billboards.type, Billboards.material, Billboards.size
                  FROM Orders 
                  INNER JOIN Billboards ON Orders.billboard_id = Billboards.id 
                  INNER JOIN Status ON Orders.status_id = Status.id
                  INNER JOIN Cities ON Orders.city_id = Cities.id
                  WHERE Orders.user_id = ?`;
    connection.query(sql, user_id, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

module.exports = {
  User,
  Billboard,
  City,
  Order,
};  
