using MongoDB.Driver;
using SupperInventoryServer.Models;

namespace SupperInventoryServer.Data

{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            MongoClient client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            _database = client.GetDatabase("InventoryManagment");
        }

        public IMongoCollection<Product> Products => _database.GetCollection<Product>("Product");
    }
}
