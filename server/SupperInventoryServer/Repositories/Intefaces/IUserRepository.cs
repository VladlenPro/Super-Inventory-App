using System;
using SupperInventoryServer.Models;

namespace SupperInventoryServer.Repositories.Intefaces;

public interface IUserRepository
{
    User GetUserByUserName(string username);
}
