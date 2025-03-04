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
        public IMongoCollection<User> Users => _database.GetCollection<User>("User");
        public IMongoCollection<Store> Stores => _database.GetCollection<Store>("Store");

        public async Task InitializeAsync()
        {
            // Build the compound unique index for Store
            IndexKeysDefinition<Store> indexKeys = Builders<Store>.IndexKeys
                .Ascending(s => s.Name)
                .Ascending(s => s.BranchName)
                .Ascending(s => s.Address);

            CreateIndexOptions indexOptions = new CreateIndexOptions { Unique = true };
            CreateIndexModel<Store> indexModel = new CreateIndexModel<Store>(indexKeys, indexOptions);

            // Asynchronously create the index
            await Stores.Indexes.CreateOneAsync(indexModel);
        }
    }
}
