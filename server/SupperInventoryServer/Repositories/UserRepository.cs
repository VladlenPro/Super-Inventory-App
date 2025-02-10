using MongoDB.Driver;
using SupperInventoryServer.Data;
using SupperInventoryServer.DTOs;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(MongoDbContext context)
    {
        _users = context.Users;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _users.Find(User => true).ToListAsync();
    }

     public async Task<PagedResult<User>> GetUsersPageAsync(int pageNumber, int pageSize)
    {
  
        if (pageNumber < 1) pageNumber = 1;
        if (pageSize < 1) pageSize = 10;


        FilterDefinition<User> filter = Builders<User>.Filter.Empty;


        long totalCount = await _users.CountDocumentsAsync(filter);

        // Calculate the number of documents to skip
        int skip = (pageNumber - 1) * pageSize;

        // Retrieve the page of users (consider adding a sort for a consistent order)
        IEnumerable<User> users = await _users.Find(filter)
                                .Skip(skip)
                                .Limit(pageSize)
                                .ToListAsync();

        return new PagedResult<User>
        {
            Items = users,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public User GetUserByUserName(string username)
    {
        return _users.Find(user => user.Username == username && user.IsActive).FirstOrDefault();
    }

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
        return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task InsertUserAsync(User user)
    {
         await _users.InsertOneAsync(user);
    }
    public async Task UpdateUserAsync(User updatedUser) 
    {
         await _users.ReplaceOneAsync(user => user.Id == updatedUser.Id, updatedUser);
    }

   public async Task<User> GetUserByIdAsync(string id)
{
    var result = await _users.FindAsync(user => user.Id == id);
    return await result.FirstOrDefaultAsync();
}

    public async Task<bool> UpdateUserStatusAsync(string userId, bool isActive)
    {
        var update = Builders<User>.Update.Set(u => u.IsActive, isActive);
        var result = await _users.UpdateOneAsync(u => u.Id == userId, update);
        return result.ModifiedCount > 0;
    }
}
