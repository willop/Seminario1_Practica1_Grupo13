const sql = require('mssql')



const getConnection = async () => {
    try {
      const pool = await sql.connect(config);
      return pool;
    } catch (error) {
      console.error(error);
    }
};

module.exports = getConnection();