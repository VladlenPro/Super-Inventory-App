using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Enums;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ILogger<CategoryService> _logger;

        public CategoryService(ICategoryRepository categoryRepository, ILogger<CategoryService> logger)
        {
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        public async Task<OperationResponse<IEnumerable<Models.Category>>> GetAllCategoriesAsync()
        {
            OperationResponse<IEnumerable<Models.Category>> categoriesResult = new OperationResponse<IEnumerable<Models.Category>>();
            try
            {
                IEnumerable<Models.Category> categories = await _categoryRepository.GetAllCategoriesAsync();

                categoriesResult.Success = true;
                categoriesResult.Data = categories;
                categoriesResult.Message = "Categories retrieved successfully.";
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error retrieving categories.");
                categoriesResult.Success = false;
                categoriesResult.Message = $"An error occurred while retrieving categories. error: {ex.Message}";
            }
            return categoriesResult;
        }

        public async Task<OperationResponse<Models.Category>> GetCategoryByIdAsync(string categoryId)
        {
            OperationResponse<Models.Category> categoryResult = new OperationResponse<Models.Category>();
            try
            {
                Models.Category category = await _categoryRepository.GetCategoryByIdAsync(categoryId);

                categoryResult.Success = true;
                categoryResult.Data = category;
                categoryResult.Message = "Category retrieved successfully.";
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error retrieving category.");
                categoryResult.Success = false;
                categoryResult.Message = $"An error occurred while retrieving category. error: {ex.Message}";
            }
            return categoryResult;
        }

        public async Task<UpsertOperationResponse<Models.Category>> UpsertCategoryAsync(CategoryRequest categoryRequest)
        {
            UpsertOperationResponse<Models.Category> categoryUpsertResult = new UpsertOperationResponse<Models.Category>();
            try
            {
                if (!string.IsNullOrEmpty(categoryRequest.Id))
                {
                    Models.Category existingCategory = await _categoryRepository.GetCategoryByIdAsync(categoryRequest.Id);
                    if (existingCategory == null)
                    {
                        categoryUpsertResult.Success = false;
                        categoryUpsertResult.Message = "Category not found.";
                        return categoryUpsertResult;
                    }

                    existingCategory.Name = categoryRequest.Name;
                    existingCategory.IsActive = categoryRequest.IsActive;
                    existingCategory.UpdatedAt = DateTime.UtcNow;

                    await _categoryRepository.UpdateCategoryAsync(existingCategory);

                    categoryUpsertResult.Success = true;
                    categoryUpsertResult.ResultType = UpsertResultType.Updated;
                    categoryUpsertResult.Message = "Category updated successfully.";
                    categoryUpsertResult.Data = existingCategory;
                    return categoryUpsertResult;
                }
                else
                {
                    Models.Category category = new Models.Category
                    {
                        Name = categoryRequest.Name,
                        IsActive = categoryRequest.IsActive,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };

                    await _categoryRepository.InsertCategoryAsync(category);

                    categoryUpsertResult.Success = true;
                    categoryUpsertResult.ResultType = UpsertResultType.Created;
                    categoryUpsertResult.Message = "Category created successfully.";
                    categoryUpsertResult.Data = category;
                    return categoryUpsertResult;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error upserting category.");
                categoryUpsertResult.Success = false;
                categoryUpsertResult.Message = $"An error occurred while upserting category. error: {ex.Message}";
                return categoryUpsertResult;
            }
        }
    }
}
