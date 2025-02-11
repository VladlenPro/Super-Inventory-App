using System;

namespace SupperInventoryServer.Models;

public class UserFilter
{
    public string? SearchText { get; set; }
    public bool? IsActive { get; set; }
}
