using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SupperInventoryServer.Enums;

namespace SupperInventoryServer.Models;

public class User
{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("userTypes")]
        public UserTypes[] UserTypes { get; set; }

        [BsonElement("stores")]
        public string[] Stores { get; set; }

        [BsonElement("phone")]
        public string? Phone { get; set; } 

        [BsonElement("address")]
        public string? Address { get; set; } 

        [BsonElement("isActive")]
        public bool IsActive { get; set; }
}
