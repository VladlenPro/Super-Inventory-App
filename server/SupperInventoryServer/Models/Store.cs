using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace SupperInventoryServer.Models
{
    public class Store
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        [BsonRequired]
        public string Name { get; set; }

        [BsonElement("branchName")]
        public string BranchName { get; set; }

        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("active")]
        public bool IsActive { get; set; }
        [BsonElement("products")]
        public string[] Products { get; set; } = new string[0];

        [BsonElement("version")]
        public int Version { get; set; }

        [BsonElement("createdAt")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime UpdatedAt { get; set; }
    }
}
