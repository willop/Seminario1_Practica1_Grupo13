const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const aws = require('aws-sdk'); //aws
const sql = require('mssql')
const con = require('../database/conection')

//generar id random para imagenes
const { v4: uuidv4 } = require('uuid');

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
    
    //id unico para la foto
    const idFoto =  uuidv4();
    console.log(username);
    console.log(name);
    console.log(password);

    //ruta imagen default
    let ruta = "fotos/" + "default"+ ".jpg";
    
    //validando si la foto viene vacia
    if (foto.length > 0){
        ruta = "fotos/" + idFoto+ ".png"; 
    }

    //se convierte la base64 a bytes
    const buff = new Buffer.from(foto, 'base64');
    
    //credenciales aws
   

    //conexion bucket
    var s3 = new aws.S3();
    const params = {
        Bucket: "practica1-pruebag13",
        Key: ruta,
        Body: buff,
        ContentType: "image"
    };

    const putResult = s3.putObject(params).promise();
    
    res.json({ mensaje: putResult })
});


app.post('/home',(req,res)=>{

    //destructurando valores
    const { username } = req.body;
    console.log(username);
    //falta obtener ruta de imagen en bd

    let ruta = "fotos/" + "default"+ ".jpg";
   
    

    var S3 = new aws.S3();

    var getParams =
    {
        Bucket: "practica1-pruebag13",
        Key: ruta
    };

    S3.getObject(getParams, function (err, data) {
        if (err) {
            res.json(error)
        } else {
            var dataBase64 = Buffer.from(data.Body).toString('base64');
            console.log("--------------- base 64-----------------");
            console.log(dataBase64);

            res.json({ foto: dataBase64 })
        }
    });
});

app.get('/prueba',async(req,res)=> {
    try {
        const pool = await con;
        const result = await pool.request().query(`SELECT username,name FROM seminario1.usuario`);
        const employees = result.recordset;
        res.json(employees);
    } catch (error) {
        res.status(500).json(error);
    }
});

//exec REGISTRO 'santigo', 'Santigo de Perez', '1234', 'ruta prueba'
app.post('/prueba2',async(req,res)=>{
    try {
        const { username, name, password, foto } = req.body;
        const pool = await con;
        const result = await pool.request()
            .input('username', username)
            .input('name',name)
            .input('password',password)
            .input('path',foto)
            .output('response',sql.Int)
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