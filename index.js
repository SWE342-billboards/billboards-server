const { sequelize } = require('./models/models');
const apiRouter = require('./api/api');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRouter);

const PORT = 8001;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
});



// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
