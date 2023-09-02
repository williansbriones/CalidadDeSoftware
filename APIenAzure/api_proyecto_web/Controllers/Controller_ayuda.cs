﻿using Microsoft.AspNetCore.Mvc;
using api_proyecto_web.Modelos;
using api_proyecto_web.Servicios;
using api_proyecto_web.Servicios.Implementacion;
using System.Text.Json;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api_proyecto_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Controller_ayuda : ControllerBase
    {

        IcrudAyuda servicioAyuda = new AyudaServicio();
        

        [HttpPost("GenerarAyuda")]
       public void Post(JsonElement consulta)
        {
            string email = consulta.GetProperty("email").ToString();
            string descripcion = consulta.GetProperty("descripcion").ToString();
            servicioAyuda.GenerarAyuda(email,descripcion);
        }

        

        
        
    }
}
