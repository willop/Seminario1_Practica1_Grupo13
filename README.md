## Seminario 1 -  Practica1
#### Grupo13

### Integrantes

|   | NOMBRE                                      | CARNE     |
| - | ------------------------------------------- | --------- |
| 1 | Santiago Gilberto Antonio Rivadeneira Ruano | 201313722 |
| 2 | Edwin Alfredo Lopez Gomez                   | 201314007 |
| 3 | Wilfred Stewart Perez Solorzano             | 201408419 |
| 4 | Hector Josue Orozco Salazar                 | 201314296 |

# Arquitectura

<img src="images/arquitectura.png">

* Load Balancer
    <br>
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

# Bucket S3

<img src="images/bucketImagenes.png">

# EC2

# RDS

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
    <img src="images/verFoto.png">

