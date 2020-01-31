using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class Sort_Category
    {
        public long Id { get; set; }
        [Required]
        [StringLength(255)]
        public String Name { get; set; }
        [Required]
        public List<Post> Posts { get; set; }
    }
}
