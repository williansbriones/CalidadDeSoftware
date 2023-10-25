$(document).ready(function () {
    if(localStorage.getItem("Usuario_iniciado")!=undefined){
        window.location.href = "../../perfil-usuario.html";
    }
});

 $("#iniciosesion").click(function (){
    Datos = {
        "id": 0,
        "foto_perfil": {
            "id": 0,
            "idTipoClase": 0,
            "nombre": "",
            "url": ""
        },
        "tipo_Usuario": 0,
        "nombre": "",
        "apellido": "",
        "telefono": "",
        "email": $('#usuario').val(),
        "direccion": "",
        "comuna": "",
        "contraseña": $('#clave').val()
    }
    var $descripocion = $('<p class="aviso" style="color:yellow;" >Clave incorrecta</p>');

     console.log(Datos);
    $.ajax({
        type: "POST",
        url: "http://localhost:7294/api/Controller_usuario/Inicio_Sesion",
        data: JSON.stringify(Datos),
        contentType: 'application/json; charset=utf-8',
        async: false

     }).then(function (Resupuesta){
        let id = Resupuesta;
        localStorage.clear();
        localStorage.setItem("Usuario_iniciado",JSON.stringify(id));
     }).done(function(){
        console.log(localStorage.getItem("Usuario_iniciado"));
        window.location.href = "perfil-usuario.html";
        
     }).fail(function(){
        localStorage.clear();
        show_alerta();
        $('.aviso').remove();
        $('#login_usuario_registrado').find('#ayuda_contraseña').after($descripocion);
     });
});


function show_alerta(){

    Swal.fire({
        icon: 'error',
        title: 'Usuario o clave incorrecta',
        text: 'Intente nuevamente iniciar sesion verifique que la clave o el usuario sean correctos',
    })
}


$("#registrar_usuario").click(function () { 
    Datos = JSON.stringify({
        "id": 0,
        "foto_perfil": {
            "id": 0,
            "idTipoClase": 0,
            "nombre": "",
            "url": ""
        },
        "tipo_Usuario": 0,
        "nombre": $("#nombre").val(),
        "apellido": $("#apellido").val(),
        "telefono": $("#telefono_registro").val(),
        "email": $('#correo_registro').val(),
        "direccion": $("#direccion").val(),
        "comuna": $("#comuna").val(),
        "contraseña": $('#clave_registro').val()
    });
    console.log(Datos);
    $.ajax({
        type: "POST",
        url: "http://localhost:7294/api/Controller_usuario/CrearUsuario",
        data: Datos,
        contentType: 'application/json; charset=utf-8',
        async: true, 
        success: function (response) {
            let id=response;
            localStorage.clear();
            localStorage.setItem("Usuario_iniciado",JSON.stringify(id));
            console.log(localStorage.getItem("Usuario_iniciado"));
            window.location.href = "perfil-usuario.html";
        },
        error: function (error){
            console.log(error);
            console.log("sucedio un error");
        }
    });
    
});