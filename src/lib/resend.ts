import { Resend } from "resend";

let resendInstance: Resend | null = null;

export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_your_api_key")) {
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export function fromAddress(): string {
  return process.env.RESEND_FROM || "Elifsi Technologies <notifications@elifsi.com>";
}

export function notifyContactAddress(): string {
  return process.env.RESEND_NOTIFY_EMAIL || "contact@elifsi.com";
}

export function notifyCareersAddress(): string {
  return process.env.RESEND_CAREERS_EMAIL || "careers@elifsi.com";
}

/**
 * Generate a unique reference ID for submissions
 */
export function generateReferenceId(prefix: "CNT" | "APP"): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ELF-${prefix}-${dateStr}-${rand}`;
}

/**
 * HTML Email template for internal contact inquiry notification
 */
export function buildContactNotificationHtml(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  topic: string;
  message: string;
  refId: string;
  receivedAt: string;
}): string {
  const row = (label: string, value?: string) => {
    if (!value?.trim()) return "";
    return `<tr>
      <td style="padding:10px 16px;color:#667085;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #E5E7EB;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;color:#111827;font-size:14px;border-bottom:1px solid #E5E7EB;line-height:1.5;">${value.trim()}</td>
    </tr>`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <tr>
          <td style="background:#111827;border-bottom:3px solid #F51F3D;padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;color:#FFFFFF;font-size:16px;font-weight:700;letter-spacing:-0.01em;">ELIFSI TECHNOLOGIES</span>
                  <span style="display:block;color:#9CA3AF;font-size:12px;margin-top:2px;">Corporate Inquiry Gateway</span>
                </td>
                <td align="right">
                  <span style="background:#F51F3D;color:#FFFFFF;font-size:11px;font-weight:600;padding:4px 10px;border-radius:3px;letter-spacing:0.04em;">${data.topic}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 16px;">
            <p style="margin:0 0 16px;font-size:13px;color:#667085;">Reference Code: <strong style="color:#111827;font-family:monospace;">${data.refId}</strong> · ${data.receivedAt}</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;border:1px solid #E5E7EB;border-radius:4px;margin-bottom:24px;">
              ${row("Sender", data.name)}
              ${row("Email", `<a href="mailto:${data.email}" style="color:#F51F3D;text-decoration:none;font-weight:600;">${data.email}</a>`)}
              ${row("Organization", data.organization)}
              ${row("Phone", data.phone)}
              ${row("Topic", data.topic)}
            </table>

            <h4 style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#667085;">Message Content</h4>
            <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-left:3px solid #F51F3D;border-radius:3px;padding:16px;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${data.message}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid #E5E7EB;">
            <a href="mailto:${data.email}?subject=Re:%20Inquiry%20to%20Elifsi%20Technologies%20[${data.refId}]" style="display:inline-block;background:#F51F3D;color:#FFFFFF;padding:12px 24px;border-radius:4px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:0.02em;">Reply to ${data.name}</a>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F8FA;padding:16px 32px;border-top:1px solid #E5E7EB;font-size:11px;color:#667085;">
            Elifsi Technologies Private Limited · Automated Corporate Dispatch
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

/**
 * HTML Email auto-reply sent to the user who contacted Elifsi
 */
export function buildContactConfirmationHtml(name: string, refId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <tr>
          <td style="background:#111827;border-bottom:3px solid #F51F3D;padding:24px 32px;">
            <span style="display:inline-block;color:#FFFFFF;font-size:16px;font-weight:700;letter-spacing:-0.01em;">ELIFSI TECHNOLOGIES</span>
            <span style="display:block;color:#9CA3AF;font-size:12px;margin-top:2px;">Software & Technology Platforms</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 24px;font-size:15px;line-height:1.7;color:#111827;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:600;">Hello ${name},</p>
            <p style="margin:0 0 16px;">Thank you for contacting <strong>Elifsi Technologies Private Limited</strong>. We have received your message and routed it to the relevant team.</p>
            <div style="background:#FFF1F3;border:1px solid #F51F3D;border-radius:4px;padding:12px 16px;margin:20px 0;font-size:13px;color:#D91432;">
              Your submission reference code is: <strong style="font-family:monospace;letter-spacing:0.05em;">${refId}</strong>
            </div>
            <p style="margin:0 0 16px;color:#667085;font-size:14px;">A member of our team will review your inquiry and follow up shortly. If you have any immediate documents or supplementary context to share, simply reply directly to this email with your reference code preserved in the subject line.</p>
            <p style="margin:24px 0 0;font-size:14px;color:#111827;">Best regards,<br><strong>The Elifsi Technologies Team</strong></p>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F8FA;padding:20px 32px;border-top:1px solid #E5E7EB;font-size:12px;color:#667085;line-height:1.5;">
            <strong>Elifsi Technologies Private Limited</strong><br>
            Creator of Evrry & Intelligent Software Platforms · <a href="https://www.elifsi.com" style="color:#F51F3D;text-decoration:none;">elifsi.com</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

/**
 * HTML Email template for internal job application notification
 */
export function buildJobApplicationNotificationHtml(data: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  jobSlug: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  coverLetter?: string;
  additionalMessage?: string;
  hasResumeAttachment: boolean;
  resumeFileName?: string;
  refId: string;
  receivedAt: string;
}): string {
  const row = (label: string, value?: string) => {
    if (!value?.trim()) return "";
    return `<tr>
      <td style="padding:10px 16px;color:#667085;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;border-bottom:1px solid #E5E7EB;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;color:#111827;font-size:14px;border-bottom:1px solid #E5E7EB;line-height:1.5;">${value.trim()}</td>
    </tr>`;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <tr>
          <td style="background:#111827;border-bottom:3px solid #F51F3D;padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;color:#FFFFFF;font-size:16px;font-weight:700;letter-spacing:-0.01em;">ELIFSI TECHNOLOGIES</span>
                  <span style="display:block;color:#9CA3AF;font-size:12px;margin-top:2px;">Talent & Engineering Applications</span>
                </td>
                <td align="right">
                  <span style="background:#FFF1F3;color:#D91432;border:1px solid #F51F3D;font-size:11px;font-weight:700;padding:4px 10px;border-radius:3px;">${data.jobTitle}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 16px;">
            <p style="margin:0 0 16px;font-size:13px;color:#667085;">Reference Code: <strong style="color:#111827;font-family:monospace;">${data.refId}</strong> · ${data.receivedAt}</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F8FA;border:1px solid #E5E7EB;border-radius:4px;margin-bottom:24px;">
              ${row("Applicant", data.fullName)}
              ${row("Role", `${data.jobTitle} (${data.jobSlug})`)}
              ${row("Email", `<a href="mailto:${data.email}" style="color:#F51F3D;text-decoration:none;font-weight:600;">${data.email}</a>`)}
              ${row("Phone", data.phone)}
              ${row("Location", data.location)}
              ${row("Portfolio", data.portfolioUrl ? `<a href="${data.portfolioUrl}" target="_blank" style="color:#F51F3D;">${data.portfolioUrl}</a>` : "")}
              ${row("GitHub", data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" style="color:#F51F3D;">${data.githubUrl}</a>` : "")}
              ${row("LinkedIn", data.linkedinUrl ? `<a href="${data.linkedinUrl}" target="_blank" style="color:#F51F3D;">${data.linkedinUrl}</a>` : "")}
              ${row("Resume Attachment", data.hasResumeAttachment ? `Attached (${data.resumeFileName})` : "No file attached")}
            </table>

            ${
              data.coverLetter
                ? `<h4 style="margin:16px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#667085;">Cover Letter / Context</h4>
                   <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-left:3px solid #111827;border-radius:3px;padding:16px;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;margin-bottom:16px;">${data.coverLetter}</div>`
                : ""
            }

            ${
              data.additionalMessage
                ? `<h4 style="margin:16px 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#667085;">Additional Notes</h4>
                   <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:3px;padding:16px;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${data.additionalMessage}</div>`
                : ""
            }
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 28px;border-top:1px solid #E5E7EB;">
            <a href="mailto:${data.email}?subject=Application%20for%20${encodeURIComponent(data.jobTitle)}%20at%20Elifsi%20Technologies%20[${data.refId}]" style="display:inline-block;background:#F51F3D;color:#FFFFFF;padding:12px 24px;border-radius:4px;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:0.02em;">Review & Contact Candidate</a>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F8FA;padding:16px 32px;border-top:1px solid #E5E7EB;font-size:11px;color:#667085;">
            Elifsi Technologies Private Limited · Confidential Candidate Profile
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

