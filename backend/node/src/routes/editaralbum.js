const { Router } =require('express'); 
const router = Router();

const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd
//API DE PANTALLA INICIAL DE EDITAR ALBUM
router.post('/editaralbum', async (req, res) => {
    let r = [];
    try {
        const { username} = req.body;
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('response', sql.Int)
            .execute(`OBTENERALBUM`);
        if ( result.recordset != undefined){
            r = result.recordset;
        }
    } catch (error) {
        r = [];
    }
    res.json({respuesta: r});
});

module.exports = router;