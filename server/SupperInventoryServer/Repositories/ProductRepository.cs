using MongoDB.Bson;
using MongoDB.Driver;
using SupperInventoryServer.Data;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public ProductRepository(MongoDbContext context)
        {
            _products = context.Products;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _products.Find(Product => true).ToListAsync();
        }
        public async Task<Product> GetProductByIdAsync(string id)
        {
            return await _products.Find<Product>(product => product.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddProductAsync(Product product)
        {
            await _products.InsertOneAsync(product);
        }

        public async Task UpdateProductAsync(string id, Product product)
        {
            await _products.ReplaceOneAsync(prod => prod.Id == id, product);
        }
        public async Task DeleteProductAsync(string id)
        {
            await _products.DeleteOneAsync(prod => prod.Id == id);
        }
    }
}
