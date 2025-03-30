public class SearchProductRequest
{
    public string? Query { get; set; } // Keyword or Description
    public string? SortBy { get; set; } = "Name";
    public bool SortAscending { get; set; } = true;
}
