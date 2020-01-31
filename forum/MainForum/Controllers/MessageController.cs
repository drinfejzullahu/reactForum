using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MainForum.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace MainForum.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly ForumContext _context;
        public MessageController(ForumContext context)
        {
            _context = context;

            //if (_context.Messages.Count() == 0)
            //{
            //    // Create a new TodoItem if collection is empty,
            //    // which means you can't delete all TodoItems.
            //    _context.Messages.Add(new Message { Messages = "Item1" });
            //    _context.SaveChanges();
            //}
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetTodoItems()
        {
            return await _context.Messages.ToListAsync();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetTodoItem(long id)
        {
            var todoItem = await _context.Messages.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
      

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<Message>> PostTodoItem(Message item)
        {
            _context.Messages.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, Message item)
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
            var todoItem = await _context.Messages.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}