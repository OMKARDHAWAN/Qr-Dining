using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace backend.AiService
{
    public class AzureMlScoringClient : IAzureMlScoringClient
    {
        private readonly HttpClient _httpClient;

        public AzureMlScoringClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<JsonDocument> ScoreAsync(AzureMlEndpointOptions endpoint, string[] featureNames, object[][] featureValues, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(endpoint.ScoringUri))
            {
                throw new InvalidOperationException("ScoringUri is required");
            }

            var payload = new
            {
                input_data = new
                {
                    columns = featureNames,
                    data = featureValues
                }
            };

            var json = JsonSerializer.Serialize(payload);
            using var request = new HttpRequestMessage(HttpMethod.Post, endpoint.ScoringUri);
            if (!string.IsNullOrWhiteSpace(endpoint.ApiKey))
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", endpoint.ApiKey);
            }
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            using var response = await _httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();
            var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            return await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken);
        }
    }
}
