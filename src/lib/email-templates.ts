/**
 * Email templates for transactional emails sent via Resend.
 * Brand: deep indigo #1E1854, warm off-whites, clean & calm tone.
 */

export function prelaunchConfirmationEmail(email: string): { subject: string; html: string; text: string } {
  const subject = "You're on the list: Flow";

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>You're on the list: Flow</title>
  <style type="text/css">
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background-color: #f2f1ee; font-family: Arial, Helvetica, sans-serif; }
    body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; max-width: 100%; }
    p { margin: 0 !important; }
    a { color: #1E1854; }
    @media only screen and (max-width: 600px) {
      .wrap { width: 100% !important; border-radius: 0 !important; }
      .pad  { padding-left: 28px !important; padding-right: 28px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f2f1ee;">

<!-- Preheader -->
<div style="display:none; max-height:0; overflow:hidden; font-size:1px; color:#f2f1ee;">
  We received your details. You'll be first to know when Flow launches.
  &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
</div>

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f2f1ee;">
  <tr>
    <td align="center" style="padding: 40px 16px;">

      <!-- Card -->
      <table class="wrap" width="560" cellpadding="0" cellspacing="0" role="presentation"
             style="background-color:#ffffff; border-radius:20px; overflow:hidden;">

        <!-- Header bar -->
        <tr>
          <td style="background-color:#1E1854; padding: 28px 48px;" class="pad">
            <p style="font-family:Arial,Helvetica,sans-serif; font-size:22px; font-weight:700;
                       letter-spacing:-0.03em; color:#ffffff; margin:0 !important;">
              Flow
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 48px 48px 40px;" class="pad">

            <!-- Checkmark icon -->
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="width:48px; height:48px; background-color:#1E1854; border-radius:50%;
                            text-align:center; vertical-align:middle;">
                  <span style="font-size:22px; color:#ffffff; line-height:48px;">✓</span>
                </td>
              </tr>
            </table>

            <p style="font-family:Arial,Helvetica,sans-serif; font-size:26px; font-weight:700;
                       color:#1E1854; letter-spacing:-0.02em; line-height:1.25;
                       margin: 24px 0 12px 0 !important;">
              You're on the list.
            </p>

            <p style="font-family:Arial,Helvetica,sans-serif; font-size:15px; color:#1E1854;
                       opacity:0.65; line-height:1.7; margin:0 0 28px 0 !important;">
              We received your email (<strong style="color:#1E1854; opacity:1;">${email}</strong>)
              and you'll be the first to know the moment Flow is ready to ship.
              <br><br>
              Expect early access, the launch date, and a little something extra for those who believed in us first.
            </p>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr><td style="border-top:1px solid #1E1854; opacity:0.08; height:1px;"></td></tr>
            </table>

            <!-- What is Flow -->
            <p style="font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:700;
                       color:#1E1854; letter-spacing:0.08em; text-transform:uppercase;
                       margin: 28px 0 12px 0 !important;">
              What is Flow?
            </p>
            <p style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#1E1854;
                       opacity:0.60; line-height:1.7; margin:0 !important;">
              Flow is a daily supplement designed around one idea: you are already capable.
              Flow removes what gets in the way: the mental static, the afternoon fog,
              the sense that your mind isn't quite all there.
              13 ingredients. Zero compromises. Crafted for people who take their output seriously.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#f2f1ee; padding: 24px 48px; border-radius:0 0 20px 20px;" class="pad">
            <p style="font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#1E1854;
                       opacity:0.35; line-height:1.6; text-align:center; margin:0 !important;">
              You signed up for early access to Flow.
              If this wasn't you, you can safely ignore this email.
              <br>
              &copy; ${new Date().getFullYear()} Flow Health · flowhealth.com
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

  const text = `You're on the list: Flow

We received your email (${email}) and you'll be the first to know the moment Flow is ready to ship.

Expect early access, the launch date, and a little something extra for those who believed in us first.

---

What is Flow?
Flow is a daily supplement designed around one idea: you are already capable. Flow removes what gets in the way: the mental static, the afternoon fog, the sense that your mind isn't quite all there. 13 ingredients. Zero compromises. Crafted for people who take their output seriously.

---

© ${new Date().getFullYear()} Flow Health · flowhealth.com
You signed up for early access. If this wasn't you, safely ignore this email.`;

  return { subject, html, text };
}
