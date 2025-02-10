using System;
using SupperInventoryServer.DTOs;
using SupperInventoryServer.Models;

namespace SupperInventoryServer.Repositories.Intefaces;

public interface IUserRepository
{
    User GetUserByUserName(string username);
    Task<PagedResult<User>> GetUsersPageAsync(int pageNumber, int pageSize);
    Task<User?> GetUserByUsernameAsync(string username);
    Task<User> GetUserByIdAsync(string id);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task InsertUserAsync(User user);
    Task UpdateUserAsync(User updatedUser);
    Task<bool> UpdateUserStatusAsync(string userId, bool isActive);
}
