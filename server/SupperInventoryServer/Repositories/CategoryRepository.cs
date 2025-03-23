using MongoDB.Bson;
using MongoDB.Driver;
using SupperInventoryServer.Data;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoryRepository(MongoDbContext context) 
        {
            _categories = context.Categories;
        }
        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _categories.Find(category => true).ToListAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(string id)
        {
            IAsyncCursor<Category> result = await _categories.FindAsync(category => category.Id == id);
            return await result.FirstOrDefaultAsync();
        }

        public async Task InsertCategoryAsync(Category category)
        {
            await _categories.InsertOneAsync(category);
        }
        public async Task UpdateCategoryAsync(Category updatedCategory)
        {
            await _categories.ReplaceOneAsync(cat => cat.Id == updatedCategory.Id, updatedCategory);
        }

        public async Task<bool> ToggleCategoryStatusAsync(string categoryId, bool isActive)
        {
            UpdateDefinition<Category> update = Builders<Category>.Update
                .Set(category => category.IsActive, isActive)
                .Set(category => category.UpdatedAt, DateTime.Now);
            UpdateResult result = await _categories.UpdateOneAsync(category => category.Id == categoryId, update);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<IEnumerable<Category>> GetCategoriesByFilterAsync(CategoryFilter categoryFilter)
        {
            FilterDefinitionBuilder<Category> builder = Builders<Category>.Filter;
            FilterDefinition<Category> filterDefinition = builder.Empty;

            if (!string.IsNullOrWhiteSpace(categoryFilter.SearchText))
            {
                BsonRegularExpression regex = new BsonRegularExpression(categoryFilter.SearchText, "i");
                filterDefinition &= builder.Or(
                    builder.Regex(category => category.Name, regex)
                );
            }

            if (categoryFilter.IsActive.HasValue)
            {
                filterDefinition &= builder.Eq(category => category.IsActive, categoryFilter.IsActive.Value);
            }

            return await _categories.Find(filterDefinition).ToListAsync();
        } 

        
    }
}
