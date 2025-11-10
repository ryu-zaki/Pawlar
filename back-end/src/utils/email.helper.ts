import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendOTPEmail = async (toEmail: string, otp: string): Promise<void> => {

  try { 
  await transporter.sendMail({
    from: `Pawlar Support ${process.env.EMAIL_USER}`,
    to: toEmail,
    subject: 'Your Pawlar Password Reset OTP',
    html: `
       <div
      style="
        max-width: 500px;
        margin: auto;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        font-family: 'League Spartan', sans-serif;
      "
    >
      <div
        style="
          flex: content;
          justify-items: start;
          flex-direction: row;
          background-color: #ffeaea;
          padding: 15px 20px;
        "
      >
        <img
          src="paw-brown.svg"
          style="height: 40px; margin-right: 1px"
        />
        <img
          src="email-pawlar-brown.svg"
          style="height: 40px; margin-right: 10px; margin-left: -10px"
        />
        <h3
          style="
            color: #ca731c;
            font-size: medium;
            font-weight: 600;
            margin-top: 2px;
            margin-left: 7px;
          "
        >
          One Collar, Endless Care
        </h3>
      </div>
      <div style="margin-top: 20px; padding: 15px 40px">
        <h1
          style="
            color: #363433;
            font-size: 28px;
            margin-bottom: 10px;
            margin-top: 10px;
          "
        >
          Verification Code
        </h1>
        <p
          style="
            font-size: 16px;
            line-height: 1;
            margin-bottom: 15px;
            text-align: justify;
          "
        >
          Hi, there! Welcome to Pawlar — your pet's smart companion!
        </p>
        <p
          style="
            font-size: 16px;
            line-height: 1;
            margin-bottom: 15px;
            text-align: justify;
          "
        >
          We've received a request related to your account. To proceed, please
          use the code below to complete the requested action:
        </p>
        <div>
          <h2
            style="
              font-size: 32px;
              font-style: bold;
              text-align: center;
              color: #ca731c;
              letter-spacing: 10px;
              margin: 20px 0;
              background: #ffeaea;
              padding: 15px;
            "
          >
            ${otp}
          </h2>
        </div>
        <p
          style="
            font-size: 16px;
            line-height: 1;
            margin-bottom: 15px;
            text-align: justify;
          "
        >
          This code will expire in 5 minutes.
        </p>
        <p
          style="
            font-size: 16px;
            line-height: 1;
            margin-bottom: 15px;
            text-align: justify;
          "
        >
          If you didn't request this verification, you can safely ignore this
          email.
        </p>
      </div>
      <div
        style="
          text-align: center;
          margin-top: 30px;
          margin-bottom: 20px;
          font-size: 14px;
          color: #777;
        "
      >
        <p style="margin-bottom: 3px">© 2025 Pawlar. All rights reserved.</p>
      </div>
    </div>
    `
  });

  
    console.log('OTP email sent to:', toEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send OTP email.');
  }
};