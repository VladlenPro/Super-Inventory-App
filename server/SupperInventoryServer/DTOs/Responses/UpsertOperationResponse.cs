
using SupperInventoryServer.Enums;

namespace SupperInventoryServer.DTOs.Responses;

public class UpsertOperationResponse<T> : OperationResponse<T>
{
    public UpsertResultType? ResultType { get; set; } 
}
