const { Router } =require('express'); 
const router = Router();
const { v4: uuidv4 } = require('uuid');//generar id random
const aws_tools = require('../../aws/bucket');
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

router.post('/cargarfoto', async (req, res) => {
    
    //variable que valida transaccion
    let r = 0;
    //insercion en bd
    const { username,nombrefoto,album,foto} = req.body;

    let ruta = "";

    if(album == "Perfil de Usuario"){
        //generando ruta de foto publicada
        ruta = "Fotos_Perfil/" + uuidv4() + ".png";
    }else{
        //generando ruta de foto publicada
        ruta = "Fotos_Publicadas/" + uuidv4() + ".png"; 
    }

    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('albumname', album)
            .input('imagename', nombrefoto)
            .input('imagepath', ruta)
            .output('response', sql.Int)
            .execute(`CARGARIMAGEN`);
            r = result.output.response;
    } catch (error) {
        r = 0;
    }

    if (r){
        result = aws_tools.insertarImagenBucket(ruta, foto);
    }
    res.json({respuesta : r})
});

module.exports = router;