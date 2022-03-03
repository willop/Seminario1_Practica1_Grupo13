const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
require('dotenv').config();

//settings
app.set('port', 5000)
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json())
app.use(cors());

//ROUTES

//API HOME
app.use('/',require('./routes/home'));
//API LOGIN
app.use('/',require('./routes/login'));
//API REGISTRO
app.use('/',require('./routes/registro'));
//API EDITAR PERFIL
app.use('/',require('./routes/editarPerfil'));
//API DE PANTALLA DE CARGA SUBIR FOTO
app.use('/',require('./routes/subirFoto'));
//API QUE CARGA FOTO
app.use('/',require('./routes/cargarFoto'));
//API DE PANTALLA DE CARGA EDITAR ALBUM
app.use('/',require('./routes/editaralbum'));
//API QUE AGREGA UN NUEVO ALBUM
app.use('/',require('./routes/agregarAlbum'));
//API QUE MODIFICA UN ALBUM
app.use('/',require('./routes/modificarAlbum'));
//API QUE ELIMINA UN ALBUM
app.use('/',require('./routes/eliminarAlbum'));
//API QUE RETORNA LAS FOTOS POR ALBUM
app.use('/',require('./routes/eliminarAlbum'));



//SERVER LISTENING
app.listen(app.get('port'), () => {
    console.log('Backend on port', app.get('port'));
});


/*
const sql = require('mssql')
const con = require('../database/conection')

//generar id random para imagenes
const { v4: uuidv4 } = require('uuid');//generar id random
const { response } = require('express');

app.get('/', (req, res) => {
    res.send("Hola mundo");
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
*/