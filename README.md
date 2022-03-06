## Seminario 1 -  Practica1
#### Grupo13

### Integrantes

|   | NOMBRE                                      | CARNE     |
| - | ------------------------------------------- | --------- |
| 1 | Santiago Gilberto Antonio Rivadeneira Ruano | 201313722 |
| 2 | Edwin Alfredo Lopez Gomez                   | 201314007 |
| 3 | Wilfred Stewart Perez Solorzano             | 201408419 |
| 4 | Hector Josue Orozco Salazar                 | 201314296 |

## Link de la pagina
http://practica1-g13-paginaweb.s3-website.us-east-2.amazonaws.com/

# Arquitectura

<img src="images/arquitectura.png">

* Load Balancer
    <br>Se implementó un servicio Classic Load Balancer el cual se hace el balanceo de carga hacia las instancias, ec2, en las que se encuentra alojados los servicios del backend de nodejs y python. 
* EC2
    <br>Fueron utilizadas para realizar los servidores del backend, en los cuales uno fue implementado en NodeJS y el otro en python.   
* Bucket Imagenes
    <br>Bucket es el contenedor que Amazon S3 nos proporciona para el almacenamiento de objetos
    tales como archivos y metadatos 

    La apliacion FAUNADEX tendra la utilizacion de un bucket de Amazon S3 para el almacenamiento 
    de las imagenes utilzadas por los usuarios dentro de esta aplicacion, con el fin de tener
    un pyme desentralizado y publico, para el acceso de las diferentes API'S implementadas para
    este servicio, asi poder tener un resguardo de los datos con un nivel de integridad y 
    confiabilidad, disponibilidad de estos mismo

* Base de Datos
    <br>Se utilizó una base de datos tradicional RDS con un servidor SQL Server en el cual se diseñó un modelo relacional y se crearon procedimientos almacenados en los que se realizaron transacciones para el manejo de los datos.

# Usuarios IAM
* Usuario S3
Se creo un usuario con permisos de acceso a S3 para la gestion del Bucket en donde se encuentran las imagenes y paginas web, perteneciente al gurpo practica1-G13-S3.
El permiso utilizado para este usuario es: AmazonS3FullAcces
<img src="images/IAM1Imagenes.png">

* Usuario ec2
Se creo un usuario con permisos de acceso a ec2 con la cual se gestiono cada una de las vpc en las que se encuentran alojando los servidores de nodejs y python correspondientes, perteneciente al gurpo practica1-G13-S3.
El permiso utilizado para este usuario es: AmazonEC2FullAcces
<img src="images/IAM2Imagenes.png">

# Bucket S3

<img src="images/bucketImagenes.png">

# EC2
* Instancia utilizada para montaje del servidor de nodejs.
<img src="images/ec2nodejs.png">
* Instancia utilizada para montaje del servidor de python.
<img src="images/ec2python.png">

# RDS
Se creo un usuario con permisos de acceso a la base de datos relacional utilizando la base de datos de SQLserver, perteneciente al gurpo practica1-G13-S3.
El permiso utilizado para este usuario es: AmazonRDSFullAccess
<img src="images/rdsImagenes.png">
<img src="images/modeloRelacional.png">

# Aplicacion Web

* Login
    <img src="images/login.png">
* Registro
    <img src="images/registro.png">
* Pantalla Inicio
    <img src="images/inicio.png">
* Editar Perfil
    <img src="images/editarPerfil.png">
* Editar Album
    <img src="images/editarAlbum.png">
* Subir Foto
    <img src="images/subirFoto.png">
* Ver Foto
    <img src="images/verFotos.png">

