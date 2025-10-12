// SendContact.cs
using Grpc.Core;
using IntakeAPI.DTOs;
using IntakeAPI.Extensions;
using IntakeAPI.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics.Metrics;
using System.Net;
using System.Numerics;
using System.Text.Json;

namespace IntakeAPI.Functions;


internal class RegistrationHttp(ILogger<RegistrationHttp> logger, IEmailService emailService)
{
    private readonly ILogger<RegistrationHttp> _logger = logger;
    private readonly IEmailService _emailService = emailService;

    [Function("CampRegistrationRequest")]
    public async Task<HttpResponseData> CampRegistrationRequest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post",  Route = "registrations/gold-camp")] HttpRequestData req,
        FunctionContext ctx,
        CancellationToken ct)
    {
        try
        {
            // Read body from input
            var body = await JsonSerializer.DeserializeAsync<ActivityRegistrationDto>(req.Body, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            // Basic validation
            if (body is null ||
                string.IsNullOrWhiteSpace(body.RegistrationType) ||
                string.IsNullOrWhiteSpace(body.Interest) ||
                string.IsNullOrWhiteSpace(body.ActivityId) ||

                string.IsNullOrWhiteSpace(body.Player.Givenname) ||
                string.IsNullOrWhiteSpace(body.Player.Surname) ||
                string.IsNullOrWhiteSpace(body.Player.DOB) ||

                string.IsNullOrWhiteSpace(body.Player.School) ||
                string.IsNullOrWhiteSpace(body.Player.GradeOrForm) ||

                string.IsNullOrWhiteSpace(body.Player.Position) ||
                string.IsNullOrWhiteSpace(body.Player.SkillLevel) ||
                string.IsNullOrWhiteSpace(body.Player.TshirtSize) ||

                string.IsNullOrWhiteSpace(body.Guardian.GuardianName) ||
                string.IsNullOrWhiteSpace(body.Guardian.GuardianEmail) ||
                string.IsNullOrWhiteSpace(body.Guardian.GuardianPhone) ||
                string.IsNullOrWhiteSpace(body.Guardian.GuardianRelation)
            )
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "invalid_payload" });
            }

            // Honeypot trap (hidden input should be empty)
            if (!string.IsNullOrEmpty(body.Honeypot))
            {
                _logger.LogWarning("Bot submission detected.");
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "Bot submission detected." });
            }

            // Send via Gmail SMTP (SSL 465 or STARTTLS 587)
            var sentAsync = await _emailService.SendRegistrationEmailAsync(body, null, ct);

            return req.CreateResponse(HttpStatusCode.OK, new { data = sentAsync });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SendContact failed");
            return req.CreateResponse(HttpStatusCode.InternalServerError, new { error = "email_failed" });
        }
    }

}
