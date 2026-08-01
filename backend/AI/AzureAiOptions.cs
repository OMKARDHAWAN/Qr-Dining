namespace backend.AI;

/// <summary>Configuration for the four independently deployed Azure ML managed online endpoints.</summary>
public sealed class AzureAiOptions
{
    public const string SectionName = "AzureAi";
    public bool UseLocalDevelopmentFallback { get; set; } = true;
    public int TimeoutSeconds { get; set; } = 20;
    public AzureMlEndpointOptions Recommendation { get; set; } = new();
    public AzureMlEndpointOptions Demand { get; set; } = new();
    public AzureMlEndpointOptions Offer { get; set; } = new();
    public AzureMlEndpointOptions Inventory { get; set; } = new();
}

public sealed class AzureMlEndpointOptions
{
    /// <summary>Azure ML managed online endpoint scoring URI. Leave empty only for local development.</summary>
    public string? ScoringUri { get; set; }

    /// <summary>Set from User Secrets, Key Vault, or Azure App Service settings; never commit a production key.</summary>
    public string? ApiKey { get; set; }
}
