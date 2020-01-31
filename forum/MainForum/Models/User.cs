using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class User 
    {
        public long Id { get; set; }
        [StringLength(100)]
        public string FullName { get; set; }

        [StringLength(50)]
        public string Email { get; set; }
        [StringLength(255)]
        public string Username { get; set; }
        [Required]
        [StringLength(255)]
        public string Password { get; set; }
        public int BirthDay { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        
        public List<Message> Messages { get; set; }
        public List<Post> Posts { get; set; }
        public List<Saved_Posts> Saved_Posts { get; set; }
        public List<Subscribed_Rooms> Subscribed_Posts { get; set; }

    }
}
