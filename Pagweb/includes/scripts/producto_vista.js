var id;
var producto;
$(document).ready(function () {

    if(localStorage.getItem("Usuario_iniciado")==undefined){
        $("#cerrar_sesion").css("display", "none");
    }
    else if (localStorage.getItem("Usuario_iniciado")>0)
    {
        let id_usuario_iniciado = localStorage.getItem("Usuario_iniciado");
        $.ajax({
            type: "GET",
            url: "https://localhost:7294/api/Controller_usuario/InformacionUsuario",
            async: true,
            data: {'id': id_usuario_iniciado},
            contentType: 'application/json; charset=utf-8',
            success:function(data){
                console.log(data);
                datos_usuario = data;
                $("#imagen_usuario").attr('src', datos_usuario.foto_perfil.url)
                $("#texto_usuarioo").text('Mi perfil de usuario')
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
        $("#cerrar_sesion").css("display", "block");
    };

    if (!localStorage.getItem("id_producto")) {
        window.location.href = "index.html";
    }
    id = localStorage.getItem("id_producto").replace(/['"]+/g, '');
    console.log(id);
    $.ajax({
        type: "GET",
        url: "https://localhost:7294/api/Controller_producto/InformacionProducto/" + id,
        success: function (response) {
            producto = response;
            console.log(producto);
            let precio_formato = new Intl.NumberFormat('es-CL',{
                style: 'currency',
                currency: 'CLP'
            });
            let titulo = producto.nombre;
            let precio = producto.precio;
            let caracteristicas = producto.caracteristicas;
            let imagen1 = producto.imagen1.url;
            let imagen2 = producto.imagen2.url;
            let imagen3 = producto.imagen3.url;
            let imagen4 = producto.imagen4.url;
            let imagen5 = producto.imagen5.url;;
            console.log(imagen3)
            $("#titulo").text(titulo);
            $("#precio").text(precio_formato.format(precio));
            $("#pimagen1").attr('src', imagen1);
            $("#caracteristicas").text(caracteristicas);
            $("#direccion").text(titulo);
            if(imagen2 == ""){
                $(".producto2").remove();
                $(".producto3").remove();
                $(".producto4").remove();
                $(".producto5").remove();
            }else if(imagen3 == ""){
                $(".producto3").remove();
                $(".producto4").remove();
                $(".producto5").remove();
                $("#pimagen2").attr('src', imagen2);
                
            }else if(imagen4 == ""){
                $(".producto4").remove();
                $(".producto5").remove();
                $("#pimagen2").attr('src', imagen2);
                $("#pimagen3").attr('src', imagen3);
            }else if(imagen5 == ""){
                $(".producto5").remove();
                $("#pimagen2").attr('src', imagen2);
                $("#pimagen3").attr('src', imagen3);
                $("#pimagen4").attr('src', imagen4);

            }else{
                $("#pimagen2").attr('src', imagen2);
                $("#pimagen3").attr('src', imagen3);
                $("#pimagen4").attr('src', imagen4);
                $("#pimagen5").attr('src', imagen5);

            }
        },
        error: function (error) {
            console.log(error);
            console.log("Ocurrió un error al obtener la información del producto.");
        }
    });
    localStorage.removeItem("id_producto");
});


$("#boton-añadir_carrito").click(function () {
    let id_usuario = localStorage.getItem("Usuario_iniciado");
    if(localStorage.getItem("Usuario_iniciado")== undefined ){
        id_usuario = 0;
    }
    id_producto = 3
    let data = JSON.stringify({"id_producto": id, "cantidad":1,"id":id_usuario})
    $.ajax({
        type: "POST",
        url: "https://localhost:7294/api/Controller_compras/ingreso_Producto",
        data: data,
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function (response) {
            let id = response;
            console.log("producto agregado");
            if (localStorage.getItem("Usuario_iniciado") == undefined) {
                localStorage.setItem("Usuario_iniciado",JSON.stringify(id));
                localStorage.setItem("invitado", JSON.stringify("T"))
            }
            //location.reload();
        },error: function(error){
            console.log(error);
            console.log("error inesperado");
        }
    });
    
    //localStorage.removeItem("id_producto");
});


$("#boton-comprar_ahora").click(function () {
    let id_usuario = localStorage.getItem("Usuario_iniciado");
    if(localStorage.getItem("Usuario_iniciado")== undefined ){
        id_usuario = 0;
    }
    id_producto = 3
    let data = JSON.stringify({"id_producto": id, "cantidad":1,"id":id_usuario})
    $.ajax({
        type: "POST",
        url: "https://localhost:7294/api/Controller_compras/ingreso_Producto",
        data: data,
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function (response) {
            let id = response;
            console.log("producto agregado");
            if (localStorage.getItem("Usuario_iniciado") == undefined) {
                localStorage.setItem("Usuario_iniciado",JSON.stringify(id));
                localStorage.setItem("invitado", JSON.stringify("T"))
            }
            window.location.href = "carro_compras.html";
        },error: function(error){
            console.log(error);
            console.log("error inesperado");
        }
    });
    
});


$(".login_usuario").click(function () { 
    window.location.href = "login usuario.html";
});
$("#cerrar_sesion").click(function () { 
    localStorage.clear();
    location.reload();
});