//funcion para que cuando el se precione el boton la pagina le entrege el metodo de pago
let id_compra;
$(document).ready(function () {
    let CarroCompra;
    let precio_formato = new Intl.NumberFormat('es-CL',{
        style: 'currency',
        currency: 'CLP'
    });

    var form = new FormData();
    let id_us = localStorage.getItem("Usuario_iniciado");
    form.append("Id_usuario", id_us);
    $.ajax({
        type: "GET",
        url: "https://localhost:7294/api/ControllerCompra/CarrodeCompra/"+id_us,
        timeout: 0,
        processData: false,
        contentType: false,
        contentType: 'application/json; charset=utf-8',
        data: {"Id_usuario": id_us},
        async: true,
        success: function (response) {
            console.log(response);
            $("#total-item").text(response.cantidadProductos);
            $("#total-item1").text(response.cantidadProductos);
            $("#total-compra1").text("Subtotal: "+precio_formato.format(response.subTotal));
            $("#total-sin-descuento").text("Total: "+precio_formato.format(response.total));
            $("#descuento").text("Descuento: "+precio_formato.format(response.descuento));
            $("#total-item2").text(response.cantidadProductos);
            id_compra = response.id_compra;
            CarroCompra = response;
            response.lista_productos.forEach(pro => {
            let imagen1 = pro.imagen1.url
            console.log(pro.precio*pro.cantidad);
            $("#bloque_productos").prepend(`
            <div class="col-12">
                <div  class="item">
                    <section id="item-contenido${pro.id}" class="container">
                        <div class="row">
                            <div class="col-4 imagen-producto">
                                <img src="${imagen1}" alt="producto1">
                                <h6 class="precio">Precio: </h6>
                                <p class="valor"><span id="valor1">${precio_formato.format((pro.precio*pro.cantidad))}</span></p>
                            </div>
                            <div class="col-2">
                                <div class="row"><br></div>
                                <div class="row" style="color: whitesmoke;"><h4>${pro.nombre}</h4> </div>
                                <div class="row desc"><p>${pro.caracteristicas}</p></div>
                            </div>
                            <!-- contador de productos en donde se sumara o restan las unidades -->
                            <div class="col">
                                <div class="indicador no-marcar">
                                    <span id="${pro.id}" class="material-symbols-outlined mas_producto" style="float: left; color: whitesmoke; cursor: pointer;">
                                        add
                                    </span>
                                    <span id="contador${pro.id}" style="color: whitesmoke ; text-align: center; padding-left: 7px;">${pro.cantidad}</span>
                                    <span id="m${pro.id}" class="material-symbols-outlined menos_producto" style="float: right; color: whitesmoke; cursor: pointer;">
                                        remove
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            `);
            $('body').on('click', "#"+pro.id, function(){
                id = $(this).attr('id');
                id_cliente = localStorage.getItem("Usuario_iniciado");
                console.log(id);
                console.log(id_cliente);
                $.ajax({
                    type: "POST",
                    url: "https://localhost:7294/api/ControllerCompra/ingreso_Producto",
                    data: JSON.stringify({"id_producto": id, "cantidad":1,"id":id_cliente}),
                    contentType: 'application/json; charset=utf-8',
                    async: true,
                    success: function (response) {
                        console.log(response)
                        location.reload();
                    },error: function (error){
                        console.log(error);
                        console.log("sucedio un error");
                    }
                });
              });
              $('body').on('click', "#m"+pro.id, function(){
                let id_str = $(this).attr('id')
                let id_producto = id_str.substring(1)
                let id_cliente = localStorage.getItem("Usuario_iniciado");
                console.log(id_producto);
                let datos_menus = {"id_producto": id_producto, "cantidad":1,"id":id_cliente}
                $.ajax({
                    type: "PUT",
                    url: "https://localhost:7294/api/ControllerCompra/EliminarProducto",
                    data: JSON.stringify(datos_menus),
                    contentType: 'application/json; charset=utf-8',
                    async: true,
                    success: function (response) {
                        console.log(response)
                        location.reload();
                    },error: function (error){
                        console.log(error);
                        console.log("sucedio un error");
                    }
                });
              });

            });
        }
    });
});

