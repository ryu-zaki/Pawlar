import nodemailer from 'nodemailer';
import {Resend} from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (toEmail: string, otp: string): Promise<void> => {
  try { 
  await resend.emails.send({
    from: `"Pawlar Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your Pawlar Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="font-size: 48px; letter-spacing: 8px; margin: 20px; color: #FF7A00;">${otp}</h1>
        <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
      </div>
    `
  });

  
    console.log('OTP email sent to:', toEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send OTP email.');
  }
};