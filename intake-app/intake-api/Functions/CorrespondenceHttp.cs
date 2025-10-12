// SendContact.cs
using Grpc.Core;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;
using IntakeAPI.DTOs;
using IntakeAPI.Extensions;
using IntakeAPI.Services;

namespace IntakeAPI.Functions;


internal class CorrespondenceHttp(ILogger<CorrespondenceHttp> logger, IEmailService emailService)
{
    private readonly ILogger<CorrespondenceHttp> _logger = logger;
    private readonly IEmailService _emailService = emailService;

    [Function("SendConsultationRequest")]
    public async Task<HttpResponseData> SendConsultationRequest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post",  Route = "correspondences/consultation")] HttpRequestData req,
        FunctionContext ctx,
        CancellationToken ct)
    {
        try
        {
            // Read body from input
            var body = await JsonSerializer.DeserializeAsync<CorrespondenceDto>(req.Body, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            // Basic validation
            if (body is null ||
                string.IsNullOrWhiteSpace(body.CorrespondenceType) ||
                string.IsNullOrWhiteSpace(body.ApplicationName) ||

                string.IsNullOrWhiteSpace(body.GivenName) ||
                string.IsNullOrWhiteSpace(body.Surname) ||
                string.IsNullOrWhiteSpace(body.Email) ||
                string.IsNullOrWhiteSpace(body.Phone) ||
                string.IsNullOrWhiteSpace(body.Interest) ||
                string.IsNullOrWhiteSpace(body.Message))
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "invalid_payload" });
            }

            // Honeypot trap (hidden input should be empty)
            if (!string.IsNullOrEmpty(body.Honeypot))
            {
                _logger.LogWarning("Bot submission detected.");
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "Bot submission detected." });
            }

            // Length guards
            if (
                body.GivenName.Length > 120 ||
                body.Surname.Length > 120 ||
                body.Email.Length > 160 ||
                body.Phone.Length > 20 ||
                body.Interest.Length > 160 ||
                body.Message.Length > 4000)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "payload_too_large" });
            }


            // Send via Gmail SMTP (SSL 465 or STARTTLS 587)
            var sentAsync = await _emailService.SendCorrespondenceEmailAsync(body, null, ct);

            return req.CreateResponse(HttpStatusCode.OK, new { data = sentAsync });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SendContact failed");
            return req.CreateResponse(HttpStatusCode.InternalServerError, new { error = "email_failed" });
        }
    }

    [Function("SendContactRequest")]
    public async Task<HttpResponseData> SendContactRequest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post",  Route = "correspondences/contact")] HttpRequestData req,
        FunctionContext ctx,
        CancellationToken ct)
    {
        try
        {
            // Read body from input
            var body = await JsonSerializer.DeserializeAsync<CorrespondenceDto>(req.Body, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            // Basic validation
            if (body is null ||
                string.IsNullOrWhiteSpace(body.CorrespondenceType) ||
                string.IsNullOrWhiteSpace(body.ApplicationName) ||

                string.IsNullOrWhiteSpace(body.GivenName) ||
                string.IsNullOrWhiteSpace(body.Surname) ||
                string.IsNullOrWhiteSpace(body.Email) ||
                string.IsNullOrWhiteSpace(body.Phone) ||
                string.IsNullOrWhiteSpace(body.Interest) ||
                string.IsNullOrWhiteSpace(body.Message))
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "invalid_payload" });
            }

            // Honeypot trap (hidden input should be empty)
            if (!string.IsNullOrEmpty(body.Honeypot))
            {
                _logger.LogWarning("Bot submission detected.");
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "Bot submission detected." });
            }

            // Length guards
            if (
                body.GivenName.Length > 120 ||
                body.Surname.Length > 120 ||
                body.Email.Length > 160 ||
                body.Phone.Length > 20 ||
                body.Interest.Length > 160 ||
                body.Message.Length > 4000)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "payload_too_large" });
            }


            // Send via Gmail SMTP (SSL 465 or STARTTLS 587)
            var sentAsync = await _emailService.SendCorrespondenceEmailAsync(body, null, ct);

            return req.CreateResponse(HttpStatusCode.NoContent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SendContact failed");
            return req.CreateResponse(HttpStatusCode.InternalServerError, new { error = "email_failed" });
        }
    }

    [Function("SendNewsletterRequest")]
    public async Task<HttpResponseData> SendNewsletterRequest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post",  Route = "correspondences/newsletter")] HttpRequestData req,
        FunctionContext ctx,
        CancellationToken ct)
    {
        try
        {
            // Read body from input
            var body = await JsonSerializer.DeserializeAsync<CorrespondenceDto>(req.Body, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });


            // Basic validation
            if (body is null ||
                string.IsNullOrWhiteSpace(body.CorrespondenceType) ||
                string.IsNullOrWhiteSpace(body.ApplicationName) ||

                string.IsNullOrWhiteSpace(body.Fullname) ||
                string.IsNullOrWhiteSpace(body.Email) ||
                string.IsNullOrWhiteSpace(body.Interest) ||
                string.IsNullOrWhiteSpace(body.Country))
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "invalid_payload" });
            }

            // Honeypot trap (hidden input should be empty)
            if (!string.IsNullOrEmpty(body.Honeypot))
            {
                _logger.LogWarning("Bot submission detected.");
                return req.CreateResponse(HttpStatusCode.NoContent);
            }

            // Length guards
            if (
                body.Fullname.Length > 320 ||
                body.Email.Length > 160 ||
                body.Interest.Length > 160 ||
                body.Country.Length > 60)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, new { error = "payload_too_large" });
            }

            // Send via Gmail SMTP (SSL 465 or STARTTLS 587)
            var sentAsync = await _emailService.SendCorrespondenceEmailAsync(body, null, ct);

            return req.CreateResponse(HttpStatusCode.NoContent);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SendContact failed");
            return req.CreateResponse(HttpStatusCode.InternalServerError, new { error = "email_failed" });
        }
    }

}
