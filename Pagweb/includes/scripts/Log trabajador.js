$(document).ready(function () {
    if(localStorage.getItem("Usuario_iniciado") > 0){
        window.location.href="opciones-admin.html";
    }
});

 $("#ingresar").click(function (){
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
        url: "http://localhost:7294/api/Controller_usuario/inicio_trabajador",
        data: JSON.stringify(Datos),
        contentType: 'application/json; charset=utf-8'

     }).then(function (Resupuesta){
        let id = Resupuesta;
        localStorage.clear();
        localStorage.setItem("Usuario_iniciado",JSON.stringify(id));
     }).done(function(){
        console.log(localStorage.getItem("Usuario_iniciado"));
        window.location.href = "opciones-admin.html";
        console.log("usuario validado")
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
