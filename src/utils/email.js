const nodemailer = require('nodemailer');

/**
 * The function `sendEmail` sends an email using nodemailer with the provided recipient email, subject,
 * and text, and returns true if the email is sent successfully or false if an error occurs.
 * @param recipientEmail - Recipient's email address where the email will be sent.
 * @param subject - The `subject` parameter in the `sendEmail` function refers to the subject line of
 * the email that will be sent. It is the brief summary or topic of the email content. For example, if
 * you are sending an email with the subject "Meeting Reminder", the recipient will see this text as
 * @param text - The `text` parameter in the `sendEmail` function refers to the content or body of the
 * email that you want to send. It is the actual message that will be included in the email. You can
 * provide any text or message that you want to send to the recipient in the email body.
 * @returns The `sendEmail` function returns a boolean value - `true` if the email was sent
 * successfully, and `false` if an error occurred while sending the email.
 */
async function sendEmail(recipientEmail, subject, text) {
  try {
    console.log(
      process.env.SENDER_EMAIL,
      process.env.SENDER_PASSWORD,
      recipientEmail
    );
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: recipientEmail,
      subject: subject,
      text: text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    return false;
  }
}

module.exports = sendEmail;
