import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  const { data, error } = await resend.emails.send({
    from: 'doStack <onboarding@resend.dev>',
    to,
    subject,
    html,
  });

  if (error) {
    throw error;
  }
  
  return data;
}