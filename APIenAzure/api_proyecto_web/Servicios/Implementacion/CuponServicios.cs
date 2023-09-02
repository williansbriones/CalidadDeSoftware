using api_proyecto_web.DBConText;
using api_proyecto_web.Modelos;
using System.Data;

namespace api_proyecto_web.Servicios.Implementacion
{
    public class CuponServicios : IcrudCupon
    {
        public void Crearcupon(string Nombre, int CantidadDesuento, string Codigo, int Cantidad_limite, string FechaInicio, string FechaTermino)
        {
            string query = "BEGIN TRAN insert into cupon values (SQ_IDcupon.nextval, 'T', " + CantidadDesuento + ", '" + Nombre + "', '" + Codigo + "', " + Cantidad_limite + ", TO_DATE('" + FechaInicio + "', 'YYYY-MM-DD'), TO_DATE('" + FechaTermino + "', 'YYYY-MM-DD'))";
            ComprasServicios.db.Execute(query);
            ComprasServicios.db.Execute("commit");
        }

        public void Des_Habilitar(int id_cupon)
        {
            string query = "update cupon set estado = 'F' WHERE  id_cupon = " + id_cupon;
            ComprasServicios.db.Execute(query);
            ComprasServicios.db.Execute("commit");
        }

        public void Eliminar_cupon(int id_cupon)
        {
            string query = "DELETE FROM cupon WHERE id_cupon = " + id_cupon;
            ComprasServicios.db.Execute(query);
            ComprasServicios.db.Execute("commit");
        }

        public void Habilitar_cupon(int id_cupon)
        {
            string query = "update cupon set estado = 'F' WHERE  id_cupon = " + id_cupon;
            ComprasServicios.db.Execute(query);
            ComprasServicios.db.Execute("commit");
        }

        public void Modificarcupon(int id_cupon, string Nombre, int CantidadDesuento, string Codigo, int Cantidad_limite)
        {
            string query = "UPDATE cupon SET cupon = '" + Nombre + "', CantidadDesuento = " + CantidadDesuento + ", Codigo = '" + Codigo + "', Cantidad_limite = " + Cantidad_limite + " WHERE id_cupon = " + id_cupon;
            ComprasServicios.db.Execute(query);
            ComprasServicios.db.Execute("commit");
        }
    }
}
