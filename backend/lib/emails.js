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
            <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
            <p><a href="${verificationLink}">Verify Email</a></p>
            <p>If you didn’t sign up, you can ignore this email.</p>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Verification email sent to: ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.response.body);
    }
};
