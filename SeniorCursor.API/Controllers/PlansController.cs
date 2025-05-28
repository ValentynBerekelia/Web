using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SeniorCursor.API.Data;
using SeniorCursor.API.Models;

namespace SeniorCursor.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlansController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PlansController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Plan>>> GetPlans()
    {
        return await _context.Plans.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Plan>> GetPlan(int id)
    {
        var plan = await _context.Plans.FindAsync(id);

        if (plan == null)
        {
            return NotFound();
        }

        return plan;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Plan>> CreatePlan(Plan plan)
    {
        _context.Plans.Add(plan);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPlan), new { id = plan.Id }, plan);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlan(int id, Plan plan)
    {
        if (id != plan.Id)
        {
            return BadRequest();
        }

        _context.Entry(plan).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PlanExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlan(int id)
    {
        var plan = await _context.Plans.FindAsync(id);
        if (plan == null)
        {
            return NotFound();
        }

        _context.Plans.Remove(plan);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PlanExists(int id)
    {
        return _context.Plans.Any(e => e.Id == id);
    }
} 