using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class Room
    {
        public long Id { get; set; }
        [Required]
        [StringLength(100)]
        public String Name { get; set; }
        public int Viewers { get; set; }
        [Required]
        [StringLength(255)]
        public String Description { get; set; }
  
    }
}
