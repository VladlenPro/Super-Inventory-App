using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SupperInventoryServer.DTOs.Requests;
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
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsersAsync()
        {
            try
            {
                IEnumerable<User> users = await _userService.GetAllUsersAsync();

                if (users != null)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "hi",
                        data = users
                    });
                }
                 return Ok(new
                    {
                        success = true,
                        message = "hi",
                        data = users
                    });
            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    success = false,
                    errors = ex.Message
                });
            }

        }

         [HttpGet("{id}")]

          public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            return Ok(new { success = true, nessage = "user found", data = user });
        }

        [HttpPut("toggle-status")]
        public async Task<IActionResult> ToggleUserStatus([FromBody] UserUpdateStatusRequest request)
        {
            var result = await _userService.UpdateUserStatusAsync(request.Id, request.IsActive);
            if (!result)
            {
                return NotFound(new { message = "User not found." });
            }

            return NoContent();
        }

        [HttpPost("upsert")]
        public async Task<IActionResult> UpsertUser([FromBody] UserRequest userRequest)
        {
            var (success, message, user) = await _userService.UpsertUserAsync(userRequest);

            if (!success)
            {
                return BadRequest(new
                {
                    success = false,
                    message = message
                });
            }

            return Ok(new
            {
                success = true,
                message = message,
                data = user
            });
        }
 
        // [HttpPost("userSeacrch")]
        
        // public async IActionResult<List<User>> UserSearch(UserSearchObject userSearchrequest)
        // {
        //     return await Ok();
        // }
    }


}
