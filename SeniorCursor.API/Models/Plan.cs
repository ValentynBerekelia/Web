namespace SeniorCursor.API.Models;

public class Plan
{
    public int Id { get; set; }
    public string Price { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public List<string> Features { get; set; } = new();
} 