/**
 * HTML Email auto-reply sent to candidate confirming receipt
 */
export function buildJobApplicationConfirmationHtml(fullName: string, jobTitle: string, refId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F8FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <tr>
          <td style="background:#111827;border-bottom:3px solid #F51F3D;padding:24px 32px;">
            <span style="display:inline-block;color:#FFFFFF;font-size:16px;font-weight:700;letter-spacing:-0.01em;">ELIFSI TECHNOLOGIES</span>
            <span style="display:block;color:#9CA3AF;font-size:12px;margin-top:2px;">Software & Technology Platforms</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 24px;font-size:15px;line-height:1.7;color:#111827;">
            <p style="margin:0 0 16px;font-size:16px;font-weight:600;">Hello ${fullName},</p>
            <p style="margin:0 0 16px;">Thank you for your interest in joining <strong>Elifsi Technologies Private Limited</strong>. We have received your application for the <strong>${jobTitle}</strong> position.</p>
            <div style="background:#FFF1F3;border:1px solid #F51F3D;border-radius:4px;padding:12px 16px;margin:20px 0;font-size:13px;color:#D91432;">
              Application Reference Code: <strong style="font-family:monospace;letter-spacing:0.05em;">${refId}</strong>
            </div>
            <p style="margin:0 0 16px;color:#667085;font-size:14px;">Our engineering and talent team reviews every candidate profile individually. If your background aligns with our immediate technical milestones or upcoming product initiatives, we will reach out directly to coordinate an introductory conversation.</p>
            <p style="margin:24px 0 0;font-size:14px;color:#111827;">With appreciation,<br><strong>The Elifsi Technologies Hiring Team</strong></p>
          </td>
        </tr>
        <tr>
          <td style="background:#F7F8FA;padding:20px 32px;border-top:1px solid #E5E7EB;font-size:12px;color:#667085;line-height:1.5;">
            <strong>Elifsi Technologies Private Limited</strong><br>
            Corporate Careers Portal · <a href="https://www.elifsi.com/careers" style="color:#F51F3D;text-decoration:none;">elifsi.com/careers</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}
