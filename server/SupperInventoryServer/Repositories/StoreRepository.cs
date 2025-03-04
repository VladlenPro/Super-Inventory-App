using MongoDB.Bson;
using MongoDB.Driver;
using SupperInventoryServer.Data;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Repositories
{
    public class StoreRepository : IStoreRepository
    {
        private readonly IMongoCollection<Store> _stores;

        public StoreRepository(MongoDbContext context)
        {
            _stores = context.Stores;
        }
        public async Task<IEnumerable<Store>> GetAllStoresAsync()
        {
           return await _stores.Find(store => true).ToListAsync();
        }

        public async Task<Store> GetStoreByIdAsync(string id)
        {
            IAsyncCursor<Store> result = await _stores.FindAsync(store => store.Id == id);
            return await result.FirstOrDefaultAsync();
        }
        public async Task InsertStoreAsync(Store store)
        {
            await _stores.InsertOneAsync(store);
        }
        
        public async Task UpdateStoreAsync(Store updatedStore)
        {
            await _stores.ReplaceOneAsync(store => store.Id == updatedStore.Id, updatedStore);
        }

        public async Task<bool> UpdateStoreStatusAsync(string storeId, bool isActive)
        {
            UpdateDefinition<Store> update = Builders<Store>.Update
                .Set(store => store.IsActive, isActive)
                .Set(store => store.UpdatedAt, DateTime.Now); ;
            UpdateResult result = await _stores.UpdateOneAsync(store => store.Id == storeId, update);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<IEnumerable<Store>> GetStoresByFilterAsync(StoreFilter storeFilter)
        {
            FilterDefinitionBuilder<Store> builder = Builders<Store>.Filter;
            FilterDefinition<Store> filterDefinition = builder.Empty;

            if (!string.IsNullOrWhiteSpace(storeFilter.SearchText))
            {
                BsonRegularExpression regex = new BsonRegularExpression(storeFilter.SearchText, "i");
                filterDefinition &= builder.Or(
                    builder.Regex(store => store.Name, regex),
                    builder.Regex(store => store.BranchName, regex)
                );
            }

            if (storeFilter.IsActive.HasValue)
            {
                filterDefinition &= builder.Eq(store => store.IsActive, storeFilter.IsActive.Value);
            }

            return await _stores.Find(filterDefinition).ToListAsync();
        }
    }
}
