// const { sequelize } = require('./models/models');
const apiRouter = require('./api/api');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api', apiRouter);

const PORT = 8005;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    // await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
});
