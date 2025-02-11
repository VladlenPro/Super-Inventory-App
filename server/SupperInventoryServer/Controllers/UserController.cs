using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupperInventoryServer.DTOs;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Enums;
using SupperInventoryServer.Models;
using SupperInventoryServer.Services;

namespace SupperInventoryServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
            //add loggger nuget logforent!!!
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            OperationResponse<IEnumerable<User>> operationResult = await _userService.GetAllUsersAsync();

            if (operationResult.Success)
            {
                return Ok(operationResult);
            }
            else
            {
                return BadRequest(operationResult);
            }

        }
        // [HttpGet]
        // public async Task<IActionResult> GetUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        // {
        //     PagedResult<User> pagedResult = await _userService.GetUsersPageAsync(pageNumber, pageSize);
        //     return Ok(pagedResult);
        // }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetUserById(string id)
        {
            OperationResponse<User> result = await _userService.GetUserByIdAsync(id);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPut("toggle-status")]
        public async Task<IActionResult> ToggleUserStatus([FromBody] UserUpdateStatusRequest request)
        {
            OperationResponse<bool> result = await _userService.UpdateUserStatusAsync(request.Id, request.IsActive);
            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("upsert")]
        public async Task<IActionResult> UpsertUser([FromBody] UserRequest userRequest)
        {
            UpsertOperationResponse<User> result = await _userService.UpsertUserAsync(userRequest);

            if (result.ResultType == UpsertResultType.AlreadyExists)
            {
                return Conflict(result);
            }

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        // [HttpPost("userSeacrch")]

        // public async IActionResult<List<User>> UserSearch(UserSearchObject userSearchrequest)
        // {
        //     return await Ok();
        // }

        [HttpPost("filter")]
        public async Task<IActionResult> FilterUsers([FromBody] UserFilter filter)
        {
            OperationResponse<IEnumerable<User>> result = await _userService.GetUsersByFilterAsync(filter);
            if (!result.Success)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }


}
