import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";



export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`;
    dotenv.config();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL, // Must be a verified sender email
        subject: "Verify Your Email - CURE Network",
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
                        Thank you for signing up for CURE Network! Please verify your email address by clicking the button below.
                    </p>
                    
                    <!-- Verification Button -->
                    <a href="${verificationLink}" style="display: inline-block; background-color: #ff4081; color: #ffffff; padding: 12px 20px; border-radius: 5px; font-size: 18px; text-decoration: none; margin-top: 20px;">
                        Verify Email
                    </a>

                    <p style="color: #b0b0b0; font-size: 14px; margin-top: 20px;">
                        If you did not sign up for CURE, you can safely ignore this email.
                    </p>

                    <p style="color: #b0b0b0; font-size: 12px;">
                        &copy; 2025 CURE Network. All rights reserved.
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
export const sendSubmissionConfirmation = async (email) => {
    dotenv.config();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL, // Must be a verified sender email
        subject: "Submission Confirmation - CURE Network",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Submission Confirmation - CURE</title>
            </head>
            <body style="background-color: #0a192f; color: #ffffff; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
                <div style="max-width: 600px; margin: 0 auto; background: #111827; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(255, 64, 129, 0.3);">
                    
                    <img src="https://res.cloudinary.com/dlokrrvf0/image/upload/v1741728626/CURE_onsf0e.png" alt="CURE Logo" style="width: 150px; margin-bottom: 20px;" />

                    <h1 style="color: #ff4081; font-size: 24px;">Submission Confirmation</h1>

                    <p style="color: #e0e0e0; font-size: 16px; margin-top: 20px;">
                    Thank you for submitting your research to <strong>CURE Network</strong>.
                    </p>

                    <p style="color: #e0e0e0; font-size: 16px;">
                    Your submission and the associated $10 processing fee were successfully received.
                    </p>

                    <p style="color: #e0e0e0; font-size: 16px;">
                    Our team will review your submission shortly. You will be notified via this email about its acceptance or rejection. Please note that the review process may take several business days.
                    </p>

                    <div style="margin-top: 30px;">
                    <a href="https://your-website-link.com/dashboard" style="display: inline-block; background-color: #ff4081; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 16px; text-decoration: none;">
                        View Submission Dashboard
                    </a>
                    </div>

                    <p style="color: #b0b0b0; font-size: 14px; margin-top: 30px;">
                    If you have any questions or concerns, feel free to email: khanimran092606@gmail.com.
                    </p>

                    <p style="color: #b0b0b0; font-size: 12px; margin-top: 20px;">
                    &copy; 2025 CURE Network. All rights reserved.
                    </p>
                </div>
                </body>

            </html>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Submission confirmation email sent to: ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.response.body);
    }
};
export const sendPublishedEmail = async (email) => {
    dotenv.config();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL, // Must be a verified sender email
        subject: "Submission Approved 🎉- CURE Network",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Submission Approved - CURE</title>
            </head>
            <body style="background-color: #0a192f; color: #ffffff; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: #111827; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(255, 64, 129, 0.3);">

                <img src="https://res.cloudinary.com/dlokrrvf0/image/upload/v1741728626/CURE_onsf0e.png" alt="CURE Logo" style="width: 150px; margin-bottom: 20px;" />

                <h1 style="color: #ff4081; font-size: 24px;">Submission Approved 🎉</h1>

                <p style="color: #e0e0e0; font-size: 16px; margin-top: 20px;">
                We’re excited to inform you that your paper has been <strong>approved</strong> for publishing on <strong>CURE Network</strong>.
                </p>

                <p style="color: #e0e0e0; font-size: 16px;">
                Your contribution will soon be live and accessible to the public as part of our growing academic community.
                </p>

                <p style="color: #e0e0e0; font-size: 16px;">
                Thank you for being part of CURE. We appreciate your work and look forward to amplifying your research impact.
                </p>

                <div style="margin-top: 30px;">
                <a href="https://your-website-link.com/published" style="display: inline-block; background-color: #ff4081; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 16px; text-decoration: none;">
                    View Your Publication
                </a>
                </div>

                <p style="color: #b0b0b0; font-size: 14px; margin-top: 30px;">
                If you have any questions or would like to make edits, please contact our team by emailing: khanimran092606@gmail.com.
                </p>

                <p style="color: #b0b0b0; font-size: 12px; margin-top: 20px;">
                &copy; 2025 CURE Network. All rights reserved.
                </p>
            </div>
            </body>


            </html>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Submission confirmation email sent to: ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.response.body);
    }
};
export const sendRejectionEmail = async (email) => {
    dotenv.config();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL, // Must be a verified sender email
        subject: "Submission Decision- CURE Network",
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Submission Decision - CURE</title>
            </head>
            <body style="background-color: #0a192f; color: #ffffff; font-family: Arial, sans-serif; text-align: center; padding: 40px;">
            <div style="max-width: 600px; margin: 0 auto; background: #111827; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(255, 64, 129, 0.3);">

                <img src="https://res.cloudinary.com/dlokrrvf0/image/upload/v1741728626/CURE_onsf0e.png" alt="CURE Logo" style="width: 150px; margin-bottom: 20px;" />

                <h1 style="color: #ff4081; font-size: 24px;">Submission Decision</h1>

                <p style="color: #e0e0e0; font-size: 16px; margin-top: 20px;">
                Thank you for submitting your research to <strong>CURE Network</strong>.
                </p>

                <p style="color: #e0e0e0; font-size: 16px;">
                After careful review by our editorial team, we regret to inform you that your submission has not been selected for publication at this time.
                </p>

                <p style="color: #e0e0e0; font-size: 16px;">
                We understand this may be disappointing, and we encourage you to continue your work and consider resubmitting in the future with further revisions or new research.
                </p>

                <p style="color: #e0e0e0; font-size: 16px;">
                Please note that submission fees are non-refundable, as outlined in our submission policy.
                </p>

                <div style="margin-top: 30px;">
                <a href="https://your-website-link.com/publish-with-us" style="display: inline-block; background-color: #6b7280; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 16px; text-decoration: none;">
                    Submit Another Paper
                </a>
                </div>

                <p style="color: #b0b0b0; font-size: 14px; margin-top: 30px;">
                If you have any questions about the review or would like feedback, feel free to email: khanimran092606@gmail.com.
                </p>

                <p style="color: #b0b0b0; font-size: 12px; margin-top: 20px;">
                &copy; 2025 CURE Network. All rights reserved.
                </p>
            </div>
            </body>



            </html>
        `,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ Submission confirmation email sent to: ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.response.body);
    }
};
