using Microsoft.AspNetCore.Mvc;
using SupperInventoryServer.DTOs.Requests;
using SupperInventoryServer.DTOs.Responses;
using SupperInventoryServer.Models;
using SupperInventoryServer.Services;

namespace SupperInventoryServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            User user = _userService.Authenticate(request.Username, request.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.username = user.Username;
            loginResponse.token = "sample-token";
            loginResponse.userTypes = user.UserTypes;

            return Ok(loginResponse);
        }

    }
}
