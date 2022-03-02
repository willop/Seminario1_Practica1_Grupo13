const { Router } =require('express'); 
const router = Router();

const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

router.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body;
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('password', password)
            .output('response', sql.Int)
            .execute(`LOGIN`);
        res.json({
                    respuesta: result.output.response
                });
    } catch (error) {
        res.json({
            respuesta: 0
        });
    }
});

module.exports = router;