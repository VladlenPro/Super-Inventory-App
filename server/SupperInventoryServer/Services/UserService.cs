using System;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public User Authenticate(string username, string password)
    {
        User user = _userRepository.GetUserByUserName(username);

        if (user == null || user.Password != password)
        {
            return null;
        } 

        return user;    
    }
}
