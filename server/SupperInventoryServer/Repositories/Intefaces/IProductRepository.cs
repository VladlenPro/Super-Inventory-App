using SupperInventoryServer.Models;

namespace SupperInventoryServer.Repositories.Intefaces
{
    public interface IProductRepository
    {

        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(string id, Product product);
        Task DeleteProductAsync(string id); // update status
    }
}
