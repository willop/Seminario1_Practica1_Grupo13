const { Router } = require('express');
const router = Router();

const aws = require('aws-sdk'); //aws
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

router.post('/verfotos', async (req, res) => {
    //destructurando valores
    const { username } = req.body;
    let resp = [];
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('response', sql.Int)
            .execute(`VERFOTOS `);
        if (result.recordset != undefined) {
            resp = result.recordset;//parametro de salida de la bd
        }
    } catch (error) {
        res.json({ "response": resp })
    }

    //console.log(resp);

    ///AQUI ES DONDE SE TIENE QUE HACER LO DE S3, LA RESPUESTA DE LA CONSULTA VIENE EN resp
    let respuesta = [];

    //creando albums
    for (const element of resp) {
        let name = element.name;
        let album = { album : name, fotos : []}
        
        if(!respuesta.find(i => i.album===name)){
            respuesta.push(album)
        }
    }

    var S3 = new aws.S3();

    aws.config.update({
        region: process.env.REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    });

    //agregando fotos al album    
    for (const element of resp) {
        for (const element2 of respuesta) {
            if(element2.album == element.name){
                var getParams = {
                    Bucket: process.env.BUCKET_S3,
                    Key: element.path
                };      
                let cadena = await S3.getObject(getParams, function (err, data) {}).promise();
                element2.fotos.push(Buffer.from(cadena.Body).toString('base64'));
            }
        }
    }
    res.json(respuesta);
});

module.exports = router;