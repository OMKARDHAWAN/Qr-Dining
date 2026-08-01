using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace backend.AI;

/// <summary>Calls an Azure ML AutoML managed-online-endpoint using its tabular v2 scoring contract.</summary>
public sealed class AzureMlScoringClient : IAzureMlScoringClient
{
    private readonly HttpClient _httpClient;

    public AzureMlScoringClient(HttpClient httpClient) => _httpClient = httpClient;

    public async Task<JsonDocument> ScoreAsync(AzureMlEndpointOptions endpoint, IReadOnlyList<string> columns,
        IReadOnlyList<IReadOnlyList<object?>> rows, CancellationToken cancellationToken = default)
    {
        if (!Uri.TryCreate(endpoint.ScoringUri, UriKind.Absolute, out var scoringUri))
            throw new InvalidOperationException("The Azure ML scoring URI is not configured.");
        if (string.IsNullOrWhiteSpace(endpoint.ApiKey))
            throw new InvalidOperationException("The Azure ML endpoint key is not configured.");

        var payload = new
        {
            input_data = new
            {
                columns,
                data = rows
            }
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, scoringUri)
        {
            Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", endpoint.ApiKey);

        using var response = await _httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new HttpRequestException($"Azure ML scoring returned {(int)response.StatusCode}: {responseBody}");

        return JsonDocument.Parse(responseBody);
    }
}
