using System.Globalization;
using System.Text.Json;

namespace backend.AI;

/// <summary>Normalizes the common AutoML endpoint response shapes without coupling controllers to a scoring script.</summary>
public static class AzureMlResponseReader
{
    public static double ReadNumericPrediction(JsonElement root)
    {
        foreach (var name in new[] { "prediction", "predictions", "result", "Results", "output" })
        {
            if (TryGet(root, name, out var value) && TryReadFirstNumber(value, out var number)) return number;
        }
        if (TryReadFirstNumber(root, out var fallback)) return fallback;
        throw new InvalidOperationException("The Azure ML response did not contain a numeric prediction.");
    }

    public static string ReadLabel(JsonElement root)
    {
        foreach (var name in new[] { "prediction", "predicted_label", "predictions", "result", "Results", "output" })
        {
            if (TryGet(root, name, out var value) && TryReadFirstString(value, out var label)) return label;
        }
        throw new InvalidOperationException("The Azure ML response did not contain a predicted label.");
    }

    public static IReadOnlyList<(string Label, double Confidence)> ReadClassProbabilities(JsonElement root)
    {
        if (TryGet(root, "probabilities", out var probabilities) || TryGet(root, "probability", out probabilities))
        {
            if (probabilities.ValueKind == JsonValueKind.Object)
                return probabilities.EnumerateObject()
                    .Where(p => TryReadFirstNumber(p.Value, out _))
                    .Select(p => (p.Name, ReadNumber(p.Value))).OrderByDescending(x => x.Item2).ToList();

            if (probabilities.ValueKind == JsonValueKind.Array &&
                (TryGet(root, "classes", out var classes) || TryGet(root, "class_labels", out classes)) &&
                classes.ValueKind == JsonValueKind.Array)
            {
                var labels = classes.EnumerateArray().Select(e => e.ToString()).ToArray();
                var values = probabilities.EnumerateArray().Select(ReadNumber).ToArray();
                return labels.Zip(values, (label, confidence) => (label, confidence))
                    .OrderByDescending(x => x.confidence).ToList();
            }
        }

        var label = ReadLabel(root);
        return new[] { (label, 1d) };
    }

    private static bool TryGet(JsonElement root, string name, out JsonElement value)
    {
        if (root.ValueKind == JsonValueKind.Object)
        {
            foreach (var property in root.EnumerateObject())
                if (string.Equals(property.Name, name, StringComparison.OrdinalIgnoreCase))
                {
                    value = property.Value;
                    return true;
                }
        }
        value = default;
        return false;
    }

    private static bool TryReadFirstNumber(JsonElement element, out double value)
    {
        if (element.ValueKind == JsonValueKind.Number && element.TryGetDouble(out value)) return true;
        if (element.ValueKind == JsonValueKind.String && double.TryParse(element.GetString(), NumberStyles.Any, CultureInfo.InvariantCulture, out value)) return true;
        if (element.ValueKind == JsonValueKind.Array)
            foreach (var item in element.EnumerateArray()) if (TryReadFirstNumber(item, out value)) return true;
        if (element.ValueKind == JsonValueKind.Object)
            foreach (var property in element.EnumerateObject()) if (TryReadFirstNumber(property.Value, out value)) return true;
        value = default;
        return false;
    }

    private static bool TryReadFirstString(JsonElement element, out string value)
    {
        if (element.ValueKind == JsonValueKind.String) { value = element.GetString() ?? string.Empty; return !string.IsNullOrWhiteSpace(value); }
        if (element.ValueKind == JsonValueKind.Array)
            foreach (var item in element.EnumerateArray()) if (TryReadFirstString(item, out value)) return true;
        if (element.ValueKind == JsonValueKind.Object)
            foreach (var property in element.EnumerateObject()) if (TryReadFirstString(property.Value, out value)) return true;
        value = string.Empty;
        return false;
    }

    private static double ReadNumber(JsonElement element) => TryReadFirstNumber(element, out var value) ? value : 0;
}
