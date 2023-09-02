using System.Data;
using Oracle.ManagedDataAccess.Client;

namespace api_proyecto_web.DBConText
{
    public class Connection
    {
        private string connection_str = string.Empty;

        string ConnectionString = string.Empty;
        public Connection()
        {
            OracleConfiguration.TnsAdmin = @"Wallet";
            OracleConfiguration.WalletLocation = OracleConfiguration.TnsAdmin;
            var constructor = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();
            connection_str = constructor.GetSection("ConnectionStrings:oracle").Value;
            ConnectionString = connection_str;
        }

        public DataTable Execute(string SQL)
        {
            using (OracleConnection con = new OracleConnection(this.ConnectionString))
            {
                using (OracleCommand cmd = con.CreateCommand())
                {
                    try
                    {
                        con.Open();
                        Console.WriteLine("Base de datos connectada con exito");
                        Console.WriteLine();

                        cmd.CommandText = SQL;
                        OracleDataReader reader = cmd.ExecuteReader();
                        var dt = new DataTable();
                        dt.Load(reader);
                        con.Close();
                        Console.WriteLine("Select ejecutado");
                        return dt;

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        Console.WriteLine("No se vinculo la con la base de datos");
                    }
                    con.Close();
                    return new DataTable();
                }
            }
        }






    }


}
