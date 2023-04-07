const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: '127.0.0.1',
  port: 8008,
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('customer', 'manager'),
    allowNull: false,
    defaultValue: 'customer'
  }
});

const Billboard = sequelize.define('billboard', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  costPerDay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('1-sided', '2-sided', '3-sided'),
    allowNull: false
  },
  material: {
    type: Sequelize.ENUM('digital', 'painted'),
    allowNull: false
  }
});

const Status = sequelize.define('status', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prerequisite_status_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'status',
      key: 'id'
    }
  },
  name: {
    type: Sequelize.ENUM('pending', 'wait for payment', 'approved', 'canceled'),
    allowNull: false
  }
});

const City = sequelize.define('city', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  billboard_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'billboard',
      key: 'id'
    }
  },
  start_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  status_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'status',
      key: 'id'
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  city_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'city',
      key: 'id'
    }
  }
});

sequelize.sync()
  .then(() => {
    console.log('Users, billboards, statuses, cities, and orders tables created');
  })
  .catch((error) => {
    console.error('Error creating users, billboards, statuses, cities, and orders tables:', error);
  });

module.exports = {
  User,
  Billboard,
  Order,
  City,
  Status
};  
