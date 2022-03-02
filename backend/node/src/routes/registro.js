const { Router } =require('express'); 
const router = Router();

const { v4: uuidv4 } = require('uuid');//generar id random
const aws_tools = require('../../aws/bucket');
const sql = require('mssql');//sql server node
const con = require('../../database/conection');//conexion bd

router.post('/nuevousuario', async (req, res) => {
    //destructurando valores
    const { username, name, password, foto } = req.body;
    //definiendo ruta de imagen
    let ruta = "fotos/" + uuidv4() + ".png";
    let r = 0;
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('name', name)
            .input('password', password)
            .input('path', ruta)
            .output('response', sql.Int)
            .execute(`REGISTRO`);
        //si se registro en la bd se inserta imagen en bucket
        r = result.output.response
    } catch (error) {
        res.json({
            respuesta: r
        });
    }
    //si se registro con exito el usuario
    if(r){
        //insertando imagen bucket
        result = aws_tools.insertarImagenBucket(ruta, foto);
    }
    //respondiendo front
    res.json({respuesta: r});
});

module.exports = router;