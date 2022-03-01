import pymssql
from secret import key

try:
    conn = pymssql.connect(key.direccion_servidor, key.nombre_usuario, key.password,key.nombre_bd,autocommit=True)
    print("Conexion a base de datos py exitosa")
except Exception as e:
    print("Ocurrió un error al conectar a SQL Server: ", e)