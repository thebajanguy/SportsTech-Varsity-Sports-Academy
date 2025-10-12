using IntakeAPI.DTOs;
using IntakeAPI.Extensions;
using IntakeAPI.Settings;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using MimeKit;
using Org.BouncyCastle.Ocsp;
using System.Diagnostics.Metrics;
using System.Net;
using System.Numerics;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace IntakeAPI.Services;

internal interface IEmailService
{
    Task<string> SendCorrespondenceEmailAsync(CorrespondenceDto c, IEnumerable<string>? additionalTo = null, CancellationToken ct = default);
    Task<string> SendRegistrationEmailAsync(ActivityRegistrationDto c, IEnumerable<string>? additionalTo = null, CancellationToken ct = default);

}


internal class EmailService(IOptions<GmailOptions> mailOptions) : IEmailService
{
    private readonly GmailOptions _mailOptions = mailOptions.Value ?? throw new ArgumentNullException(nameof(mailOptions));

    public async Task<string> SendRegistrationEmailAsync(ActivityRegistrationDto r, IEnumerable<string>? additionalTo = null, CancellationToken ct = default)
    {
        try
        {
            var (subject, html, text) = BuildForRegistration(r);

            var gmailUser = _mailOptions.GmailUser;
            var gmailAppPassword = _mailOptions.GmailAppPassword ;  // 16-char app password
            var contactTo = _mailOptions.MailTo ;


            // Compose email
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress($"VSA Prep Contact Form", gmailUser)); // must be the Gmail user for deliverability
            msg.To.Add(new MailboxAddress($"VSA Prep Contact Form - {r.Guardian?.GuardianName}", MailboxAddress.Parse(contactTo).ToString()));
            msg.ReplyTo.Add(new MailboxAddress($"{r.Guardian?.GuardianName}", MailboxAddress.Parse(r.Guardian?.GuardianEmail).ToString()));
            msg.Subject = subject;

            var builder = new BodyBuilder
            {
                TextBody = text,    //$"{body.Message}\n\n---\nFrom: {body.GivenName} {body.Surname} <{body.Email}>",
                HtmlBody = html     //$"<p>{safeHtml}</p><hr><p>From: {System.Net.WebUtility.HtmlEncode(body.GivenName)} {System.Net.WebUtility.HtmlEncode(body.Surname)} &lt;{System.Net.WebUtility.HtmlEncode(body.Email)}&gt;</p>"
            };
            msg.Body = builder.ToMessageBody();

            // Send via Gmail SMTP (SSL 465 or STARTTLS 587)
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.SslOnConnect, ct);
            await smtp.AuthenticateAsync(gmailUser, gmailAppPassword, ct);
            var sentAsync = await smtp.SendAsync(msg, ct);
            await smtp.DisconnectAsync(true, ct);

