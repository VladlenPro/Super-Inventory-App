﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SupperInventoryServer.Enums;

namespace SupperInventoryServer.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("isPerUnit")]
        public bool IsPerUnit { get; set; }

        [BsonRepresentation(BsonType.String)]
        public UnitOfMeasure? UnitOfMeasure { get; set; }

        [BsonRepresentation(BsonType.String)]
        public List<Category> Categories { get; set; }

        [BsonElement("tags")]
        public List<string> Tags { get; set; }  

        [BsonElement("sale")]
        public decimal? SalePrice { get; set; }  

        [BsonElement("images")]
        public List<string> Images { get; set; } 

        [BsonElement("stock")]
        public double Stock { get; set; }

    }
}
