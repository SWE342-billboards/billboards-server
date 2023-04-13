const express = require('express');
const bodyParser = require('body-parser');
const { User, Billboard, Order, City, Status } = require('./models/models');
const apiRouter = require('./api/api');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const app = express();
app.use('/api', apiRouter);

const PORT = 3005;

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
