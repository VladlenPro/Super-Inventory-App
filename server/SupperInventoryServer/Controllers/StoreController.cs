using Microsoft.AspNetCore.Mvc;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Enums;
using SupperInventoryServer.Models;
using SupperInventoryServer.Services;

namespace SupperInventoryServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoreController : ControllerBase
    {
        private readonly StoreService _storeService;

        public StoreController(StoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStoresAsync()
        {
            OperationResponse<IEnumerable<Store>> storeOperationResult = await _storeService.GetAllStoresAsync();

            if(storeOperationResult.Success) 
            {
                return Ok(storeOperationResult);
            }
            else
            {
                return BadRequest(storeOperationResult);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStoreById(string id)
        {
            OperationResponse<Store> storeResponse = await _storeService.GetStoreByIdAsync(id);

            if (!storeResponse.Success)
            {
                return BadRequest(storeResponse);
            }

            return Ok(storeResponse);
        }

        [HttpPost("upsert")]
        public async Task<IActionResult> UpsertStoreAsync([FromBody] StoreRequest storeRequest)
        {
            UpsertOperationResponse<Store> storeResponse = await _storeService.UpsertStoreAsync(storeRequest);

            if (storeResponse.ResultType == UpsertResultType.AlreadyExists)
            {
                return Conflict(storeResponse);
            }

            if (!storeResponse.Success)
            {
                return BadRequest(storeResponse);
            }

            return Ok(storeResponse);
        }

        [HttpPost("filter")]
        public async Task<IActionResult> FilterStores([FromBody] StoreFilter filter)
        {
            OperationResponse<IEnumerable<Store>> storeResponse = await _storeService.GetStoresByFilterAsync(filter);
            if (!storeResponse.Success)
            {
                return BadRequest(storeResponse);
            }

            return Ok(storeResponse);
        }

        [HttpPut("toggle-status")]
        public async Task<IActionResult> ToggleStoreStatus([FromBody] StoreUpdateStatusRequest request)
        {
            OperationResponse<bool> storeStatusResponse = await _storeService.UpdateStoreStatusAsync(request.Id, request.IsActive);
            if (!storeStatusResponse.Success)
            {
                return BadRequest(storeStatusResponse);
            }

            return Ok(storeStatusResponse);
        }
    }
}
