import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(options);
    console.log(`Email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error.message);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};
