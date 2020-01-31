using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MainForum.Models
{
    public class ForumContext : DbContext
    {

        public ForumContext(DbContextOptions<ForumContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Sort_Category> Sort_Categories{ get; set; }
        public DbSet<Saved_Posts> Saved_Posts{ get; set; }
        public DbSet<Subscribed_Rooms> Subscribed_Rooms{ get; set; }
    }
}

