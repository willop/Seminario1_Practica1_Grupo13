----------------------------------------------------------------------------------
-- REGISTRO ----------------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC REGISTRO
    @username nvarchar(20),
    @name nvarchar(max),
    @password nvarchar(16),
    @path nvarchar(max),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario no exista
            declare @iduser int
            select @iduser = idUser from seminario1.usuario where username = @username
            if @iduser is not null
            begin
                print 'ERROR: usuario existente'
                goto ERROR
            end

            -- inserto el usuario
            insert into seminario1.usuario(username, name, password)
            values(@username, @name, @password)

            ----------------------------------------------------------------------------------
            -- ALBUM -------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- creo el album
            select @iduser = idUser from seminario1.usuario where username = @username
            insert into seminario1.album(name, idUser)
            values('Perfil de Usuario', @iduser)

            ----------------------------------------------------------------------------------
            -- IMAGEN ------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- creo la imagen para
            declare @idAlbum int
            select @idAlbum = al.idAlbum from seminario1.album as al where al.idUser = @iduser and al.name = 'Perfil de Usuario'
            insert into seminario1.imagen(path, name, idAlbum, status)
            values(@path, 'Foto de Perfil', @idAlbum, 1)

            print 'registro exitoso'
            set @response = 1
            commit
            goto FIN

        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;


----------------------------------------------------------------------------------
-- LOGIN -------------------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC LOGIN
    @username nvarchar(20),
    @password nvarchar(16),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @pass nvarchar(16)
            select @pass = password from seminario1.usuario where username = @username
            if @pass is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- PASSWORD ----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico la contraseña
            if @pass <> @password
            begin
                print 'ERROR: contraseña invalida'
                goto ERROR
            end

            print 'login exitoso'
            set @response = 1
            commit
            goto FIN

        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- PERFIL ------------------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC PERFIL
    @username nvarchar(20),
    @name nvarchar(max) output,
    @path nvarchar(max) output,
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @user nvarchar(16)
            select @user = password from seminario1.usuario where username = @username
            if @user is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- Datos -------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            select @name = name from seminario1.usuario where username = @username

            select @path = im.path from seminario1.usuario us
            inner join seminario1.album as al on al.idUser = us.idUser
            inner join seminario1.imagen as im on al.idAlbum = im.idAlbum and im.status = 1
            where us.username = @username

            set @response = 1
            commit
            goto FIN

        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- EDITAR PERFIL -----------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC EDITARPERFIL
    @username nvarchar(20),
    @password nvarchar(16),
    @changeimage int,
    @newusername nvarchar(20),
    @newname nvarchar(max),
    @newpath nvarchar(max),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @pass nvarchar(16)
            select @pass = password from seminario1.usuario where username = @username
            if @pass is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- PASSWORD ----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico la contraseña
            if @pass <> @password
            begin
                print 'ERROR: contraseña invalida'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- ACTUALIZACION -----------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- usuario
            update seminario1.usuario set username = @newusername, name = @newname where username = @username

            -- imagen
            if @changeimage = 1
            begin
                declare @idImage int
                select @idImage = im.idImage from seminario1.usuario us
                inner join seminario1.album as al on al.idUser = us.idUser
                inner join seminario1.imagen as im on al.idAlbum = im.idAlbum and im.status = 1
                where us.username = @username

                update seminario1.imagen set path = @newpath where idImage = @idImage
            end

            set @response = 1
            commit
            goto FIN
        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- OBTENER ALBUM -----------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC OBTENERALBUM
    @username nvarchar(20),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @pass nvarchar(16)
            select @pass = password from seminario1.usuario where username = @username
            if @pass is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            set @response = 1

            select al.name from seminario1.usuario us
            inner join seminario1.album as al on al.idUser = us.idUser
            where us.username = @username

            commit
            goto FIN

        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- CARGAR IMAGEN -----------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC CARGARIMAGEN
    @username nvarchar(20),
    @albumname nvarchar(max),
    @imagename nvarchar(max),
    @imagepath nvarchar(max),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @pass nvarchar(16)
            select @pass = password from seminario1.usuario where username = @username
            if @pass is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- ALBUM -------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            declare @idAlbum int
            select @idAlbum = al.idAlbum from seminario1.usuario us
            inner join seminario1.album as al on al.idUser = us.idUser
            where us.username = @username and al.name = @albumname
            if @idAlbum is null
            begin
                print 'ERROR: album invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- IMAGEN ------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            declare @checkimage int
            select @checkimage = count(*) from seminario1.imagen as im
            where im.name = @imagename and im.idAlbum = @idAlbum
            group by idAlbum
            if @checkimage is not null
            begin
                print 'ERROR: nombre de imagen invalido'
                goto ERROR
            end

            insert into seminario1.imagen(path, name, idAlbum, status)
            values(@imagepath, @imagename, @idAlbum, 0)

            set @response = 1
            commit
            goto FIN
        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- CREAR ALBUM -------------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC CREARALBUM
    @username nvarchar(20),
    @newalbumname nvarchar(max),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @idUser nvarchar(16)
            select @idUser = idUser from seminario1.usuario where username = @username
            if @idUser is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- ALBUM -------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            declare @idAlbum int
            select @idAlbum = al.idAlbum from seminario1.usuario us
            inner join seminario1.album as al on al.idUser = us.idUser
            where us.idUser = @idUser and al.name = @newalbumname
            if @idAlbum is not null
            begin
                print 'ERROR: album invalido'
                goto ERROR
            end

            insert into seminario1.album(name, idUser)
            values(@newalbumname, @idUser)

            set @response = 1
            commit
            goto FIN
        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- ELIMINAR ALBUM ----------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC ELIMINARALBUM
    @username nvarchar(20),
    @albumname nvarchar(max),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @idUser nvarchar(16)
            select @idUser = idUser from seminario1.usuario where username = @username
            if @idUser is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- ALBUM -------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            declare @idAlbum int
            select @idAlbum = al.idAlbum from seminario1.usuario us
            inner join seminario1.album as al on al.idUser = us.idUser
            where us.idUser = @idUser and al.name = @albumname
            if @idAlbum is null
            begin
                print 'ERROR: album invalido'
                goto ERROR
            end

            delete from seminario1.imagen
            where idAlbum = @idAlbum

            delete from seminario1.album
            where idAlbum = @idAlbum

            set @response = 1
            commit
            goto FIN
        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- MODIFICAR ALBUM ---------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC MODIFICARALBUM
    @username nvarchar(20),
    @albumname nvarchar(max),
    @newalbumname nvarchar(max),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @idUser nvarchar(16)
            select @idUser = idUser from seminario1.usuario where username = @username
            if @idUser is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- ALBUM -------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            declare @idAlbum int
            select @idAlbum = al.idAlbum from seminario1.usuario us
            inner join seminario1.album as al on al.idUser = us.idUser
            where us.idUser = @idUser and al.name = @albumname
            if @idAlbum is null
            begin
                print 'ERROR: album invalido'
                goto ERROR
            end

            update seminario1.album
            set name = @newalbumname
            where idUser = @idUser and idAlbum = @idAlbum

            set @response = 1
            commit
            goto FIN
        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;

