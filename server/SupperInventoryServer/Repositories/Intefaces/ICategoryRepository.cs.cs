using SupperInventoryServer.Models;

namespace SupperInventoryServer.Repositories.Intefaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(string id);
        Task InsertCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task<bool> ToggleCategoryStatusAsync(string categoryId, bool isActive);
    }
}
