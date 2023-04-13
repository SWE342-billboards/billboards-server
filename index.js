const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./api/api');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api', apiRouter);
app.use(bodyParser.json());

const PORT = 3005;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
