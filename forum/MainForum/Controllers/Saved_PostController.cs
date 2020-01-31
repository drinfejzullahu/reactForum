using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MainForum.Models;
using Microsoft.EntityFrameworkCore;

namespace MainForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Saved_PostController : ControllerBase
    {
        private readonly ForumContext _context;
        public Saved_PostController(ForumContext context)
        {
            _context = context;

            if (_context.Saved_Posts.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Saved_Posts.Add(new Saved_Posts { Id = 1 });
                _context.SaveChanges();
            }
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Saved_Posts>>> GetTodoItems()
        {
            return await _context.Saved_Posts.ToListAsync();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Saved_Posts>> GetTodoItem(long id)
        {
            var todoItem = await _context.Saved_Posts.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Saved_Posts>> PostTodoItem(Saved_Posts item)
        {
            _context.Saved_Posts.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, Saved_Posts item)
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
            var todoItem = await _context.Saved_Posts.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Saved_Posts.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}