const { sequelize } = require('./models');
const apiRouter = require('./api/api');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`);
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    });
});