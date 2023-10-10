$(document).ready(function () {
    if(localStorage.getItem("Usuario_iniciado")==undefined){
        $("#cerrar_sesion").css("display", "none");
    }
    else if (localStorage.getItem("Usuario_iniciado")>0)
    {
        let id_usuario_iniciado = localStorage.getItem("Usuario_iniciado");
        $.ajax({
            type: "GET",
            url: "https://localhost:7294/api/Controller_usuario/InformacionUsuario/"+id_usuario_iniciado,
            async: true,
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
    }
    id_pro = 1
    let precio_formato = new Intl.NumberFormat('es-CL',{
        style: 'currency',
        currency: 'CLP'
    });
    $.ajax({
        type: "GET",
        url: "https://localhost:7294/api/Controller_producto/ProductosMasivo",
        async: true,
        success: function (response){
            console.log(response);
            let producto = response;
            for (let index = 0; index < 7; index++) {
                imagen = producto[index].imagen1.url;
                console.log(imagen);
                nombre = producto[index].nombre;
                precio = producto[index].precio;
                id_producto = producto[index].id;
                tipo_producto = producto[index].tipo_producto;
                console.log(tipo_producto);
                let nombre_tipo_producto
                if(tipo_producto == 2){
                nombre_tipo_producto = "note";
                }else if(tipo_producto == 3) {
                    nombre_tipo_producto = "video";
                }
                $("#seccion_productos").append(`
                <div class="productos_generales ${nombre_tipo_producto} marco-producto col-1" style="height: 260px;">
                    <div>
                        <div  class="bloque-agregar producto-block1">
                            <div class="agregar-producto producto1">
                                <h6>agregar producto <br><span class="material-symbols-outlined">add_shopping_cart</span></h6>
                        </div>
                            <div style="margin-top: 100px;" class="agregar-producto producto1">
                                <h6>agregar ir carro <br><span class="material-symbols-outlined">shopping_cart_checkout</span></h6>
                            </div>
                        </div>
                            <img src="${imagen}" class="img-fluid " alt="...">
                    </div id="vista_productos">
                    <div href="vista_producto.html">
                        <h4 style="z-index: 11;"  id="${id_producto}" class="descripcion-producto">${nombre}</h4>
                        <h5 style="z-index: 11;" id="${id_producto}" class="descripcion-producto">${precio_formato.format(precio)}</h5>
                        <h6 style="z-index: 11;" id="${id_producto}" class="descripcion-producto">precio normal</h6>
                    </div>
                </div>
                `);

                $('body').on('click', "#"+id_producto, function(){
                        console.log("hizo click");
                        id = $(this).attr('id');
                        console.log(id);
                        localStorage.setItem("id_producto", JSON.stringify(id));
                        console.log(localStorage.getItem("id_producto"));
                        window.open("vista_producto.html");

                });


            }

        },error: function (error){
            console.log(error);
            console.log("un error ocurrio");
        }
    });

    $("#vista_productos").click(function () { 
        console.log("hizo click");
        
    });


});

$(".login_usuario").click(function () { 
    window.location.href = "login usuario.html";
});
$("#cerrar_sesion").click(function () { 
    localStorage.clear();
    location.reload();
});


$("#wsp").hover(function() {
    $("#gmail").stop().animate({
        opacity: 0.2
    },500);
    $("#ig").stop().animate({
        opacity: 0.2
    },500);
  },
  function(){  
    $("#ig").stop().animate({
        opacity: 1
    },500);
    $("#gmail").stop().animate({
        opacity: 1
    },500);
    
});
//animacion de la parte inferior de gmail
$("#gmail" ).hover(function() {
    $("#wsp").stop().animate({
        opacity: 0.2
    },500);
    $("#ig").stop().animate({
        opacity: 0.2
    },500);
  },
  function(){  
    $("#ig").stop().animate({
        opacity: 1
    },500);
    $("#wsp").stop().animate({
        opacity: 1
    },500);
    
});
//animacion de la parte inferior de ig
$("#ig" ).hover(function() {
    $("#wsp").stop().animate({
        opacity: 0.2
    },500);
    $("#gmail").stop().animate({
        opacity: 0.2
    },500);
  },
  function(){  
    $("#gmail").stop().animate({
        opacity: 1
    },500);
    $("#wsp").stop().animate({
        opacity: 1
    },500);
    
});
//animacion de la parte inferior de ubi1
$("#ubi1" ).hover(function() {
    $("#ubi2").stop().animate({
        opacity: 0.2
    },500);
  },
  function(){  
    $("#ubi2").stop().animate({
        opacity: 1
    },500);
    
});
//animacion de la parte inferior de ubi2
$("#ubi2" ).hover(function() {
    $("#ubi1").stop().animate({
        opacity: 0.2
    },500);
  },
  function(){  
    $("#ubi1").stop().animate({
        opacity: 1
    },500);
    
});
$(".boton-animacion" ).hover(function() {
    $(".boton-animacion").stop().animate({
        opacity: 0.2
    },500);
    $(this).stop().animate({
        opacity: 1
    },500);
  },
  function(){  
    $(".boton-animacion").stop().animate({
        opacity: 1
    },500);
});

$("#prueba").click(function () {
    let id_usuario = localStorage.getItem("Usuario_iniciado");
    if(localStorage.getItem("Usuario_iniciado")== undefined ){
        id_usuario = 0;
    }
    id_producto = 3
    let data = JSON.stringify({"id_producto": id_producto, "cantidad":1,"id":id_usuario})
    console.log(id_usuario);
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
            location.reload();
        },error: function(error){
            console.log(error);
            console.log("error inesperado");
        }
    });
    
});

