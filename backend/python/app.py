from inspect import signature
from uu import encode
from flask import Flask, request, jsonify
import base64
import json
import io
import boto3
from secret import key
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
    client.put_object(Body=img,Bucket='practica1-pruebag13',Key='fotos/prueba2.jpg')
    return 'ok'



# metodo get para obtener imagenes del S3
@app.route('/home', methods=['POST'])
def getImage():
    
    s3Resource = boto3.resource(
        's3',
        aws_access_key_id=key.ACCES_KEY_ID,
        aws_secret_access_key=key.ACCES_SECRET_KEY,
        config=Config(signature_version='s3v4')
    )
    s3Resource.Bucket(key.BUCKET_NAME).download_file('fotos/default.jpg','./img/descarga.jpg');
    # apertura y conversion de imagen
    encoded = base64.b64encode(open("img/descarga.jpg", "rb").read())
    encoded_string = encoded.decode('utf-8')
    # retorno de json con la foto en base64  
    print("---------------base 64--------------\n\n\n")
    print(encoded_string)
    return {'foto':encoded_string}#str(encoded,encoding='ascii',errors='ignore')}



# inicializaicon de la aplicacion
# arrancar app con -> python app.py
# request en python 
# pip install boto3
# pip install flask
# pip install -U flask-cors
if __name__ == '__main__':
    app.run(debug=True,port=4500)