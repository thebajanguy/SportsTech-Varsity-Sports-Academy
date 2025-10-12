using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using System.Text.Json;

namespace IntakeAPI.Extensions;

public static class HttpExtensions
{
    public static HttpResponseData CreateResponse(this HttpRequestData req, HttpStatusCode status, object? payload = null)
    {
        var res = req.CreateResponse(status);
        if (payload is not null)
        {
            res.Headers.Add("Content-Type", "application/json; charset=utf-8");
            res.WriteString(JsonSerializer.Serialize(payload));
        }
        return res;
    }


    public static async Task<T?> ReadFromJsonAsync<T>(
        this HttpRequestData req,
        JsonSerializerOptions jsonOptions,
        CancellationToken ct)
    {
        using var s = req.Body;
        return await JsonSerializer.DeserializeAsync<T>(s, jsonOptions, ct);
    }

    public static async Task<HttpResponseData> JsonAsync(
        this HttpRequestData req,
        object payload,
        JsonSerializerOptions jsonOptions,
        HttpStatusCode status = HttpStatusCode.OK,
        Action<HttpResponseData>? configure = null,
        CancellationToken ct = default)
    {
        var res = req.CreateResponse(status);
        configure?.Invoke(res);
        await JsonSerializer.SerializeAsync(res.Body, payload, jsonOptions, ct);
        res.Headers.Add("Content-Type", "application/json; charset=utf-8");
        return res;
    }

    public static HttpResponseData Problem(this HttpRequestData req, string title, string detail, HttpStatusCode status)
    {
        var res = req.CreateResponse(status);
        res.Headers.Add("Content-Type", "application/problem+json");
        var obj = new
        {
            type = "about:blank",
            title,
            detail,
            status = (int)status
        };
        res.WriteString(System.Text.Json.JsonSerializer.Serialize(obj));
        return res;
    }

    private static string? ReadAppName(this HttpRequestData req)
    {
        // Prefer header
        if (req.Headers.TryGetValues("X-Application-Name", out var values))
        {
            var h = values.FirstOrDefault();
            if (!string.IsNullOrWhiteSpace(h)) return h;
        }
        // Fallback query string
        var q = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
        var qs = q["applicationName"];
        return string.IsNullOrWhiteSpace(qs) ? null : qs;
    }

    //public static bool TrySetApp(this HttpRequestData req, IApplicationNameAccessor _appAccessor, out HttpResponseData? badResponse)
    //{
    //    var app = req.ReadAppName();

    //    if (string.IsNullOrWhiteSpace(app))
    //    {
    //        badResponse = req.Problem(
    //            "Missing ApplicationName",
    //            "Provide 'X-Application-Name' header or 'applicationName' query parameter.",
    //            HttpStatusCode.BadRequest);
    //        return false;
    //    }
    //    _appAccessor.Current = app;
    //    badResponse = null;
    //    return true;
    //}

    public static void AddCors(this HttpResponseData res, HttpRequestData req)
    {
        // For local dev; prefer Host CORS config (see local.settings.json) in real apps
        res.Headers.Add("Access-Control-Allow-Origin", GetOrigin(req) ?? "*");
        res.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
        res.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS");
    }
    private static string? GetOrigin(HttpRequestData req) =>
       req.Headers.TryGetValues("Origin", out var values) ? values.FirstOrDefault() : null;

    public  static string GetEnv(string key) =>
        Environment.GetEnvironmentVariable(key)
        ?? throw new InvalidOperationException($"Missing configuration: {key}");

}