$("#boton-cupon").click(function () { 
    Swal.fire({
        title: 'Ingrese su cupon',
        html: `<input type="text" id="cupon" class="swal2-input" placeholder="Cupon">`,
        confirmButtonText: 'Confirmar cupon',
        focusConfirm: false,
      }).then((result) => {
        let cupon = $("#cupon").val();
        console.log(cupon);
        let Cupon_json = {"id_compra":id_compra,"cupon": cupon}
        $.ajax({
            type: "Post",
            url: "https://localhost:7294/api/Controllercompras/IngresoDeCupon",
            data: JSON.stringify(Cupon_json),
            contentType: 'application/json; charset=utf-8',
            async:  true,
            success: function (response) {
                show_alerta_susesful();
                setTimeout(function(){
                    location.reload();
                }, 2000);
            },
            error: function (response){
                console.log(response);
                show_alerta_error();
                
            }
        });

      })
});
function show_alerta_error(){

    Swal.fire({
        icon: 'error',
        title: 'Cupon no valido',
        text: 'Verifique el estado del cupon',
    })
}
function show_alerta_susesful(){

    Swal.fire({
        icon: 'success',
        title: 'Cupon valido',
        text: 'Cupon ingresado con exito',
    })
}

$("#pago_credito").click(function () { 
    compra = {"id_usuario": localStorage.getItem("Usuario_iniciado"), "id_compra":id_compra};
    $.ajax({
        type: "POST",
        url: "https://localhost:7294/api/ControllerCompra/ConfimacionDeCompra",
        data: JSON.stringify(compra),
        contentType: 'application/json; charset=utf-8',
        async:  true,
        success: function (response) {
            console.log(response);
            show_alerta_compra_correcta();
            setTimeout(function(){
                window.location.href = "../../perfil-usuario.html";
            }, 3000);
        },error: function (error){
            console.log(error);
            show_alerta_compra_error();
            setTimeout(function(){
                location.reload();
            }, 3000);
        }
    });
});

function show_alerta_compra_correcta(){

    Swal.fire({
        icon: 'success',
        title: 'Compra procesada',
        text: 'El id de la compra es:'+id_compra,
    })
}
function show_alerta_compra_error(){

    Swal.fire({
        icon: 'error',
        title: 'Compra fallida',
        text: 'Verifique que el usuario este correcto',
    })
}

try {
    $(".boton1").click(function() { 
        $(".compras-cuadro").stop().animate({
            height: "256px"
    },1500);
        $(".bloques-compras").css("display", "block");
        $(this).css("display", "none");
        $("#barra1").css("display","block");
    });
    $("#boton-credito").click(function() { 
        $(".compras-cuadro").stop().animate({
            height: "600px"
    },1500);
        $("#caja-pago").css("display", "block");
        $(".boton2").css("display", "none");
        $("#barra1").css("display","none");
        $("#bloque_paypal").css("margin-top", "270px");
        let icono = document.getElementById("boton-credito");
        icono.textContent = "keyboard_control_key"; 
    });
    $("#boton-paypal").click(function() { 
        $("#bloque_paypal").stop().animate({
            height: "100px"
    },1500);
        $("#paypal-bloque").css("display", "block");
    
        let icono = document.getElementById("boton-paypal");
        icono.textContent = "keyboard_control_key"; 
    });
    //para pantallas pequeñas
    $(".boton3").click(function() { 
        $(".bloque-compra2").stop().animate({
            height: "590px"
    },1500);
        $("#caja-pago2").css("display", "block");
        $(this).css("display", "none");
        $('#credito-pequeño').css("display", "block");
        $('.bloque-creditopequeño').css("display", "block");
        $('#paypal-pequeño').css('display','block')
    });
    //bloque de ayuda para compra ingreso de tarjeta fecha
    $("#ayuda-fecha").mouseenter(function(){
        $("#bloque-ayuda-fecha").css("display","block")
    });
    $("#ayuda-fecha").mouseleave(function(){
        $("#bloque-ayuda-fecha").css("display","none")
    });
    //bloque de ayuda para compra ingreso de tarjeta cvv
    $("#ayuda-cvv").mouseenter(function(){
        $("#bloque-ayuda-cvv").css("display","block")
    });
    $("#ayuda-cvv").mouseleave(function(){
        $("#bloque-ayuda-cvv").css("display","none")
    });
    //bloque de ayuda para compra ingreso de tarjeta numero tarjeta
    $("#ayuda-num").mouseenter(function(){
        $("#bloque-ayuda-num").css("display","block")
    });
    $("#ayuda-num").mouseleave(function(){
        $("#bloque-ayuda-num").css("display","none")
    
    });
} catch (error) {
    
}