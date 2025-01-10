using Microsoft.AspNetCore.Mvc;
using SupperInventoryServer.DTOs.Requests;

namespace SupperInventoryServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Username == "admin" && request.Password == "admin123")
            {
                return Ok(new {token= "sample-token"});
            }
            return Unauthorized();
        }

    }
}
