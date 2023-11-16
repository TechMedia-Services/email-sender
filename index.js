const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

// Read the JSON file
const data = fs.readFileSync('clients.json');
const recipients = JSON.parse(data);

// Create a transporter using SMTP
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_EMAIL_HOST,
    port: process.env.SMTP_EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASS
    },
});

function htmlEmail(name, website) {
    return `
    <p>Hei ${name},</p>
    <p>Det var et tilfeldig og gledelig øyeblikk da jeg snublet over din nettside (${website}) på Google Maps.</p>
    <p>Jeg kunne ikke la være å tenke at din virksomhet kanskje trenger en gnistrende ny nettside! Jeg har jobbet med en oppgradert versjon som jeg tror vil løfte din online tilstedeværelse.</p>
    <p>Hvis dette vekker nysgjerrigheten din, så ikke nøl med å svare på denne meldingen! Jeg er klar til å sende den til deg så snart jeg hører fra deg.</p>
    <p>Med vennlig hilsen,<br>
    ${process.env.EMAIL_NAME}<br>
    ${process.env.EMAIL_PHONE}
    </p>
    <table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0px;">
<table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0px; vertical-align: middle;">
<h2 class="name__NameContainer-sc-1m457h3-0 jxbGUj" style="margin: 0px; font-size: 18px; color: #000000; font-weight: 600;">TechMedia Services </h2>
<p class="company-details__CompanyContainer-sc-j5pyy8-0 VnOLK" style="margin: 0px; font-weight: 500; color: #000000; font-size: 14px; line-height: 22px;">Vi bygger din digitale fremtid</p>
<table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; width: 100%; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0px;" height="30"> </td>
</tr>
<tr>
<td class="color-divider__Divider-sc-1h38qjv-0 llIisW" style="padding: 0px; width: 100%; border-bottom: 1px solid #000000; border-left: none; display: block;" width="auto" height="1"> </td>
</tr>
<tr>
<td style="padding: 0px;" height="30"> </td>
</tr>
</tbody>
</table>
<table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="vertical-align: middle;">
<td style="padding: 0px; vertical-align: middle;" width="30">
<table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0px; vertical-align: bottom;"><span class="contact-info__IconWrapper-sc-mmkjr6-1 bglVXe" style="display: inline-block; background-color: #000000;"><img class="contact-info__ContactLabelIcon-sc-mmkjr6-0 cnkwri" style="display: block; background-color: #000000;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" alt="emailAddress" width="13" /></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px;"><a class="contact-info__ExternalLink-sc-mmkjr6-2 ibLXSU" style="text-decoration: none; color: #000000; font-size: 12px;" href="mailto:kontakt@tech-media.no">kontakt@tech-media.no</a></td>
</tr>
<tr style="vertical-align: middle;">
<td style="padding: 0px; vertical-align: middle;" width="30">
<table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0px; vertical-align: bottom;"><span class="contact-info__IconWrapper-sc-mmkjr6-1 bglVXe" style="display: inline-block; background-color: #000000;"><img class="contact-info__ContactLabelIcon-sc-mmkjr6-0 cnkwri" style="display: block; background-color: #000000;" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" alt="website" width="13" /></span></td>
</tr>
</tbody>
</table>
</td>
<td style="padding: 0px;"><a class="contact-info__ExternalLink-sc-mmkjr6-2 ibLXSU" style="text-decoration: none; color: #000000; font-size: 12px;" href="//tech-media.no">tech-media.no</a></td>
</tr>
</tbody>
</table>
<table class="table__StyledTable-sc-1avdl6r-0 kAbRZI" style="border-collapse: collapse; font-size: medium; font-family: Arial;" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding: 0px;" height="30"> </td>
</tr>
</tbody>
</table>
<a class="viral-link__Anchor-sc-1kv0kjx-0 bZUgRQ" style="font-size: 12px; display: block; color: #000000;" href="https://www.hubspot.com/email-signature-generator?utm_source=create-signature" target="_blank" rel="noopener"><br /></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
    `;
}

recipients.forEach((recipient) => {
    if (recipient.email && recipient.website) {
        let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: recipient.email,
            subject: process.env.EMAIL_SUBJECT,
            html: htmlEmail(recipient.name, recipient.website),
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Error occurred while sending email to ${recipient.email}:`, error.message);
            } else {
                console.log(`Email sent successfully to ${recipient.email}`);
                console.log('Message ID:', info.messageId);
            }
        });
    } else {
        console.log(`Skipping entry without an email and website for ${recipient.name}`);
    }
});
