$(document).ready(function () {
  $("#filtro").on("change", function () {
    var categoria = $(this).val();
    if (categoria == "todos") {
      $(".producto").show();
    } else {
      $(".producto").hide();
      $("." + categoria).show();
    }
  });
});

function mostrarMensaje() {
  // Seleccionamos el elemento que contiene el mensaje
  var mensaje = document.getElementById("mensaje_emergente");
  

 
  

  // Modificamos el contenido del mensaje
 

  // Hacemos que el mensaje aparezca
  mensaje.style.display = "block";

  setTimeout(function () {
    mensaje.style.display = "none";
  }, 3000);
}





