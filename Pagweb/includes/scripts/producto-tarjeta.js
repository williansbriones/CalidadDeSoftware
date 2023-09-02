$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://localhost:7294/api/Controller_Producto/ObtenerTodosLosProductos",
        success: function (response) {
            console.log(response);
            let productos = response; // Array de productos obtenidos
            let precio_formato = new Intl.NumberFormat("es-ES", { style: "currency", currency: "CLP" });

            productos.forEach(function (producto) {
                let id_producto = producto.id;
                let tipo_producto = producto.tipo_producto;

                if (tipo_producto == 1) {
                    tipo_producto = "mouse";
                } else if (tipo_producto == 2) {
                    tipo_producto = "note";
                } else if (tipo_producto == 3) {
                    tipo_producto = "video";
                } else if (tipo_producto == 4) {
                    tipo_producto = "pc";
                } else if (tipo_producto == 5) {
                    tipo_producto = "monitor";
                } else if (tipo_producto == 6) {
                    tipo_producto = "tablet";
                } else if (tipo_producto == 7) {
                    tipo_producto = "teclado";
                } else if (tipo_producto == 8) {
                    tipo_producto = "otros";
                }

                console.log(id_producto);
                $("#seccion_productos_tarjetas").append(`
          <div id="${id_producto}" class="col-3 Productos ${tipo_producto}">
            <div class="tarjeta_producto">
              <img src="${producto.imagen1.url}" class="img-fluid" alt="producto">
              <div class="card-body">
                <h5 class="card_title1">${producto.nombre} ${tipo_producto}</h5>
                <p class="card_text1">${producto.caracteristicas}</p>
                <h4 class="card_price1">${precio_formato.format(producto.precio)}</h4>
              </div>
            </div>
          </div>
        `);

                $('body').on('click', "#" + id_producto, function () {
                    console.log("hizo click");
                    id = $(this).attr('id');
                    console.log(id);
                    localStorage.removeItem("id_producto");
                    localStorage.setItem("id_producto", JSON.stringify(id));
                    console.log(localStorage.getItem("id_producto"));
                    window.open("vista_producto.html");
                });
            });
        },
        error: function (error) {
            console.log(error);
            console.log("Un error ocurrió al obtener los productos.");
        }
    });

    $("#filtro1").click(function () {
        $(".Productos").hide();
        $(".mouse").show();
        console.log("mouse");
    });

    $("#filtro2").click(function () {
        $(".Productos").hide();
        $(".note").show();
        console.log("note");
    });

    $("#filtro3").click(function () {
        $(".Productos").hide();
        $(".video").show();
        console.log("video");
    });

    $("#filtro4").click(function () {
        $(".Productos").hide();
        $(".pc").show();
        console.log("pc");
    });

    $("#filtro5").click(function () {
        $(".Productos").hide();
        $(".monitor").show();
        console.log("monitor");
    });

    $("#filtro6").click(function () {
        $(".Productos").hide();
        $(".tablet").show();
        console.log("tablet");
    });

    $("#filtro7").click(function () {
        $(".Productos").hide();
        $(".teclado").show();
        console.log("teclado");
    });

    $("#filtro8").click(function () {
        $(".Productos").hide();
        $(".otros").show();
        console.log("otros");
    });

    $("#filtro9").click(function () {
        $(".Productos").show();
        console.log("todos");
    });
});
