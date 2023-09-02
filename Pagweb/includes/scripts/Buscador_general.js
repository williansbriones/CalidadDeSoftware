$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://localhost:7294/api/Controller_producto/BuscarProducto/" + nombre,
        success: function (producto) {
            console.log(producto);
            $('#buscar input').on('input', function () {
                var textoBusqueda = $(this).val().toLowerCase().trim();

                $('.tarjeta_producto').each(function () {
                    var nombreProducto = $(this).find('.card_title1').text().toLowerCase();

                    if (nombreProducto.includes(textoBusqueda)) {
                        // Redirigir a la página de productos con el producto encontrado
                        var idProducto = $(this).attr('id');
                        localStorage.setItem('id_producto', idProducto);
                        window.location.href = 'productos.html';
                        return false; // Detener la iteración después de encontrar el primer producto coincidente
                    }
                });
            });
        },
        error: function (error) {
            console.log(error);
            console.log("Un error ocurrió al buscar el producto.");
        }
    });
});
