// Web server
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// HOLD OFF FOR NOW Router: /v1/api
app.use('/api/v1', require('./api'));

// Listener
app.listen(port, () => {
  console.log(`Server has started on ${port}.`);
});
