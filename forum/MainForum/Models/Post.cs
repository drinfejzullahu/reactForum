using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class Post
    {
        public long Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Title{ get; set; }
        [Required]
        [StringLength(255)]
        public string Question{ get; set; }
        [Required]
        [StringLength(255)]
        public string Username { get; set; }
        public int Votes { get; set; }
        //[Required]
        //[StringLength(255)]
        //public List<Message> Messages { get; set; }
        //[Required]
        //public List<Saved_Posts> Saved_Posts { get; set; }
        [Required]
        public long RoomId { get; set; }
        [ForeignKey("RoomId")]
        public Room Room { get; set; }
        //[Required]
        //public long Sort_CategoryId { get; set; }
        //[Required]
        //public Sort_Category Sort_Category { get; set; }
        [Required]
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

    }
}
