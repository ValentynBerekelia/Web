using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeniorCursor.API.Data;
using SeniorCursor.API.Models;

namespace SeniorCursor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PackagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PackagesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Package>>> GetPackages()
    {
        return await _context.Packages.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Package>> GetPackage(int id)
    {
        var package = await _context.Packages.FindAsync(id);

        if (package == null)
        {
            return NotFound();
        }

        return package;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Package>> CreatePackage(Package package)
    {
        _context.Packages.Add(package);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPackage), new { id = package.Id }, package);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePackage(int id, Package package)
    {
        if (id != package.Id)
        {
            return BadRequest();
        }

        _context.Entry(package).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PackageExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePackage(int id)
    {
        var package = await _context.Packages.FindAsync(id);
        if (package == null)
        {
            return NotFound();
        }

        _context.Packages.Remove(package);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PackageExists(int id)
    {
        return _context.Packages.Any(e => e.Id == id);
    }
} 