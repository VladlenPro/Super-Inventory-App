using MongoDB.Driver;
using SupperInventoryServer.Data;
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
    public User GetUserByUserName(string username)
    {
        return _users.Find(user => user.Username == username && user.IsActive).FirstOrDefault();
    }
}