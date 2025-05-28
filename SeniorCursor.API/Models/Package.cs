namespace SeniorCursor.API.Models;

public class Package
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public ICollection<Cursor> Cursors { get; set; } = new List<Cursor>();
} 