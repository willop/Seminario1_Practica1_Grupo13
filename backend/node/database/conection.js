const sql = require('mssql')
require ('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
};


const getConnection = async () => {
    try {
      const pool = await sql.connect(config);
      return pool;
    } catch (error) {
      console.error(error);
    }
};

module.exports = getConnection();