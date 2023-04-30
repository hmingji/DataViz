using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using Npgsql;
using Z.Dapper.Plus;

namespace api.Utils
{
    public class DataFetcher<T, TMap>
        where TMap : CsvHelper.Configuration.ClassMap
        where T : class
    {
        public string _downloadUrl;
        public List<T> _records;

        public DataFetcher(string downloadUrl)
        {
            _downloadUrl = downloadUrl;
        }

        public void SetRecords(List<T> records)
        {
            _records = records;
        }

        public async Task GetCsvData()
        {
            try
            {
                using (var client = new HttpClient())
                using (var stream = await client.GetStreamAsync(_downloadUrl))
                using (var reader = new StreamReader(stream))
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    csv.Context.RegisterClassMap<TMap>();
                    var records = csv.GetRecords<T>().ToList();
                    this.SetRecords(records);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task BulkInsertCsvData(NpgsqlConnection connection, string tableName)
        {
            try
            {
                DapperPlusManager.Entity<T>().Table(tableName);
                await connection.BulkActionAsync(x => x.BulkInsert(_records));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }
    }
}