----------------------------------------------------------------------------------
-- VER FOTOS ---------------------------------------------------------------------
----------------------------------------------------------------------------------
CREATE PROC VERFOTOS
    @username nvarchar(20),
    @response int output
AS
BEGIN TRAN
    BEGIN TRY
        INICIO:
            ----------------------------------------------------------------------------------
            -- USUARIO -----------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            -- verifico que el usuario exista
            declare @idUser nvarchar(16)
            select @idUser = idUser from seminario1.usuario where username = @username
            if @idUser is null
            begin
                print 'ERROR: usuario invalido'
                goto ERROR
            end

            ----------------------------------------------------------------------------------
            -- ALBUMS ------------------------------------------------------------------------
            ----------------------------------------------------------------------------------
            select al.name, im.path from seminario1.usuario as us
            inner join seminario1.album al on us.idUser = al.idUser
            inner join seminario1.imagen im on al.idAlbum = im.idAlbum
            where us.idUser = @idUser
            order by al.name desc

            set @response = 1
            commit
            goto FIN
        ERROR:
            set @response = 0
            rollback

        FIN:
    END TRY
    BEGIN CATCH
        print error_message()
        set @response = 0
        rollback
    END CATCH;








    exec VERFOTOS 'edwin', 3

    exec MODIFICARALBUM 'edwin', 'Perfil de Usuario', 'Perfil', 3
    exec ELIMINARALBUM 'edwin', 'historias', 3
    exec CREARALBUM  'edwin', 'historias', 3
    exec CARGARIMAGEN 'edwin', 'historias', 'foto3', 'fotos/d7ebd2ce-1414-4058-9b03-83052ef1ac82.jpg', 3
    exec OBTENERALBUM 'edwin', 3
    exec EDITARPERFIL 'root', '12345sss', 1, 'admin', 'administrador', 'fotos/d7ebd2ce-1414-4058-9b03-83052ef1ac82.jpg', 3

    drop proc VERFOTOS