namespace SupperInventoryServer.DTOs.Requests
{
    public class CategoryRequest
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}
