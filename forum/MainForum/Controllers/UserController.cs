using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MainForum.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MainForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ForumContext _context;
        

        public UserController(ForumContext context)
        {
            _context = context;
           

            //if (_context.Users.Count() == 0)
            //{
            //    // Create a new TodoItem if collection is empty,
            //    // which means you can't delete all TodoItems.
            //    _context.Users.Add(new User { FullName = "Item1" });
            //    _context.SaveChanges();
            //}
        }

        //[HttpPost]

        //public async Task<ActionResult> RegisterUser(User user)
        //{
        //    var usr = new IdentityUser { UserName = user.Username, Email = user.Email };
        //    var result = await UserManager.CreateAsync(usr, user.Password);

        //    if (result.Succeeded)
        //    {
        //        await SignInManager.SignInAsync(usr, isPersistent: true);

        //    }
        //    return CreatedAtAction(nameof(User), new { id = user.Id }, user);

        //}

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetTodoItems()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetTodoItem(long id)
        {
            var todoItem = await _context.Users.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<User>> GetUserWithEmail(string email)
        {
            var todoItem = await _context.Users.FirstOrDefaultAsync(s => s.Email == email);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        //POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<User>> PostTodoItem(User item)
        {
            _context.Users.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, User item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var todoItem = await _context.Users.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Users.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
