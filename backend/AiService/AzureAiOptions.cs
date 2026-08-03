namespace backend.AiService
{
    public class AzureMlEndpointOptions
    {
        public string ScoringUri { get; set; } = string.Empty;
        public string ApiKey { get; set; } = string.Empty;
    }

    public class AzureAiOptions
    {
        public const string SectionName = "AzureAi";

        public AzureMlEndpointOptions Recommendation { get; set; } = new();
        public AzureMlEndpointOptions Demand { get; set; } = new();
        public AzureMlEndpointOptions Offer { get; set; } = new();
        public AzureMlEndpointOptions Inventory { get; set; } = new();

        public bool UseLocalDevelopmentFallback { get; set; } = true;
        public int TimeoutSeconds { get; set; } = 30;
    }
}
