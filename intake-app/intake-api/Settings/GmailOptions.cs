using Microsoft.Extensions.Configuration;

namespace IntakeAPI.Settings;

public sealed class GmailOptions
{
    public const string SectionName = "Gmail";

    public string GmailUser { get; init; } = string.Empty;

    public string GmailAppPassword { get; init; } = string.Empty;

    public string MailTo { get; init; } = string.Empty;

    // Convenience: split "a;b;c" into a list
    public IReadOnlyList<string> MailToList =>
        MailTo.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}
