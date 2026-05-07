import nodemailer from "nodemailer";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  requireTLS: true,

  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

export const sendEmail = async (to, subject, text) => {

  try {

    console.log("EMAIL_USER loaded:",
      process.env.EMAIL_USER ? "YES" : "NO"
    );

    console.log("EMAIL_PASS loaded:",
      process.env.EMAIL_PASS ? "YES" : "NO"
    );

    console.log("📨 Sending email to:", to);

    // verify smtp connection
    await transporter.verify();

    console.log("✅ SMTP server ready");

    const info = await transporter.sendMail({

      from: `"MyOpenJournal" <${process.env.EMAIL_USER}>`,

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