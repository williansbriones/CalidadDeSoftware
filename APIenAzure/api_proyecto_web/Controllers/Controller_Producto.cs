using api_proyecto_web.Servicios.Implementacion;
using api_proyecto_web.Servicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using api_proyecto_web.Modelos;
using api_proyecto_web.Modelos.@enum;

namespace api_proyecto_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Controller_Producto : ControllerBase
    {
        IcrudProductos servicioProducto = new ProductoServicios();
        // GET: api/Controller_producto/InformacionProducto
        [HttpGet("InformacionProducto/{id}")]
        public ObjectResult GetProducto(int id)
        {
            try
            {
                return Ok(servicioProducto.InformacionProducto(id));

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/Controller_producto/GenerarProducto
        [HttpPost("GenerarProducto")]
        public ObjectResult PostProducto([FromForm] int tipo_Producto, [FromForm] string nombre, [FromForm] string caracteristicas, [FromForm] int precio, [FromForm] IFormFile imagen1, [FromForm] IFormFile imagen2, [FromForm] IFormFile imagen3, [FromForm] IFormFile imagen4, [FromForm] IFormFile imagen5)
        {
            try 
            { 
                servicioProducto.GenerarProducto(tipo_Producto, nombre, caracteristicas, precio,imagen1,imagen2,imagen3,imagen4,imagen5);
                return Ok("Generado");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult EliminarProducto(int id)
        {
            // Verificar si el producto existe en la base de datos
            var producto = servicioProducto.InformacionProducto(id);
            if (producto == null)
            {
                return NotFound();
            }

            // Eliminar el producto
            // implementar la lógica para eliminar el producto en tu base de datos
            

            return Ok();
        }
        // GET: api/Controller_Producto/
        [HttpGet("ObtenerTodosLosProductos") ]
        public ObjectResult ObtenerTodosLosProductos()
        {
            try
            {
                var productos = servicioProducto.ObtenerTodosLosProductos();
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // api/Controller_producto/ProductosMasivo
        [HttpGet("ProductosMasivo")]
        public List<Productos> productosmasivo()
        {
            return servicioProducto.productoMasivo();
        }
        [HttpGet("BuscarProducto/{nombre}")]
        public ObjectResult GetProducto(string nombre)
        {
            try
            {
                return Ok(servicioProducto.BuscarProducto(nombre));
            

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

