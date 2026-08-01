using System.Text.Json;

namespace backend.AI;

public interface IAzureMlScoringClient
{
    Task<JsonDocument> ScoreAsync(AzureMlEndpointOptions endpoint, IReadOnlyList<string> columns,
        IReadOnlyList<IReadOnlyList<object?>> rows, CancellationToken cancellationToken = default);
}
