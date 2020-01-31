using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class Saved_Posts
    {
        public int Id { get; set; }
        [Required]
        public long UserId { get; set; }
        [Required]
        [ForeignKey("UserId")]
        public User User{ get; set; }
        [Required]
        public long PostId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
    }
}
