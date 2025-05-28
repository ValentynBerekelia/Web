namespace SeniorCursor.API.Models;

public class Cursor
{
    public int Id { get; set; }
    public int PackageId { get; set; }
    public int CursorTypeId { get; set; }
    public string CursorName { get; set; } = string.Empty;
    public string PathToIcon { get; set; } = string.Empty;
    public Package Package { get; set; } = null!;
    public CursorType Type { get; set; } = null!;
} 