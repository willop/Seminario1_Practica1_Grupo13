const { Router } =require('express'); 
const router = Router();

const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

router.post('/subirfoto', async (req, res) => {
    let r = [];
    try {
        const { username} = req.body;
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('response', sql.Int)
            .execute(`OBTENERALBUM`);
        r = result.recordset;
        console.log(result.recordset);
    } catch (error) {
        r = [];
    }
    res.json({respuesta: r});
});

module.exports = router;