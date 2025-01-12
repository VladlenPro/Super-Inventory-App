using MongoDB.Driver;
using SupperInventoryServer.DTOs.Requests;
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

    public User? Authenticate(string username, string password)
    {
        User user = _userRepository.GetUserByUserName(username);

        if (user == null || user.Password != password)
        {
            return null;
        }

        return user;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllUsersAsync();
    }

    public async Task<User> GetUserByIdAsync (string userId)
    {
        return await _userRepository.GetUserByIdAsync( userId);
    }

    public async Task<bool> UpdateUserStatusAsync(string userId, bool isActive)
    {
       return await _userRepository.UpdateUserStatusAsync(userId, isActive);
    }

    public async Task<(bool Success, string Message, User? User)> UpsertUserAsync(UserRequest userRequest)
    {

        if (!string.IsNullOrEmpty(userRequest.Id))
    {
        // ✅ Update existing user
        var existingUser = await _userRepository.GetUserByIdAsync(userRequest.Id);
        if (existingUser == null)
        {
            return (false, "User not found.", null);
        }

        // Update user fields
        existingUser.Username = userRequest.Username;
        existingUser.Password = userRequest.Password;
        existingUser.UserTypes = userRequest.UserTypes;
        existingUser.Stores = userRequest.Stores;
        existingUser.Phone = userRequest.Phone;
        existingUser.Address = userRequest.Address;
        existingUser.IsActive = userRequest.IsActive;

        await _userRepository.UpdateUserAsync(existingUser);
        return (true, "User updated successfully.", existingUser);
    }
    else{
        var user = new User
        {
            Username = userRequest.Username,
            Password = userRequest.Password,
            UserTypes = userRequest.UserTypes,
            Stores = userRequest.Stores,
            Phone = userRequest.Phone,
            Address = userRequest.Address,
            IsActive = userRequest.IsActive
        };

        try
        {
            // Attempt to insert the user
            await _userRepository.InsertUserAsync(user);

            // Retrieve the newly created user by username to get the generated ID
            var insertedUser = await _userRepository.GetUserByUsernameAsync(user.Username);
            return (true, "User created successfully.", insertedUser);
        }
        catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
        {
            // Handle duplicate username error
            return (false, "Username already exists.", null);
        }
    }
    }







}
