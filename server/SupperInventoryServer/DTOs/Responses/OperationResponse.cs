
namespace SupperInventoryServer.DTOs.Responses;

public class OperationResponse<T>
{
     public bool Success { get; set; }
     public string Message { get; set; } = string.Empty;
     public T? Data { get; set; }
}
