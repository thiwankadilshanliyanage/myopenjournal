import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    console.log("EMAIL_USER loaded:", process.env.EMAIL_USER ? "YES" : "NO");
    console.log("EMAIL_PASS loaded:", process.env.EMAIL_PASS ? "YES" : "NO");
    console.log("Sending email to:", to);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"MyOpenJournal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email send error:", error);
    return false;
  }
};