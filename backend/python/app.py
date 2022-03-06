from crypt import methods
from inspect import signature
from uu import encode
from flask import Flask, request, jsonify
import base64
import io
import boto3
import pymssql
import uuid
import json
from secret import key
from conection import conn
from botocore.config import Config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# metodo post para subir imagens a S3
@app.route('/uploadImage',methods=['POST'])
def addImage():
    img = base64.b64decode(request.json['foto'])
    buf = io.BytesIO(img)

    client = boto3.client('s3',
        aws_access_key_id=key.ACCES_KEY_ID,
        aws_secret_access_key=key.ACCES_SECRET_KEY
    )
    client.put_object(Body=img,Bucket=key.BUCKET_NAME,Key='fotos/prueba2.jpg')
    return 'ok'


#API REGISTRO DE USUARIOS
@app.route('/nuevousuario',methods=['POST'])
def newUser():
    try:
        cursor = conn.cursor()
        #generando la ruta de imagen
        ruta  = 'Fotos_Perfil/' + str(uuid.uuid4()) + '.jpg'
        #ejecutando transaccion de registro
        msg = cursor.callproc('REGISTRO', (request.json['username'],request.json['name'],request.json['password'],ruta,pymssql.output(int),))
        #cargando imagen a bucket s3 si no dio error al validar datos
        if  msg[4] == 1:
            img = base64.b64decode(request.json['foto'])
            buf = io.BytesIO(img)
            #cargando credenciales bucket
            client = boto3.client('s3',
                aws_access_key_id=key.ACCES_KEY_ID,
                aws_secret_access_key=key.ACCES_SECRET_KEY
            )
            #subiendo imagen al bucket
            client.put_object(Body=img,Bucket=key.BUCKET_NAME,Key=ruta)
        #finalizando conexion a bd
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'respuesta' : msg[4]}


#API LOGIN
@app.route('/login',methods=['POST'])
def newSession():
    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #ejecutando procedimiento para validar si usuario existe
        msg = cursor.callproc('LOGIN', (request.json['username'],request.json['password'],pymssql.output(int),))
        #finalizando conexion con bd
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'respuesta' : msg[2]}


#API HOME
@app.route('/home', methods=['POST'])
def getImage():
    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #ejecutando procedimiento para obtener perfil
        msg = cursor.callproc('PERFIL', (request.json['username'],pymssql.output(str),pymssql.output(str),pymssql.output(int),))
        #validando datos de usuario
        if msg[3] == 1:
            #cargando credenciales de bucket
            s3Resource = boto3.resource(
                's3',
                aws_access_key_id=key.ACCES_KEY_ID,
                aws_secret_access_key=key.ACCES_SECRET_KEY,
                config=Config(signature_version='s3v4')
            )
            #descargando imagen desde bucket
            s3Resource.Bucket(key.BUCKET_NAME).download_file(msg[2],'./img/descarga.jpg');
            # apertura y conversion de imagen
            encoded = base64.b64encode(open("img/descarga.jpg", "rb").read())
            encoded_string = encoded.decode('utf-8')
            #json de respuesta
            jsonRespuesta = {'username' : request.json['username'],'name' : msg[1], 'foto' : encoded_string, 'response' : msg[3] }
        else:
            #si no se encontro informacion del usuario
            jsonRespuesta = {'username' : request.json['username'],'name' : '', 'foto' : '', 'response' : msg[3] }
        #finalizando conexion con bd
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return jsonRespuesta


