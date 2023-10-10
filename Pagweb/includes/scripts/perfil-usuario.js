let datos_usuario;
var datos_imagen
var formData = new FormData();
$(document).ready(function () {
    if(localStorage.getItem("Usuario_iniciado") != undefined) 
    {
        let id_usuario_iniciado = localStorage.getItem("Usuario_iniciado");
        $.ajax({
            type: "GET",
            url: "https://localhost:7294/api/Controller_usuario/InformacionUsuario/"+id_usuario_iniciado,
            async: false,
            contentType: 'application/json; charset=utf-8',
            success:function(data){
                console.log(data);
                datos_usuario = data;
                $("#valnombre").val(datos_usuario.nombre);
                $("#email").val(datos_usuario.email);
                $("#Telefono").val(datos_usuario.telefono);
                $("#Dirección").val(datos_usuario.direccion);
                $("#foto_perfil").attr('src', datos_usuario.foto_perfil.url)
                $("#apellido").val(datos_usuario.apellido);
                if(datos_usuario.tipo_Usuario == 0){
                    $("body").before(
                    `<button id="boton_actualizacion">
                    actualizacion usuario
                   </button>
                   `);
                   $("#boton_actualizacion").click(function () { 
                    Swal.fire({
                        title: 'Registro Usuario',
                        html: `
                        <input type="text" id="Nombre_reg" class="swal2-input" placeholder="Nombre">
                        <br class="validadores vali_nombre"> 
                        <span class="validadores vali_nombre"> Nombre invalido </span>

                        <input type="text" id="Apellido_reg" class="swal2-input" placeholder="Apellido">
                        <br class="validadores vali_apellido"> 
                        <span class="validadores vali_apellido"> Apellido invalido </span>

                        <input type="text" id="Email_reg" class="swal2-input" placeholder="Email">
                        <br class="validadores vali_email"> 
                        <span class="validadores vali_email"> Email Invalido </span>

                        <input type="password" id="clave_reg" class="swal2-input" placeholder="Password">
                        <br class="validadores vali_contraseña"> 
                        <span class="validadores vali_contraseña"> Email Invalido </span>

                        <input type="text" id="Telefono_reg" class="swal2-input" placeholder="Telefono">
                        <br class="validadores vali_telefono"> 
                        <span class="validadores vali_telefono"> Telefono Invalido </span>

                        <input type="text" id="direccion_reg" class="swal2-input" placeholder="direccion">
                        <br class="validadores vali_direccion"> 
                        <span class="validadores vali_direccion"> Direccion Invalido </span>

                        <input type="text" id="comuna_reg" class="swal2-input" placeholder="comuna">
                        <br class="validadores vali_comuna"> 
                        <span class="validadores vali_comuna"> Comuna Invalido </span>`,
                        confirmButtonText: 'Confirmar Registro',
                        focusConfirm: false,
                        preConfirm: () => {
                            if($("#Nombre_reg").val().length <= 3 || $("#Apellido_reg").val().length <= 3 || $("#Email_reg").val().length <= 10 || 
                            $("#Telefono_reg").val().length <= 7 || isNaN($("#Telefono_reg").val()) ||$("#direccion_reg").val().length <= 5 || 
                            $("#comuna_reg").val().length <= 5 || $("#clave_reg").val().length <= 5)
                            {
                                Swal.showValidationMessage(`Ingrese la informacion correcta`);
                            }
                        }
                        }).then((result) => {
                            
                            let id_usuario =  localStorage.getItem("Usuario_iniciado");
                            let Datos_nuevos = JSON.stringify({
                                "id": id_usuario,
                                "foto_perfil": {
                                    "id": 0,
                                    "idTipoClase": 0,
                                    "nombre": "",
                                    "url": ""
                                },
                                "tipo_Usuario": 0,
                                "nombre": $("#Nombre_reg").val(),
                                "apellido": $("#Apellido_reg").val(),
                                "telefono": $("#Telefono_reg").val(),
                                "email": $("#Email_reg").val(),
                                "direccion":$("#direccion_reg").val(),
                                "comuna": $("#comuna_reg").val(),
                                "contraseña": $("#clave_reg").val()
                                
                            });
                            console.log(Datos_nuevos); 
                            if($("#Nombre_reg").val().length <= 3 || $("#Apellido_reg").val().length <= 3 || $("#Email_reg").val().length <= 10 || 
                            $("#Telefono_reg").val().length <= 7 || isNaN($("#Telefono_reg").val()) ||$("#direccion_reg").val().length <= 5 || 
                            $("#comuna_reg").val().length <= 5 || $("#clave_reg").val().length <= 5){
                                edit_incorrecto();
                            }else{
                                console.log("Validador ingreso")
                                $.ajax({
                                    type: "POST",
                                    url: "https://localhost:7294/api/Controller_usuario/Registrousuarioinvitado",
                                    data: Datos_nuevos,
                                    contentType: 'application/json; charset=utf-8',
                                    async: false,
                                    success: function (response) {
                                        console.log(response)
                                        setTimeout(function(){
                                            location.reload();
                                        }, 2000);
                                    },error: function (error){
                                        console.log(error);
                                        console.log("sucedio un error");
                                    }
                                }); 
                            }

                            
                        });

                        $("#Nombre_reg").val(datos_usuario.nombre);
                        $("#Apellido_reg").val(datos_usuario.apellido);
                        $("#Email_reg").val(datos_usuario.email);
                        $("#Telefono_reg").val(datos_usuario.telefono);
                        $("#direccion_reg").val(datos_usuario.direccion);
                        $("#comuna_reg").val(datos_usuario.comuna);
                        const nombre = document.getElementById('Nombre_reg');
                        nombre.addEventListener("blur", function (e){
                            if($("#Nombre_reg").val().length <= 3){
                                $("#Nombre_reg").css("border","solid 1px red");
                                $("#Nombre_reg").css("box-shadow","0 0 10px red");
                                $(".vali_nombre").css("display", "block");
                            }else{
                                $("#Nombre_reg").css("border","solid 1px gray");
                                $("#Nombre_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_nombre").css("display", "none");
                            }
                        });
                        const apellido = document.getElementById('Apellido_reg');
                        apellido.addEventListener("blur", function (e){
                            if($("#Apellido_reg").val().length <= 3){
                                $("#Apellido_reg").css("border","solid 1px red");
                                $("#Apellido_reg").css("box-shadow","0 0 10px red");
                                $(".vali_apellido").css("display", "block");
                            }else{
                                $("#Apellido_reg").css("border","solid 1px gray");
                                $("#Apellido_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_apellido").css("display", "none");
                            }
                        });
                        const email = document.getElementById('Email_reg');
                        email.addEventListener("blur", function (e){
                            if($("#Email_reg").val().length <= 10){
                                $("#Email_reg").css("border","solid 1px red");
                                $("#Email_reg").css("box-shadow","0 0 10px red");
                                $(".vali_email").css("display", "block");
                            }else{
                                $("#Email_reg").css("border","solid 1px gray");
                                $("#Email_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_email").css("display", "none");
                            }
                        });
                        const telefono = document.getElementById('Telefono_reg');
                        telefono.addEventListener("blur", function (e){
                            let tel = $("#Telefono_reg").val();
                            if($("#Telefono_reg").val().length <= 7 || isNaN($("#Telefono_reg").val())){
                                $("#Telefono_reg").css("border","solid 1px red");
                                $("#Telefono_reg").css("box-shadow","0 0 10px red");
                                $(".vali_telefono").css("display", "block");
                            }else{
                                $("#Telefono_reg").css("border","solid 1px gray");
                                $("#Telefono_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_telefono").css("display", "none");
                            }
                        });
                        const direccion = document.getElementById('direccion_reg');
                        direccion.addEventListener("blur", function (e){
                            if($("#direccion_reg").val().length <= 5 ){
                                $("#direccion_reg").css("border","solid 1px red");
                                $("#direccion_reg").css("box-shadow","0 0 10px red");
                                $(".vali_direccion").css("display", "block");
                            }else{
                                $("#direccion_reg").css("border","solid 1px gray");
                                $("#direccion_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_direccion").css("display", "none");
                            }
                        });
                        const comuna = document.getElementById('comuna_reg');
                        comuna.addEventListener("blur", function (e){
                            if($("#comuna_reg").val().length <= 5 ){
                                $("#comuna_reg").css("border","solid 1px red");
                                $("#comuna_reg").css("box-shadow","0 0 10px red");
                                $(".vali_comuna").css("display", "block");
                            }else{
                                $("#comuna_reg").css("border","solid 1px gray");
                                $("#comuna_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_comuna").css("display", "none");
                            }
                        });
                        const contraseña = document.getElementById('clave_reg');
                        contraseña.addEventListener("blur", function (e){
                            if($("#clave_reg").val().length <= 5 ){
                                $("#clave_reg").css("border","solid 1px red");
                                $("#clave_reg").css("box-shadow","0 0 10px red");
                                $(".vali_contraseña").css("display", "block");
                            }else{
                                $("#clave_reg").css("border","solid 1px gray");
                                $("#clave_reg").css("box-shadow","0 0 0 gray");
                                $(".vali_contraseña").css("display", "none");
                            }
                        });

                    
                    });
                    
                    
                }


            },error:function(error){
            console.log(error);
            console.log("sucedio un error");
            $('#foto_perfil').each(function(){
            if($(this)[0].naturalHeight == 0){
                $(this).attr('src','includes/img_perfil_ususario/fantasmita01.jpg');
            }
            });
            }    
        });
        $.ajax({
            type: "GET",
            url: "https://localhost:7294/api/ControllerCompra/Ordenes_de_clientes/"+id_usuario_iniciado,
            async: true,
            success: function (compras) {
                compras.forEach(com => {
                    let estado_compra;
                    let fecha_entrega_fin_formato;
                    let fecha_formato;
                    fecha_entrega_fin_formato = new Date(com.fecha_entrega);
                    fecha_formato = fecha_entrega_fin_formato.getDate()+"/"+(fecha_entrega_fin_formato.getMonth()+1)+"/"+fecha_entrega_fin_formato.getFullYear()
                    let v_span
                    console.log(com.estado_compra);
                    if(com.estado_compra == 0){
                        estado_compra = "Cancelado";
                        v_span =  `<span style="color:red; font-weight: bold; font-size: 20px;"> ${estado_compra} </span>`;
                    }
                    else if(com.estado_compra == 2){
                        estado_compra = "Aceptado";
                        v_span =  `<span style="color:#1ae427; font-weight: bold; font-size: 20px;"> ${estado_compra} </span>`;
                    }
                    else if(com.estado_compra == 3)
                    {
                        estado_compra = "Empacado";
                        v_span =  `<span style="color:#BBDC17; font-weight: bold; font-size: 20px;"> ${estado_compra} </span>`;
                    }else if(com.estado_compra == 4)
                    {
                        estado_compra = "Enviado";
                        v_span =  `<span style="color:#17DCDC; font-weight: bold; font-size: 20px;"> ${estado_compra} </span>`;
                    }
                    else
                    {
                        estado_compra = "Resivido";
                        v_span =  `<span style="color:#1732DC; font-weight: bold; font-size: 20px;"> ${estado_compra} </span>`;
                    }

                    $('#acrordion_compras').append($(`
                        <div id="${com.id_compra}" class="accordion-item-2">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" style="color:rgb(71, 182, 71)">
                                    ${v_span}
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                                <div class="row" style="width: 100%;">
                                </div>
                                <div class="accordion-body">
                                <p class="parrafo"> Compra se entregara: ${fecha_formato}</p>
                                <br>
                                <button class="btn-entrega-1" type="button"> Volver a Comprar </button>
                                </div>
                            </div>
                        </div>
                    `));
                });
                compras.forEach(com => {
                    com.lista_productos.forEach(pro => {
                        //////////variables
                        let id = 0;
                        let nombre = "";
                        let cantidad  = 0;
                        let imagen = "";
                        precio = 0;
                        cantidad = pro.cantidad;
                        precio = pro.precio * cantidad;
                        imagen = pro.imagen1.url
                        ;
                        nombre = pro.nombre;
                        id = pro.precio;
                        let precio_formato = new Intl.NumberFormat('es-CL',{
                            style: 'currency',
                            currency: 'CLP'
                        });
                        let precio_string = precio_formato.format(precio);

                        $("#"+com.id_compra).find(".row").append(`
                        <div id=${id} style="margin-top: 10px; height: 223.600px;"; class="marco-producto col-1">
                            <div>
                                <div class="bloque-agregar producto-block7">
                                    <div class="agregar-producto producto7">
                                        <h6>agregar producto <br><span class="material-symbols-outlined">add_shopping_cart</span></h6>
                                    </div>
                                    <div style="margin-top: 100px;" class="agregar-producto producto7">
                                        <h6>agregar ir carro <br><span class="material-symbols-outlined">shopping_cart_checkout</span></h6>
                                    </div>
                            </div>
                                    <img style="margin-top: 2px; height: 146px" src="${imagen}" class="img-fluid imagen_producto" alt="...">
                                </div>
                            <a href="vista_producto.html">    
                                <h4 class="descripcion-producto nombre_produto">${nombre}</h4>
                                <h5 class="descripcion-producto precio_producto">${precio_string}</h5>
                                <h6 class="descripcion-producto cantidad_producto">cantidad <span class="cantidad_numero"> ${cantidad}</span></h6>
                            </a>
                        </div>

                        `);
                    });
                });

            }
        }); 
    }else
    {
        console.log("Usuario no iniciado");
        window.location.href = "../../login usuario.html";
    }
    let id;
    
    $("#foto_perfil").click(function (e){

        Swal.fire({
        title: 'Cambio de Foto de perfil',
        html: `
        <form id="imagen" method="post" type action="/send/" enctype="multipart/form-data">
            <input type="text" id="id-us" class="swal2-input" readonly >
            <input type="file" id="cambio-imagen" accept="image/*">
        </form>
        `,
        confirmButtonText: 'Cambiar imagen',
        focusConfirm: false,
        preConfirm: () => {
            id = $("#id-us").val();
            var image = document.getElementById("cambio-imagen").files[0];
            console.log("..............")
            console.log(image);
            console.log("----------------")
            formData.append('a',id);
            formData.append('e',$('input[type=file]')[0].files[0]);
        }
        }).then((result) => {
            console.log(formData.get("a"));
            console.log(formData.get("e"));
            $.ajax({
                type: "POST",
                url: "https://localhost:7294/api/Controller_usuario/CambioDeFoto",
                processData: false,
                contentType: false,
                data: formData,
                success: function (response) {
                    console.log(response);
                    cambioFotoPerfil();
                    setTimeout(function(){
                        location.reload();
                    }, 3000);
                }
            });


        });
        $("#id-us").val(datos_usuario.id);
    });
    



});

$("#editar_info").click(function () { 
    Datos_nuevos = {
        "id": localStorage.getItem("Usuario_iniciado"),
        "foto_perfil": {
            "id": 0,
            "idTipoClase": 0,
            "nombre": "",
            "url": ""
        },
        "tipo_Usuario": 0,
        "nombre": $("#valnombre").val(),
        "apellido": $("#apellido").val(),
        "telefono": $("#Telefono").val(),
        "email":  $("#email").val(),
        "direccion":$("#Dirección").val(),
        "comuna": "",
        "contraseña": ""
    }

    $.ajax({
        type: "PUT",
        url: "https://localhost:7294/api/Controller_usuario/EditarInformacion",
        data: JSON.stringify(Datos_nuevos),
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function (response) {
            console.log(response);
            
            
        },error:function(error){
            console.log("error inesperado");
            console.log(error);
        }
    });

});

function edit_incorrecto(){

    Swal.fire({
        icon: 'error',
        title: 'La informacion no fue cambiada',
    })
}

function cambioFotoPerfil(){

    Swal.fire({
        icon: 'success',
        title: 'imagen cambiada  con exito',
    })
}


