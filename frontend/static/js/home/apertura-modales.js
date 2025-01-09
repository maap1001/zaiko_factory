$(document).ready(function () {
    // Cuando se hace clic en "Registrate"
    $("#sign-up").click(function () {
        // Cierra el modal de "login"
        $("#login").modal('hide');
        // Después de que el modal de login se cierre, abre el de "register"
        $('#login').one('hidden.bs.modal', function () {
            $("#register").modal('show');
        });
    });

    // Cuando se hace clic en "Iniciar Sesión"
    $("#sign-in").click(function () {
        // Cierra el modal de "register"
        $("#register").modal('hide');
        // Después de que el modal de register se cierre, abre el de "login"
        $('#register').one('hidden.bs.modal', function () {
            $("#login").modal('show');
        });
    });

    // Cuando se hace clic en "Recuperar contrasena"
    $("#recover-password").click(function () {
        // Cierra el modal de "login"
        $("#login").modal('hide');
        // Después de que el modal de login se cierre, abre el de "recuperar contrasena"
        $('#login').one('hidden.bs.modal', function () {
            $("#recuperarContraseña").modal('show');
        });
    });

    // Cuando se hace clic en "Recuperar contrasena"
    $("#go-back-login").click(function () {
        // Cierra el modal de "recuperar contrasena"
        $("#recuperarContraseña").modal('hide');
        // Después de que el modal de recuperar contrasena se cierre, abre el de "login"
        $('#recuperarContraseña').one('hidden.bs.modal', function () {
            $("#login").modal('show');
        });
    });
});