#API EDITAR EL PERFIL
@app.route('/editarPerfil', methods=['POST'])
def editProfile():
    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #proc: EDITARPERFIL username, password,cambiarImagen, newusername, newname, newpath, response
        ruta = '';
        save = 0;
        #si se necesita cambio de imagen 
        if request.json['cambiarImagen'] == 1 :
            ruta = nuevaRuta('Fotos_Perfil/')
        #ejecutando procedimiento para validar si usuario existe
            msg = cursor.callproc('EDITARPERFIL', (request.json['username'],request.json['password'],1,request.json['newusername'],request.json['name'],ruta,pymssql.output(int),))
            #si se ejecutan los campos con exito se sube la imagen al bucket
            if msg[6] == 1:
                #codificando imagen
                img = base64.b64decode(request.json['foto'])
                buf = io.BytesIO(img)
                #agregando credenciales de bucket
                client = boto3.client('s3',
                    aws_access_key_id=key.ACCES_KEY_ID,
                    aws_secret_access_key=key.ACCES_SECRET_KEY
                )
                #subiendo imagen a bucket
                client.put_object(Body=img,Bucket=key.BUCKET_NAME,Key=ruta)
                #respuesta para frontend, si se guardo con exito
                save = 1
            else:
                #respuesta para frontend, si no se guardo
                save = 0
        else:
            #si no se necesita cambio de imagen de perfil
            msg = cursor.callproc('EDITARPERFIL', (request.json['username'],request.json['password'],0,request.json['newusername'],request.json['name'],ruta,pymssql.output(int),))
            #si se completo la actualizacion con exito
            if msg[6] == 1:
                save = 1
            else:
                #si no se completo la actualizacion
                save = 0
        #finalizando conexion con bd
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'respuesta' : save}


#API QUE RETORNA INFORMACION PARA PANTALLA INICIAL DE CARGAR UNA FOTO
@app.route('/subirfoto',methods=['POST'])
def uploadPhoto():
    album = []
    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #ejecutando procedimiento para validar si usuario existe
        msg = cursor.callproc('OBTENERALBUM', (request.json['username'],pymssql.output(int),))
        #finalizando conexion con bd
        if msg[1] != 0:
            for row in cursor:
                #print(row[0])
                album.append({'name' : row[0]})
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'respuesta' : album}


#API QUE CARGA UNA FOTO AL ALBUM ESPECIFICADO
@app.route('/cargarfoto',methods=['POST'])
def loadPhoto():
    save = 0
    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #proc exec CARGARIMAGEN username, albumname, imagename, imagepath, response
        
        # condicion de image
        if request.json['album'] == 'Perfil de Usuario':
            # genera el id y ruta
            ruta = nuevaRuta('Fotos_Perfil/')
            #ejecutando procedimiento para validar si usuario existe
            msg = cursor.callproc('CARGARIMAGEN', (request.json['username'],request.json['album'],request.json['nombrefoto'],ruta,pymssql.output(int),))
            #si se inserto en bd exitosamente
            if msg[4] == 1:
                #convirtiendo a base64
                img = base64.b64decode(request.json['foto'])
                buf = io.BytesIO(img)
                #cargando credenciales bucket
                client = boto3.client('s3',
                    aws_access_key_id=key.ACCES_KEY_ID,
                    aws_secret_access_key=key.ACCES_SECRET_KEY
                )
                #subiendo imagen a bucket
                client.put_object(Body=img,Bucket=key.BUCKET_NAME,Key=ruta)
                save = 1
            else:
                save = 0
            #finalizando conexion con bd
            cursor.close()
        else:
            # genera el id y ruta
            ruta = nuevaRuta('Fotos_Publicadas/')
            #ejecutando procedimiento para validar si usuario existe
            msg = cursor.callproc('CARGARIMAGEN', (request.json['username'],request.json['album'],request.json['nombrefoto'],ruta,pymssql.output(int),))
            #si se inserto en bd exitosamente
            if msg[4] == 1:
                #convirtiendo a base64
                img = base64.b64decode(request.json['foto'])
                buf = io.BytesIO(img)
                #cargando credenciales bucket
                client = boto3.client('s3',
                    aws_access_key_id=key.ACCES_KEY_ID,
                    aws_secret_access_key=key.ACCES_SECRET_KEY
                )
                #subiendo imagen a bucket
                client.put_object(Body=img,Bucket=key.BUCKET_NAME,Key=ruta)
                save = 1
            else:
                save = 0
            #finalizando conexion con bd
            cursor.close()

    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'respuesta' : save}

#FUNCION QUE GENERA IDS UNICOS PARA IMAGENES
def nuevaRuta(rutaGuardado):
    ruta  = rutaGuardado + str(uuid.uuid4()) + '.jpg'
    return ruta


