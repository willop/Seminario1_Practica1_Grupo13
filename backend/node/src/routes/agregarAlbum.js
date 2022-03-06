const { Router } =require('express'); 
const router = Router();

const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

//API QUE AGREGA UN NUEVO ALBUM AL USUARIO
router.post('/agregaralbum', async (req, res) => {
    let r = 0;
    try {
        const {username,album} = req.body;
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('newalbumname', album)
            .output('response', sql.Int)
            .execute(`CREARALBUM`);
        r = result.output.response
    } catch (error) {
        r = 0;
    }
    res.json({reponse: r});
});

module.exports = router;