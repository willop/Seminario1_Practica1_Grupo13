const { Router } =require('express');
const router = Router();

const aws = require('aws-sdk'); //aws
const sql = require('mssql')//sql server node
const con = require('../../database/conection')//conexion bd

router.post('/verfotos', async (req, res) => {
    //destructurando valores
    const { username } = req.body;
    let resp = []
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('response', sql.Int)
            .execute(`VERFOTOS `);
            if ( result.recordset != undefined){
                resp = result.recordset;//parametro de salida de la bd
            } 
    } catch (error) {
        res.json({"response": resp })
    }
    ///AQUI ES DONDE SE TIENE QUE HACER LO DE S3, LA RESPUESTA DE LA CONSULTA VIENE EN resp
    if (resp) {
        var S3 = new aws.S3();

        aws.config.update({
            region: process.env.REGION,
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        });

        var getParams =
        {
            Bucket: process.env.BUCKET_S3,
            Key: ruta
        };

        S3.getObject(getParams, function (err, data) {
            if (err) {
                result = err;
            } else {
                result = Buffer.from(data.Body).toString('base64')
                res.json({ username: username, name: name, foto: result, response: resp })
            }
        });
    } else {
        res.json({"response": resp })
    }
});

module.exports = router;