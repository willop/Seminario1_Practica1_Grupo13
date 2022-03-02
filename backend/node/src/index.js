const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const aws = require('aws-sdk'); //aws
const aws_tools = require('../aws/bucket')
const sql = require('mssql')
const con = require('../database/conection')
require('dotenv').config();

//generar id random para imagenes
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');

//settings
app.set('port', 5000)

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json())
app.use(cors());

//routes

app.get('/', (req, res) => {
    res.send("Hola mundo");
});


app.post('/registro', (req, res) => {
    //destructurando valores
    const { username, name, password, foto } = req.body;
    console.log(username);
    console.log(name);
    console.log(password);
    //definiendo ruta de imagen
    let ruta = "fotos/" + uuidv4() + ".png";
    //insertando imagen bucket
    result = aws_tools.insertarImagenBucket(ruta, foto)

    res.json({ mensaje: result })
});


app.post('/home', async (req, res) => {
    //destructurando valores
    const { username } = req.body;
    
    let ruta = ""
    let name = ""
    let resp = 0
    try {
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .output('name', sql.NVarChar)
            .output('path', sql.NVarChar)
            .output('response', sql.Int)
            .execute(`PERFIL`);
        ruta= result.output.path
        name= result.output.name
        resp= result.output.response
    } catch (error) {
        response.json({"response": resp })
    }

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
        response.json({"response": resp })
    }
});

app.get('/prueba', async (req, res) => {
    try {
        const pool = await con;
        const result = pool.request().query(`SELECT username,name FROM seminario1.usuario`);
        const employees = result.recordset;
        res.json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
});

//exec REGISTRO 'santigo', 'Santigo de Perez', '1234', 'ruta prueba'
app.post('/prueba2', async (req, res) => {
    try {
        const { username, name, password, foto } = req.body;
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('name', name)
            .input('password', password)
            .input('path', foto)
            .output('response', sql.Int)
            .execute(`REGISTRO`);
        const r = {
            status: result.output.response
        }
        res.json(r);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//server listening
app.listen(app.get('port'), () => {
    console.log('Backend on port', app.get('port'));
});