using System;
using SupperInventoryServer.Enums;

namespace SupperInventoryServer.DTOs.Requests;

public class UserUpdateStatusRequest
{
    public string Id { get; set; }
    public bool IsActive { get; set; }
}

public class UserRequest
{
    public string? Id { get; set; } // Nullable for new users
    public string Username { get; set; }
    public string Password { get; set; } = string.Empty;
    public UserTypes[] UserTypes { get; set; } = Array.Empty<UserTypes>();
    public string[] Stores { get; set; } = Array.Empty<string>();
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public bool IsActive { get; set; }
}
