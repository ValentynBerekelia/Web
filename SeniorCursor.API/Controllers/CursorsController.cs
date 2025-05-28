using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeniorCursor.API.Data;
using SeniorCursor.API.Models;
using System.IO;

namespace SeniorCursor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CursorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public CursorsController(ApplicationDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cursor>>> GetCursors()
    {
        return await _context.Cursors
            .Include(c => c.Package)
            .Include(c => c.Type)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Cursor>> GetCursor(int id)
    {
        var cursor = await _context.Cursors
            .Include(c => c.Package)
            .Include(c => c.Type)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (cursor == null)
        {
            return NotFound();
        }

        return cursor;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("add")]
    public async Task<ActionResult<int>> AddCursor([FromForm] IFormFile file, [FromForm] int packageId, [FromForm] int cursorTypeId, [FromForm] string cursorName)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("File is required");
        }

        if (string.IsNullOrEmpty(cursorName))
        {
            return BadRequest("Cursor name is required");
        }

        // Check if package exists
        var package = await _context.Packages.FindAsync(packageId);
        if (package == null)
        {
            return BadRequest("Package not found");
        }

        // Check if cursor type exists
        var cursorType = await _context.CursorTypes.FindAsync(cursorTypeId);
        if (cursorType == null)
        {
            return BadRequest("Cursor type not found");
        }

        var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var cursor = new Cursor
        {
            PackageId = packageId,
            CursorTypeId = cursorTypeId,
            CursorName = cursorName,
            PathToIcon = $"/uploads/{uniqueFileName}"
        };

        try
        {
            _context.Cursors.Add(cursor);
            await _context.SaveChangesAsync();
            return Ok(cursor.Id);
        }
        catch (Exception ex)
        {
            // Delete uploaded file if database operation fails
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            return BadRequest($"Error saving cursor: {ex.Message}");
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("update/{id}")]
    public async Task<ActionResult<int>> UpdateCursor(int id, [FromForm] IFormFile? file, [FromForm] int packageId, [FromForm] int cursorTypeId, [FromForm] string cursorName)
    {
        var cursor = await _context.Cursors.FindAsync(id);
        if (cursor == null)
        {
            return NotFound();
        }

        if (string.IsNullOrEmpty(cursorName))
        {
            return BadRequest("Cursor name is required");
        }

        if (file != null)
        {
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Delete old file if exists
            if (!string.IsNullOrEmpty(cursor.PathToIcon))
            {
                var oldFilePath = Path.Combine(_environment.WebRootPath, cursor.PathToIcon.TrimStart('/'));
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }

            var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            cursor.PathToIcon = $"/uploads/{uniqueFileName}";
        }

        cursor.PackageId = packageId;
        cursor.CursorTypeId = cursorTypeId;
        cursor.CursorName = cursorName;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CursorExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return Ok(cursor.Id);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteCursor(int id)
    {
        var cursor = await _context.Cursors.FindAsync(id);
        if (cursor == null)
        {
            return NotFound();
        }

        // Delete associated file
        if (!string.IsNullOrEmpty(cursor.PathToIcon))
        {
            var filePath = Path.Combine(_environment.WebRootPath, cursor.PathToIcon.TrimStart('/'));
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        _context.Cursors.Remove(cursor);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CursorExists(int id)
    {
        return _context.Cursors.Any(e => e.Id == id);
    }
} 