import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  host: "smtp-relay.brevo.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

export const sendEmail = async (to, subject, text) => {

  try {

    console.log("📨 Sending email to:", to);

    const info = await transporter.sendMail({

      from: `"MyOpenJournal" <${process.env.BREVO_EMAIL}>`,

      to,

      subject,

      text,
    });

    console.log("✅ Email sent:", info.messageId);

    return true;

  } catch (error) {

    console.error("❌ Email send error:", error);

    return false;
  }
};