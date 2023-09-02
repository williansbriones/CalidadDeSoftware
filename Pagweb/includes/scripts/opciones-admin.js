$(document).ready(function() {
    if (localStorage.getItem("Usuario_iniciado") == undefined) {
      window.location.href = "log-trabajador.html";
    }
  });
  
  $("#Aplicar_crear").click(function() {
    // Obtener los valores del formulario
    var nombre = $("#nombre").val();
    var descuento = $("#cantidad-descuento").val();
    var codigo = $("#codigo-cupon").val();
    var limite = $("#cantidad-limite").val();
    var fechaInicio = $("#fecha-inicio").val();
    var fechaTermino = $("#fecha-termino").val();
  
    // Crear el objeto de datos
    var datos = {
      nombre: nombre,
      descuento: descuento,
      codigo: codigo,
      limite: limite,
      fechaInicio: fechaInicio,
      fechaTermino: fechaTermino
    };
  
    // Realizar la llamada AJAX
    $.ajax({
      type: "POST",
      url: "https://localhost:7294/api/Controller_Cupon/crear_cupon", // Actualiza la URL con tu ruta de API correcta
      data: JSON.stringify(datos),
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
        console.log(response);
        setTimeout(function() {
          location.reload();
        }, 2000);
      },
      error: function(error) {
        console.log(error);
        console.log("sucedio un error");
      }
    });
  });
  