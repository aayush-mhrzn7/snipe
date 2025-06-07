import nodemailer from "nodemailer";
import { OTPMail, WelcomeMail } from "./constants/index.constant.js";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "bryana12@ethereal.email",
    pass: "13Dfj6MkxCxVsKjdjP",
  },
});

const sendWelcomeMail = async ({ username }) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "aayush@vrittechnologies.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: WelcomeMail({ username }), // HTML body
  });
  console.log("Message sent:", info.messageId);
};
const sentOTPMail = async ({ otp, username }) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "aayush@vrittechnologies.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: OTPMail({ username: username, otp: otp }), // HTML body
  });
  console.log("Message sent:", info.messageId);
};
export { sendWelcomeMail, sentOTPMail };
