using MongoDB.Driver;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Enums;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Services
{
    public class StoreService
    {
        private readonly IStoreRepository _storeRepository;
        private readonly ILogger<StoreService> _logger;

        public StoreService(IStoreRepository storeRepository, ILogger<StoreService> logger)
        {
            _storeRepository = storeRepository;
            _logger = logger;
        }

        public async Task<OperationResponse<IEnumerable<Store>>> GetAllStoresAsync()
        {
            OperationResponse<IEnumerable<Store>> storesResult = new OperationResponse<IEnumerable<Store>>();
            try
            {
                IEnumerable<Store> stores = await _storeRepository.GetAllStoresAsync();

                storesResult.Success = true;
                storesResult.Data = stores;
                storesResult.Message = "Stores retrieved successfully.";
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error retrieving stores.");
                storesResult.Success = false;
                storesResult.Message = $"An error occurred while retrieving stores. error: {ex.Message}";
            }
            return storesResult;
        }

        public async Task<OperationResponse<Store>> GetStoreByIdAsync(string storeId)
        {
            OperationResponse<Store> storeResult = new OperationResponse<Store>();
            try
            {
                Store store = await _storeRepository.GetStoreByIdAsync(storeId);

                storeResult.Success = true;
                storeResult.Data = store;
                storeResult.Message = "Store retrieved successfully.";
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error retrieving store.");
                storeResult.Success = false;
                storeResult.Message = $"An error occurred while retrieving store. error: {ex.Message}";
            }
            return storeResult;
        }

        public async Task<UpsertOperationResponse<Store>> UpsertStoreAsync(StoreRequest storeRequest)
        {
            UpsertOperationResponse<Store> storeResult = new UpsertOperationResponse<Store>();
            try
            {
                if (!string.IsNullOrEmpty(storeRequest.Id))
                {
                    Store existingStore = await _storeRepository.GetStoreByIdAsync(storeRequest.Id);
                    if (existingStore == null)
                    {
                        storeResult.Success = false;
                        storeResult.ResultType = UpsertResultType.Error;
                        storeResult.Message = "Store not found.";
                        return storeResult;
                    }

                    existingStore.Name = storeRequest.Name;
                    existingStore.BranchName = storeRequest.BranchName;
                    existingStore.Address = storeRequest.Address;
                    existingStore.IsActive = storeRequest.IsActive;
                    existingStore.UpdatedAt = DateTime.Now;

                    await _storeRepository.UpdateStoreAsync(existingStore);
                    _logger.LogInformation("Store updated successfully");
                    storeResult.Success = true;
                    storeResult.ResultType = UpsertResultType.Updated;
                    storeResult.Message = "Store updated successfully.";
                    storeResult.Data = existingStore;
                    return storeResult;
                }
                else
                {
                    Store store = new Store
                    {
                        Name = storeRequest.Name,
                        BranchName = storeRequest.BranchName,
                        Address = storeRequest.Address,
                        IsActive = storeRequest.IsActive,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Products = new string[0],
                        Version = 1
                    };

                    await _storeRepository.InsertStoreAsync(store);

                    _logger.LogInformation("Store created successfully");

                    storeResult.Success = true;
                    storeResult.ResultType = UpsertResultType.Created;
                    storeResult.Message = "Store created successfully.";
                    storeResult.Data = store;
                    return storeResult;
                }
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                _logger.LogError(ex, "Store already exists with the same name, branch name, and address.");
                storeResult.Success = false;
                storeResult.ResultType = UpsertResultType.AlreadyExists;
                storeResult.Message = "Store already exists.";
                return storeResult;
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, "an error accured while UpsertStoreAsync.");

                storeResult.Success = false;
                storeResult.ResultType = UpsertResultType.Error;
                storeResult.Message = $"An error occurred: {ex.Message}";
                return storeResult;
            }
        }

        public async Task<OperationResponse<bool>> UpdateStoreStatusAsync(string storeId, bool isActive)
        {
            OperationResponse<bool> result = new OperationResponse<bool>();
            try
            {
                bool isStatusCahnged = await _storeRepository.UpdateStoreStatusAsync(storeId, isActive);
                result.Success = true;
                result.Message = "status changed";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving store.");
                result.Success = false;
                result.Message = $"An error occurred while retrieving stores. error: {ex.Message}";
            }
            return result;
        }

        public async Task<OperationResponse<IEnumerable<Store>>> GetStoresByFilterAsync(StoreFilter storeFilter)
        {
            OperationResponse<IEnumerable<Store>> filterResponse = new OperationResponse<IEnumerable<Store>>();
            try
            {
                IEnumerable<Store> filteredStores = await _storeRepository.GetStoresByFilterAsync(storeFilter);
                filterResponse.Success = true;
                filterResponse.Data = filteredStores;
                filterResponse.Message = "Stores filtered successfully.";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error filtering stores.");
                filterResponse.Success = false;
                filterResponse.Message = $"An error occurred while filtering stores. Error: {ex.Message}";
            }
            return filterResponse;
        }
    }
}
