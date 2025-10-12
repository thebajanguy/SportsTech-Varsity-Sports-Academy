using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using Org.BouncyCastle.Ocsp;
using System.Net;
using System.Text;
using IntakeAPI.DTOs;
using IntakeAPI.Extensions;
using IntakeAPI.Settings;


namespace IntakeAPI.Services;

internal interface IEmailService
{
    Task<string> SendEmailAsync(CorrespondenceDto c, IEnumerable<string>? additionalTo = null, CancellationToken ct = default);
}


internal class EmailService(IOptions<GmailOptions> mailOptions) : IEmailService
{
    private readonly GmailOptions _mailOptions = mailOptions.Value ?? throw new ArgumentNullException(nameof(mailOptions));

    public async Task<string> SendEmailAsync(CorrespondenceDto c, IEnumerable<string>? additionalTo = null, CancellationToken ct = default)
    {
        try
        {
            var (subject, html, text) = BuildForCorrespondence(c);

            // Merge configured default MailTo with any additional recipients
            // var recipients = MergeRecipients(_mailOptions.MailTo, additionalTo);

            //var mail = new Domain.ValueObjects.Emails.Email
            //{
            //    MailFrom = _mailOptions.MailFrom,
            //    MailFromName = _mailOptions.MailFromName,
            //    MailTo = recipients,
            //    Subject = subject,
            //    HtmlBody = html,
            //    PlainTextBody = text
            //};

            // Env config

            var gmailUser = _mailOptions.GmailUser ?? Environment.GetEnvironmentVariable("GmailUser");
            var gmailAppPassword = _mailOptions.GmailAppPassword ?? Environment.GetEnvironmentVariable("GmailAppPassword");  // 16-char app password
            var contactTo = _mailOptions.MailTo ?? Environment.GetEnvironmentVariable("MailTo");


            // Compose email
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress($"VSA Prep Contact Form", gmailUser)); // must be the Gmail user for deliverability
            msg.To.Add(new MailboxAddress($"VSA Prep Contact Form - {c.GivenName} {c.Surname}", MailboxAddress.Parse(contactTo).ToString()));
            msg.ReplyTo.Add(new MailboxAddress($"{c.GivenName} {c.Surname}", MailboxAddress.Parse(c.Email).ToString()));
            msg.Subject = subject;

            var safeHtml = System.Net.WebUtility.HtmlEncode(c.Message).Replace("\n", "<br/>");

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
