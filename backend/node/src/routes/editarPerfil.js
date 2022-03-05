const { Router } =require('express'); 
const router = Router();
const { v4: uuidv4 } = require('uuid');//generar id random
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd
const aws_tools = require('../../aws/bucket');

router.post('/editarPerfil', async (req, res) => {
    const { username,password,cambiarImagen,newusername,name,foto} = req.body;
    //variable que indica estado de transaccion, si se inserto 1. si no se inserto 0
    let r = 0;
    //verificando si es necesario generar nueva ruta
    let nuevaRuta = "";
    if (cambiarImagen){
        nuevaRuta = "Fotos_Perfil/" + uuidv4() + ".png";
    }

    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('password', password)
            .input('changeimage', cambiarImagen)
            .input('newusername', newusername)
            .input('newname', name)
            .input('newpath', nuevaRuta)
            .output('response', sql.Int)
            .execute(`EDITARPERFIL `);
            r = result.output.response;
    } catch (error) {
        r = 0;
    }
    
    //si se inserto en la base de datos y se quiere cambiar la imagen
    if(r ==1 && cambiarImagen == 1){
        aws_tools.insertarImagenBucket(nuevaRuta, foto);      
    }

    res.json({respuesta: r});
});

module.exports = router;