using System;
using SupperInventoryServer.Enums;

namespace SupperInventoryServer.DTOs.Responses;

public class LoginResponse
{
    public string username { get; set; }
    public string token { get; set; }
    public UserTypes [] userTypes { get; set; }
}
