using System;
using System.Collections.Generic;
using System.Text.Json;

namespace backend.AiService
{
    public class ClassProbability
    {
        public string Label { get; set; } = string.Empty;
        public double Confidence { get; set; }
    }

    public static class AzureMlResponseReader
    {
        public static List<ClassProbability> ReadClassProbabilities(JsonElement root)
        {
            var result = new List<ClassProbability>();
            try
            {
                if (root.ValueKind == JsonValueKind.Array)
                {
                    foreach (var item in root.EnumerateArray())
                    {
                        if (item.ValueKind == JsonValueKind.Object)
                        {
                            foreach (var prop in item.EnumerateObject())
                            {
                                if (prop.Value.TryGetDouble(out var val))
                                {
                                    result.Add(new ClassProbability { Label = prop.Name, Confidence = val });
                                }
                            }
                        }
                    }
                }
            }
            catch { }
            return result;
        }

        public static double ReadNumericPrediction(JsonElement root)
        {
            try
            {
                if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
                {
                    var el = root[0];
                    if (el.ValueKind == JsonValueKind.Number)
                    {
                        return el.GetDouble();
                    }
                }
            }
            catch { }
            return 0.0;
        }
    }
}
