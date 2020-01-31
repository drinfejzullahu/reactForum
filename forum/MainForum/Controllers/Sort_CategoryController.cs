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
    public class Sort_CategoryController : ControllerBase
    {
        private readonly ForumContext _context;
        public Sort_CategoryController(ForumContext context)
        {
            _context = context;

            if (_context.Sort_Categories.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Sort_Categories.Add(new Sort_Category { Name = "Item1" });
                _context.SaveChanges();
            }
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sort_Category>>> GetTodoItems()
        {
            return await _context.Sort_Categories.ToListAsync();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sort_Category>> GetTodoItem(long id)
        {
            var todoItem = await _context.Sort_Categories.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Sort_Category>> PostTodoItem(Sort_Category item)
        {
            _context.Sort_Categories.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, Sort_Category item)
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
            var todoItem = await _context.Sort_Categories.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Sort_Categories.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}