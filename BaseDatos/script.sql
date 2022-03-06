create database practica1_semi1
go

use practica1_semi1
go

create schema seminario1
go

use practica1_semi1
go
    create table seminario1.usuario (
        idUser int identity constraint usuario_pk primary key,
        username nvarchar(20) not null,
        name nvarchar(max) not null,
        password nvarchar(max) not null
    )
go
    create table seminario1.album (
        idAlbum int identity constraint album_pk primary key,
        name nvarchar(max) not null,
        idUser int not null constraint fk_idUser references seminario1.usuario
    )
go
    create table seminario1.imagen (
        idImage int identity constraint imagen_pk primary key,
        path nvarchar(max) not null,
        name nvarchar(max) not null,
        idAlbum int not null constraint fk_idAlbum references seminario1.album,
        status bit
    )
go