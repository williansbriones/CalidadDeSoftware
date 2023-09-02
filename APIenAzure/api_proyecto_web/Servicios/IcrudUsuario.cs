using api_proyecto_web.Modelos;

namespace api_proyecto_web.Servicios
{
    public interface IcrudUsuario
    {
        public void CambiarContraseña(string constraseña_antigua, string Contraseña);
        public Usuario informacionUsuario(int id);
        public int InicioSesion(string correo, string contraseña);
        public int CrearUsuario(string nombre, string apellido, string telefono, string email, string direccion, string comuna, string contraseña);
        public void EditarUsuario(string nombre, string apellido, string telefono, string email, int id, string direccion);
        public void cerrarSesion();
        public void cambiofoto(IFormFile imagen, int id);
        public void Registro_usuario_invitado(Usuario usu);
        public int inicio_trabajador(string correo, string contraseña);
    }

}
