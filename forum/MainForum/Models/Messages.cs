using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class Message
    {
        public long Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Comment { get; set; }
        public int Votes { get; set; }
        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        [Required]
        public long PostId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
        [Required]
        [StringLength(30)]
        public string Username { get; set; }
    }
}

