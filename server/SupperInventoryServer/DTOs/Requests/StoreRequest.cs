using SupperInventoryServer.Models;

namespace SupperInventoryServer.DTOs.Requests
{
    public class StoreRequest
    {
        public string? Id { get; set; } 
        public string Name { get; set; }
        public string BranchName { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public string[]? Products { get; set; }

    }

    public class StoreUpdateStatusRequest
    {
        public string Id { get; set; }
        public bool IsActive { get; set; }
    }
}
