$("#agregar").click(function () { 
    let formData = new FormData();
    let id_tipo = $("#tipo").val();
    let id = id_tipo.substring(1, 0);
    let nombre = $("#nombre_producto").val();
    let caracteristicas = $("#caracteristicas").val();
    let precio = $("#precio").val();
    var imagen1 = (document.getElementById("imagen1").files[0] == undefined) ? null : document.getElementById("imagen1").files[0];
    var imagen2 = (document.getElementById("imagen2").files[0] == undefined) ? null : document.getElementById("imagen2").files[0];
    let imagen3 = (document.getElementById("imagen3").files[0] == undefined) ? null : document.getElementById("imagen3").files[0];
    let imagen4 = (document.getElementById("imagen4").files[0] == undefined) ? null : document.getElementById("imagen4").files[0];
    let imagen5 = (document.getElementById("imagen5").files[0] == undefined) ? null : document.getElementById("imagen5").files[0];
    console.log(id_tipo+ " "+ nombre + " "+ caracteristicas +" "+ precio);
    console.log(id);
    console.log(imagen1);
    console.log(imagen2);
    console.log(imagen3);
    console.log(imagen4);
    console.log(imagen5);
    formData.append("tipo_Producto",id);
    formData.append("nombre",nombre);
    formData.append("caracteristicas",caracteristicas);
    formData.append("precio",precio);
    formData.append("imagen1",imagen1);
    formData.append("imagen2",imagen2);
    formData.append("imagen3",imagen3);
    formData.append("imagen4",imagen4);
    formData.append("imagen5",imagen5);
    $.ajax({
        type: "POST",
        url: "https://localhost:7294/api/Controller_producto/GenerarProducto",
        processData: false,
        contentType: false,
        data: formData,
        error: function(error){
            console.log("error");
        },
        success: function (response) {
            console.log(response);
            cambioFotoPerfil();
            setTimeout(function(){
                location.reload();
            }, 3000);
        }
    });


    
});