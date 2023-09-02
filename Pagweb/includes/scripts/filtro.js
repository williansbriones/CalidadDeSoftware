$(document).ready(function () {
    $('#buscar input').on('input', function () {
        var textoBusqueda = $(this).val().toLowerCase().trim();

        $('.tarjeta_producto').each(function () {
            var nombreProducto = $(this).find('.card_title1').text().toLowerCase();

            if (nombreProducto.includes(textoBusqueda)) {
                $(this).css("display","block");
            } else {
                $(this).css("display","none");
            }
        });
    });
});
