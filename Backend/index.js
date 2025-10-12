import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configure CORS to allow requests from frontend
app.use(cors({
    origin: [
        "http://localhost:5173", // Vite default port for development
        "https://vanshcodes01.onrender.com", // Your actual frontend domain
        process.env.FRONTEND_URL // Environment variable for frontend URL
    ].filter(Boolean), // Remove undefined values
    credentials: true
}));

app.use(express.json());

// GET route for root path
app.get("/", (req, res) => {
    res.json({ message: "Portfolio Backend API is running!" });
});

// POST route for contact form
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("Received contact form data:", { name, email, message });

    // Input validation and sanitization
    if (!name || !email || !message) {
        console.log("Validation failed: Missing required fields");
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Trim whitespace and validate lengths
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        return res.status(400).json({ success: false, message: "All fields must contain valid content!" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address!" });
    }

    // Length validation
    if (trimmedName.length > 100) {
        return res.status(400).json({ success: false, message: "Name must be less than 100 characters!" });
    }
    if (trimmedMessage.length > 1000) {
        return res.status(400).json({ success: false, message: "Message must be less than 1000 characters!" });
    }

    try {
        // Check if email credentials are configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Email credentials not configured");
            return res.status(500).json({ 
                success: false, 
                message: "Email service not configured. Please contact the administrator." 
            });
        }

        // Option 1: Try SMTP2GO first (recommended for Render)
        let useSMTP2GO = false;
        let transporter;
        
        if (process.env.SMTP2GO_USERNAME && process.env.SMTP2GO_PASSWORD) {
            useSMTP2GO = true;
            transporter = nodemailer.createTransporter({
                host: "mail.smtp2go.com",
                port: 2525, // Port 2525 is allowed on Render free tier
                secure: false, // Use STARTTLS
                auth: {
                    user: process.env.SMTP2GO_USERNAME,
                    pass: process.env.SMTP2GO_PASSWORD,
                },
                connectionTimeout: 30000,
                greetingTimeout: 30000,
                socketTimeout: 30000,
                tls: {
                    rejectUnauthorized: false
                }
            });
            console.log("Using SMTP2GO service for email delivery");
        } else {
            // Option 2: Fallback to webhook-based service (Formspree)
            console.log("SMTP2GO not configured, using webhook-based email service");
            // We'll implement this below
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Use configured email as sender
            replyTo: trimmedEmail, // Set reply-to as the form submitter's email
            to: process.env.EMAIL_USER,
            subject: `Portfolio Message from ${trimmedName}`,
            html: `
                <h3>New Portfolio Contact Form Submission</h3>
                <p><strong>Name:</strong> ${trimmedName}</p>
                <p><strong>Email:</strong> ${trimmedEmail}</p>
                <p><strong>Message:</strong></p>
                <p>${trimmedMessage.replace(/\n/g, '<br>')}</p>
            `,
            text: `
Name: ${trimmedName}
Email: ${trimmedEmail}
Message: ${trimmedMessage}
            `,
        };

        if (useSMTP2GO) {
            console.log("Attempting to send email via SMTP2GO...");
            const emailResult = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully via SMTP2GO:", emailResult.messageId);
        } else {
            // Use Formspree webhook-based email service (no SMTP required)
            console.log("Attempting to send email via Formspree webhook...");
            
            if (!process.env.FORMSPREE_ENDPOINT) {
                throw new Error("No email service configured. Please set up SMTP2GO or Formspree.");
            }
            
            const formspreeResponse = await fetch(process.env.FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    message: trimmedMessage,
                    _replyto: trimmedEmail,
                    _subject: `Portfolio Contact from ${trimmedName}`
                })
            });
            
            if (!formspreeResponse.ok) {
                throw new Error(`Formspree request failed: ${formspreeResponse.status}`);
            }
            
            console.log("Email sent successfully via Formspree");
        }

        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        
        // Provide more specific error messages for SMTP2GO
        let errorMessage = "Error sending message.";
        
        if (error.code === 'EAUTH') {
            errorMessage = "Email authentication failed. Please check SMTP2GO credentials.";
        } else if (error.code === 'ECONNECTION') {
            errorMessage = "Unable to connect to SMTP2GO service. Please try again.";
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = "SMTP2GO service timeout. Please try again.";
        } else if (error.code === 'ECONNREFUSED') {
            errorMessage = "SMTP2GO connection refused. Please try again later.";
        } else if (error.message.includes('Invalid login')) {
            errorMessage = "Invalid SMTP2GO credentials.";
        } else if (error.message.includes('socket hang up') || error.message.includes('connect ECONNREFUSED')) {
            errorMessage = "SMTP2GO service is temporarily unavailable. Please try again.";
        } else if (error.message.includes('550')) {
            errorMessage = "Email delivery failed. Please check email address.";
        }
        
        res.status(500).json({ 
            success: false, 
            message: errorMessage,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
