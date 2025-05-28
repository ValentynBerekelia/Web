using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeniorCursor.API.Data;
using SeniorCursor.API.Models;

namespace SeniorCursor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CursorTypesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CursorTypesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CursorType>>> GetCursorTypes()
    {
        return await _context.CursorTypes.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CursorType>> GetCursorType(int id)
    {
        var cursorType = await _context.CursorTypes.FindAsync(id);

        if (cursorType == null)
        {
            return NotFound();
        }

        return cursorType;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<CursorType>> CreateCursorType(CursorType cursorType)
    {
        _context.CursorTypes.Add(cursorType);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCursorType), new { id = cursorType.Id }, cursorType);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCursorType(int id, CursorType cursorType)
    {
        if (id != cursorType.Id)
        {
            return BadRequest();
        }

        _context.Entry(cursorType).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CursorTypeExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCursorType(int id)
    {
        var cursorType = await _context.CursorTypes.FindAsync(id);
        if (cursorType == null)
        {
            return NotFound();
        }

        _context.CursorTypes.Remove(cursorType);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CursorTypeExists(int id)
    {
        return _context.CursorTypes.Any(e => e.Id == id);
    }
} 