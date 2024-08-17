using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class ProductEntity
    {
        [Key]
        public int Id { get; set; }

        public string Brand { get; set; }

        public string Title { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.Now;  

        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
