using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.Models;

namespace SupperInventoryServer.Repositories.Intefaces
{
    public interface IStoreRepository
    {
        Task<IEnumerable<Store>> GetAllStoresAsync();
        Task<Store> GetStoreByIdAsync(string id);
        Task InsertStoreAsync(Store store);
        Task UpdateStoreAsync(Store updatedStore);
        Task<bool> UpdateStoreStatusAsync(string storeId, bool isActive);
        Task<IEnumerable<Store>> GetStoresByFilterAsync(StoreFilter storeFilter);
    }
}
