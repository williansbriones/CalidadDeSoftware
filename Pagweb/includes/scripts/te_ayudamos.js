$("#enviar").click(function () { 
    
    let email = $("#exampleFormControlInput1").val();
    let descripcion = $("#exampleFormControlTextarea1").val();

    let mensaje = {"email": email, "descripcion": descripcion}

    console.log(mensaje);

    $.ajax({
        type: "POST",
        url: "https://localhost:7294/api/Controller_ayuda/GenerarAyuda",
        data: JSON.stringify(mensaje),
        contentType: 'application/json; charset=utf-8',
        async:  true,
        success: function (response){

        },error: function (error){
            console.log(error);
        }

    });

});