            return sentAsync;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    public async Task<string> SendCorrespondenceEmailAsync(CorrespondenceDto c, IEnumerable<string>? additionalTo = null, CancellationToken ct = default)
    {
        try
        {
            var (subject, html, text) = BuildForCorrespondence(c);


            var gmailUser = _mailOptions.GmailUser;
            var gmailAppPassword = _mailOptions.GmailAppPassword;  // 16-char app password
            var contactTo = _mailOptions.MailTo ;

            // Compose email
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress($"VSA Prep Contact Form", gmailUser)); // must be the Gmail user for deliverability
            msg.To.Add(new MailboxAddress($"VSA Prep Contact Form - {c.GivenName} {c.Surname}", MailboxAddress.Parse(contactTo).ToString()));
            msg.ReplyTo.Add(new MailboxAddress($"{c.GivenName} {c.Surname}", MailboxAddress.Parse(c.Email).ToString()));
            msg.Subject = subject;

            var builder = new BodyBuilder
            {
                TextBody = text,    //$"{body.Message}\n\n---\nFrom: {body.GivenName} {body.Surname} <{body.Email}>",
                HtmlBody = html     //$"<p>{safeHtml}</p><hr><p>From: {System.Net.WebUtility.HtmlEncode(body.GivenName)} {System.Net.WebUtility.HtmlEncode(body.Surname)} &lt;{System.Net.WebUtility.HtmlEncode(body.Email)}&gt;</p>"
            };
            msg.Body = builder.ToMessageBody();

            // Send via Gmail SMTP (SSL 465 or STARTTLS 587)
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.gmail.com", 465, MailKit.Security.SecureSocketOptions.SslOnConnect, ct);
            await smtp.AuthenticateAsync(gmailUser, gmailAppPassword, ct);
            var sentAsync = await smtp.SendAsync(msg, ct);
            await smtp.DisconnectAsync(true, ct);

            return sentAsync;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    private static (string subject, string html, string text) BuildForCorrespondence(CorrespondenceDto c)
    {
        var kind = ResolveKindDisplay(c);

        var subject = $"[{c.ApplicationName}] {kind}: {c.Interest ?? "New submission"}";

        var sb = new StringBuilder();
        // HTML
        sb.Append("<div style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4\">");
        sb.Append($"<h2 style=\"margin:0 0 8px\">{Escape(subject)}</h2>");
        sb.Append("<table style=\"border-collapse:collapse\">");

        sb = Row(sb, "Type", kind);
        sb = Row(sb, "When", c.Timestamp.ToString("u"));
        sb = Row(sb, "Given Name", c.GivenName);
        sb = Row(sb, "Surname", c.Surname);
        sb = Row(sb, "Phone", c.Phone);
        sb = Row(sb, "Email", c.Email);
        sb = Row(sb, "Country", c.Country);
        sb = Row(sb, "Interest", c.Interest);
        sb = Row(sb, "Day", c.Day);
        sb = Row(sb, "Time", c.Time);
        sb = Row(sb, "Year", c.Year);
        sb = Row(sb, "Message", c.Message);

        sb.Append("</table></div>");
        var html = sb.ToString();

        // Plain text
        var lines = new List<string>
        {
            subject,
            $"Type: {kind}",
            $"When: {c.Timestamp:u}"
        };

        lines = Line(lines, "Email", c.Email);
        lines = Line(lines, "Given Name", c.GivenName);
        lines = Line(lines, "Surname", c.Surname);
        lines = Line(lines, "Country", c.Country);
        lines = Line(lines, "Sport", c.Interest);
        lines = Line(lines, "Interest", c.Interest);
        lines = Line(lines, "Day", c.Day);
        lines = Line(lines, "Time", c.Time);
        lines = Line(lines, "Year", c.Year);
        if (!string.IsNullOrWhiteSpace(c.Message))
        {
            lines.Add("");
            lines.Add("Message:");
            lines.Add(c.Message!);
        }

        var text = string.Join(Environment.NewLine, lines);
        return (subject, html, text);

    }

    private static (string subject, string html, string text) BuildForRegistration(ActivityRegistrationDto r)
    {

        var subject = $"[{r.ApplicationName}] {r.RegistrationType}: {r.Interest ?? "New Registration"}";

        var sb = new StringBuilder();
        // HTML
        sb.Append("<div style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4\">");
        sb.Append($"<h2 style=\"margin:0 0 8px\">{Escape(subject)}</h2>");
        sb.Append("<table style=\"border-collapse:collapse\">");

        sb = Row(sb, "Type", r.RegistrationType);
        sb = Row(sb, "Country", r.Country);
        sb = Row(sb, "Interest", r.Interest);
        sb = Row(sb, "ActivityId", r.ActivityId);
        sb = Row(sb, "When", r.Timestamp.ToString("u"));

        sb = Row(sb, "Given Name", r.Player.Givenname);
        sb = Row(sb, "Surname", r.Player.Surname);
        sb = Row(sb, "DOB", r.Player.DOB);
        sb = Row(sb, "Phone", r.Player.Phone);
        sb = Row(sb, "Email", r.Player.Email);

        sb = Row(sb, "School", r.Player.School);
        sb = Row(sb, "GradeOrForm", r.Player.GradeOrForm);

        sb = Row(sb, "Position", r.Player.Position);
        sb = Row(sb, "SkillLevel", r.Player.SkillLevel);
        sb = Row(sb, "TshirtSize", r.Player.TshirtSize);

        sb = Row(sb, "GuardianName", r.Guardian.GuardianName);
        sb = Row(sb, "GuardianEmail", r.Guardian.GuardianEmail);
        sb = Row(sb, "GuardianPhone", r.Guardian.GuardianPhone);
        sb = Row(sb, "GuardianRelation", r.Guardian.GuardianRelation);

        sb = Row(sb, "PaymentMethod", r.Payment.PaymentMethod);
        sb = Row(sb, "PaymentAmount", $"{r.Payment.PaymentAmount}");
        sb = Row(sb, "PaymentCurrency", r.Payment.PaymentCurrency);
        sb = Row(sb, "PaymentStatus", r.Payment.PaymentStatus);
        sb = Row(sb, "PaymentTransactionId", r.Payment.PaymentTransactionId);

        sb = Row(sb, "Notes", r.Notes);

        sb.Append("</table></div>");

        var html = sb.ToString();

        // Plain text
        var lines = new List<string>
        {
            subject,
            $"Type: {r.RegistrationType}",
            $"When: {r.Timestamp:u}"
        };


        lines = Line(lines, "Type", r.RegistrationType);
        lines = Line(lines, "Country", r.Country);
        lines = Line(lines, "Interest", r.Interest);
        lines = Line(lines, "ActivityId", r.ActivityId);
        lines = Line(lines, "When", r.Timestamp.ToString("u"));

        lines = Line(lines, "Given Name", r.Player.Givenname);
        lines = Line(lines, "Surname", r.Player.Surname);
        lines = Line(lines, "DOB", r.Player.DOB);
        lines = Line(lines, "Phone", r.Player.Phone);
        lines = Line(lines, "Email", r.Player.Email);

        lines = Line(lines, "School", r.Player.School);
        lines = Line(lines, "GradeOrForm", r.Player.GradeOrForm);

        lines = Line(lines, "Position", r.Player.Position);
        lines = Line(lines, "SkillLevel", r.Player.SkillLevel);
        lines = Line(lines, "TshirtSize", r.Player.TshirtSize);

        lines = Line(lines, "GuardianName", r.Guardian.GuardianName);
        lines = Line(lines, "GuardianEmail", r.Guardian.GuardianEmail);
        lines = Line(lines, "GuardianPhone", r.Guardian.GuardianPhone);
        lines = Line(lines, "GuardianRelation", r.Guardian.GuardianRelation);

        lines = Line(lines, "PaymentMethod", r.Payment.PaymentMethod);
        lines = Line(lines, "PaymentAmount", $"{r.Payment.PaymentAmount}");
        lines = Line(lines, "PaymentCurrency", r.Payment.PaymentCurrency);
        lines = Line(lines, "PaymentStatus", r.Payment.PaymentStatus);
        lines = Line(lines, "PaymentTransactionId", r.Payment.PaymentTransactionId);
        if (!string.IsNullOrWhiteSpace(r.Notes))
        {
            lines.Add("");
            lines.Add("Notes:");
            lines.Add(r.Notes!);
        }

        var text = string.Join(Environment.NewLine, lines);
        return (subject, html, text);
    }


    private static string MergeRecipients(string? configured, IEnumerable<string>? extra)
    {
        var list = new List<string>();

        void addCsv(string? csv)
        {
            if (string.IsNullOrWhiteSpace(csv)) return;
            list.AddRange(csv.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries));
        }

        addCsv(configured);
        if (extra is not null) list.AddRange(extra);

        // de-dupe (case-insensitive)
        return string.Join(",", list
            .Select(x => x.Trim())
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Distinct(StringComparer.OrdinalIgnoreCase));
    }
    private static StringBuilder Row(StringBuilder sb, string label, string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return sb;
        sb.Append("<tr>");
        sb.Append($"<td style=\"padding:4px 8px;color:#666;white-space:nowrap\">{Escape(label)}:</td>");
        sb.Append($"<td style=\"padding:4px 8px\">{Escape(value)}</td>");
        sb.Append("</tr>");

        return sb;
    }
    private static List<string> Line(List<string> lines, string label, string? value)
    {
        if (!string.IsNullOrWhiteSpace(value)) 
            lines.Add($"{label}: {value}");

        return lines;
    }
    private static string Escape(string s) => System.Net.WebUtility.HtmlEncode(s);
    // Uses your enum mapping if present; otherwise fall back to the string
    // e.g., "RequestForInformation", "RequestForConsultation", "RequestForNewsLetter"
    private static string ResolveKindDisplay(CorrespondenceDto c) => c.CorrespondenceType ?? "Correspondence";



}