# API PARA LA CRECION DE UN ARBOL
@app.route('/agregaralbum',methods=['POST'])
def addAlbum():
    answer = 0
    # menejo de errores
    try:
        # conexion a la bd
        cursor = conn.cursor()
        msg = cursor.callproc('CREARALBUM  ', (request.json['username'],request.json['album'],pymssql.output(int),))  
        # comparacion de la respuesta de la bd
        if msg[2]:
            answer = 1
        else:
            answer = 0
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'reponse':answer}


# API PARA LA ELIMINACION DE ALBUM
@app.route('/eliminaralbum',methods=['POST'])
def deleteAlbum():
    answer = 0
    # menejo de errores
    try:
        # conexion a la bd
        cursor = conn.cursor()
        msg = cursor.callproc('ELIMINARALBUM', (request.json['username'],request.json['album'],pymssql.output(int),))  
        # comparacion de la respuesta de la bd
        if msg[2]:
            answer = 1
        else:
            answer = 0
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'reponse':answer}


# API PARA MODIFICAR UN ALMBUM
@app.route('/modificaralbum',methods=['POST'])
def editAlbum():
    answer = 0
    # menejo de errores
    try:
        # conexion a la bd
        cursor = conn.cursor()
        msg = cursor.callproc('MODIFICARALBUM', (request.json['username'],request.json['albumname'],request.json['newalbumname'],pymssql.output(int),))  
        # comparacion de la respuesta de la bd
        answer = msg[3]
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'reponse':answer}


# API PARA EDITAR ALBUNES
@app.route('/editaralbum', methods=['POST'])
def editarAlbunes():
    ralbum = []
    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #ejecutando procedimiento para validar si usuario existe
        msg = cursor.callproc('OBTENERALBUM', (request.json['username'],pymssql.output(int),))
        #finalizando conexion con bd
        if msg[1] != 0:
            for row in cursor:
                ralbum.append({'name' : row[0]})
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al realizar el registro: ", e)

    return {'respuesta' : ralbum}


#API PARA VER FOTOS
@app.route('/verfotos', methods=['POST'])
def verFotos():
    dataJson = []
    copia = []
    copia2 = []
    contador = 0  
    contadorAux = 0
    primero = ""
    
    tamanio = 0
    albumComparar = ""


    #cargando credenciales de bucket
    s3Resource = boto3.resource(
        's3',
        aws_access_key_id=key.ACCES_KEY_ID,
        aws_secret_access_key=key.ACCES_SECRET_KEY,
        config=Config(signature_version='s3v4')
    )

    try:
        #iniciando conexion con bd
        cursor = conn.cursor()
        #ejecutando procedimiento para validar si usuario existe
        msg = cursor.callproc('VERFOTOS', (request.json['username'],pymssql.output(int),))

        for row in cursor:
            copia.append(row)

        copia2 = copia
        # para galar los nombres de los albumens por usuario
        primero = copia[contador][0]
        # print("primer valor para comparar: ",primero)
        tamanio = len(copia)
        # print(tamanio)
        # dataJson.append({"album":primer,"fotos":1})
        # for para album
        for row2 in copia2:        

            primero = copia[contador][0]

            
            if(albumComparar!=primero):
                fotos = []
                # print("album; ---------->",primero)
                albumComparar = copia[contador][0]
                # for anidado para los fotos
                for photo in copia:
                    if primero == photo[0]:                    
                        # print("foto: ",photo[1])
                        
                        #descargando imagen desde bucket
                        s3Resource.Bucket(key.BUCKET_NAME).download_file(photo[1],'./img/descarga.jpg');
                        # apertura y conversion de imagen
                        encoded = base64.b64encode(open("img/descarga.jpg", "rb").read())
                        encoded_string = encoded.decode('utf-8')
                        # fotos.append(photo[1])
                        fotos.append(encoded_string)

                dataJson.append({'album':row2[0],'fotos':fotos})  
            
            contador+=1         
               

        
        cursor.close()
    except Exception as e:
        print("Ocurrió un error al obtener las fotos de un usuario: ", e)
    return json.dumps(dataJson)


# inicializaicon de la aplicacion
# arrancar app con -> python app.py
# request en python 
# pip install boto3
# pip install flask
# pip install -U flask-cors
#pip install -U pip
#pip install pymssql
#Se agrego el host 0.0.0.0 para conexion

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)