using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace backend.AiService
{
    public interface IAzureMlScoringClient
    {
        Task<JsonDocument> ScoreAsync(AzureMlEndpointOptions endpoint, string[] featureNames, object[][] featureValues, CancellationToken cancellationToken = default);
    }
}
