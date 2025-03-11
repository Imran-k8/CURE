import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";



export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.BACKEND_URL}/verify-email/${token}`;
    dotenv.config();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL, // Must be a verified sender email
        subject: "Verify Your Email - CURE Research Journal",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Verify Your Email - CURE</title>
            </head>
            <body style="background-color: #3a0d2e; color: #ffffff; font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #250a1e; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(255, 0, 132, 0.3);">
                    
                    <!-- Hosted CURE Logo -->
                    <img src="https://res.cloudinary.com/dlokrrvf0/image/upload/v1741728626/CURE_onsf0e.png" alt="CURE Logo" style="width: 150px; margin-bottom: 20px;">
                    
                    <h1 style="color: #ff4081; font-size: 24px;">Verify Your Email</h1>
                    
                    <p style="color: #e0e0e0; font-size: 16px;">
                        Thank you for signing up for CURE Research Journal! Please verify your email address by clicking the button below.
                    </p>
                    
                    <!-- Verification Button -->
                    <a href="${verificationLink}" style="display: inline-block; background-color: #ff4081; color: #ffffff; padding: 12px 20px; border-radius: 5px; font-size: 18px; text-decoration: none; margin-top: 20px;">
                        Verify Email
                    </a>

                    <p style="color: #b0b0b0; font-size: 14px; margin-top: 20px;">
                        If you did not sign up for CURE, you can safely ignore this email.
                    </p>

                    <p style="color: #b0b0b0; font-size: 12px;">
                        &copy; 2025 CURE Research Journal. All rights reserved.
                    </p>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Verification email sent to: ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.response.body);
    }
};
