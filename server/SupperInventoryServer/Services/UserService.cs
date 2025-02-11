using MongoDB.Driver;
using SupperInventoryServer.DTOs;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Enums;
using SupperInventoryServer.Models;
using SupperInventoryServer.Repositories.Intefaces;

namespace SupperInventoryServer.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(IUserRepository userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
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

    public async Task<OperationResponse<IEnumerable<User>>> GetAllUsersAsync()
    {
        OperationResponse<IEnumerable<User>> result = new OperationResponse<IEnumerable<User>>();
        try
        {
            IEnumerable<User> users = await _userRepository.GetAllUsersAsync();

            result.Success = true;
            result.Data = users;
            result.Message = "Users retrieved successfully.";
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, "Error retrieving users.");
            result.Success = false;
            result.Message = $"An error occurred while retrieving users. error: {ex.Message}";
        }
        return result;
    }

    public async Task<PagedResult<User>> GetUsersPageAsync(int pageNumber, int pageSize)
    {
        return await _userRepository.GetUsersPageAsync(pageNumber, pageSize);
    }

    public async Task<OperationResponse<User>> GetUserByIdAsync(string userId)
    {

        OperationResponse<User> result = new OperationResponse<User>();
        result.Success = false;
        result.Message = "User not found";

        try
        {
            User user = await _userRepository.GetUserByIdAsync(userId);

            if (user != null)
            {
                result.Success = true;
                result.Data = user;
                result.Message = "User found";
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving users.");
            result.Success = false;
            result.Message = $"An error occurred while retrieving users. error: {ex.Message}";
        }
        return result;
    }

    public async Task<OperationResponse<bool>> UpdateUserStatusAsync(string userId, bool isActive)
    {
        OperationResponse<bool> result = new OperationResponse<bool>();

        try
        {
            bool isStatusCahnged = await _userRepository.UpdateUserStatusAsync(userId, isActive);
            result.Success = true;
            result.Message = "status changed";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving users.");
            result.Success = false;
            result.Message = $"An error occurred while retrieving users. error: {ex.Message}";
        }

        return result;
    }

    public async Task<UpsertOperationResponse<User>> UpsertUserAsync(UserRequest userRequest)
    {
        UpsertOperationResponse<User> result = new UpsertOperationResponse<User>();
        try
        {
            if (!string.IsNullOrEmpty(userRequest.Id))
            {
                // ✅ Update existing user
                User existingUser = await _userRepository.GetUserByIdAsync(userRequest.Id);
                if (existingUser == null)
                {
                    result.Success = false;
                    result.ResultType = UpsertResultType.Error;
                    result.Message = "User not found.";
                    return result;
                }

                // Update user fields
                existingUser.Username = userRequest.Username;
                existingUser.FirstName = userRequest.FirstName;
                existingUser.LastName = userRequest.LastName;
                existingUser.Password = userRequest.Password;
                existingUser.UserTypes = userRequest.UserTypes;
                existingUser.Stores = userRequest.Stores;
                existingUser.Phone = userRequest.Phone;
                existingUser.Address = userRequest.Address;
                existingUser.IsActive = userRequest.IsActive;

                await _userRepository.UpdateUserAsync(existingUser);

                _logger.LogInformation("User updated successfully");
                result.Success = true;
                result.ResultType = UpsertResultType.Updated;
                result.Message = "User updated successfully.";
                result.Data = existingUser;
                return result;
            }
            else
            {
                User user = new User
                {
                    Username = userRequest.Username,
                    FirstName = userRequest.FirstName,
                    LastName = userRequest.LastName,
                    Password = userRequest.Password,
                    UserTypes = userRequest.UserTypes,
                    Stores = userRequest.Stores,
                    Phone = userRequest.Phone,
                    Address = userRequest.Address,
                    IsActive = userRequest.IsActive
                };
                await _userRepository.InsertUserAsync(user);

                User? insertedUser = await _userRepository.GetUserByUsernameAsync(user.Username);

                _logger.LogInformation("User created successfully");

                result.Success = true;
                result.ResultType = UpsertResultType.Created;
                result.Message = "User created successfully.";
                result.Data = insertedUser;
                return result;


            }
        }
        catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
        {
            _logger.LogError(ex, "User already exist");

            result.Success = false;
            result.ResultType = UpsertResultType.AlreadyExists;
            result.Message = "User already exists";
            return result;
        }

        catch (Exception ex)
        {
            _logger.LogError(ex, "an error accured while UpsertUserAsync.");

            result.Success = false;
            result.ResultType = UpsertResultType.Error;
            result.Message = $"An error occurred: {ex.Message}";
            return result;
        }
    }

    public async Task<OperationResponse<IEnumerable<User>>> GetUsersByFilterAsync(UserFilter filter)
    {
        OperationResponse<IEnumerable<User>> response = new OperationResponse<IEnumerable<User>>();
        try
        {
            IEnumerable<User> filteredUsers = await _userRepository.GetUsersByFilterAsync(filter);
            response.Success = true;
            response.Data = filteredUsers;
            response.Message = "Users filtered successfully.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error filtering users.");
            response.Success = false;
            response.Message = $"An error occurred while filtering users. Error: {ex.Message}";
        }
        return response;
    }







}
