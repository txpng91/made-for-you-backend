const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = `postgresql://${process.env.user}:${process.env.pw}@${process.env.host}:${process.env.port}/${process.env.db}`;

const client = new Pool({
  connectionString: devConfig,
});

module.exports = client;
