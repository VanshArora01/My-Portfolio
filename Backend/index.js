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

        // Try multiple email configurations for Render compatibility
        let transporter;
        let emailSent = false;
        
        // Configuration 1: Standard Gmail (may work on some Render instances)
        const gmailConfig = {
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 15000,
            greetingTimeout: 15000,
            socketTimeout: 15000,
            pool: true,
            maxConnections: 1,
            maxMessages: 1,
            rateLimit: 1
        };
        
        // Configuration 2: Alternative Gmail with explicit host/port
        const gmailAltConfig = {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            connectionTimeout: 15000,
            greetingTimeout: 15000,
            socketTimeout: 15000,
            tls: {
                rejectUnauthorized: false
            }
        };
        
        // Try standard Gmail first
        try {
            transporter = nodemailer.createTransport(gmailConfig);
            console.log("Using standard Gmail configuration");
        } catch (error) {
            console.log("Standard Gmail failed, trying alternative configuration");
            transporter = nodemailer.createTransport(gmailAltConfig);
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

        console.log("Attempting to send email...");
        
        try {
            // Try sending with the first configuration
            const emailResult = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", emailResult.messageId);
            emailSent = true;
        } catch (firstError) {
            console.log("First email attempt failed:", firstError.message);
            
            // If first attempt fails and we used standard Gmail, try alternative config
            if (transporter.options.service === 'gmail') {
                console.log("Trying alternative Gmail configuration...");
                try {
                    const altTransporter = nodemailer.createTransport(gmailAltConfig);
                    const emailResult = await altTransporter.sendMail(mailOptions);
                    console.log("Email sent successfully with alternative config:", emailResult.messageId);
                    emailSent = true;
                } catch (secondError) {
                    console.error("Both email configurations failed");
                    throw secondError; // Throw the second error
                }
            } else {
                throw firstError; // If we already tried alternative, throw first error
            }
        }
        
        if (!emailSent) {
            throw new Error("All email sending attempts failed");
        }

        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        
        // Provide more specific error messages
        let errorMessage = "Error sending message.";
        
        if (error.code === 'EAUTH') {
            errorMessage = "Email authentication failed. Please check email credentials.";
        } else if (error.code === 'ECONNECTION') {
            errorMessage = "Unable to connect to email service due to hosting restrictions. Please contact me directly.";
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = "Email service timeout. Please try again.";
        } else if (error.code === 'ECONNREFUSED') {
            errorMessage = "Email service connection refused. This may be due to hosting restrictions. Please contact me directly.";
        } else if (error.message.includes('Invalid login')) {
            errorMessage = "Invalid email credentials.";
        } else if (error.message.includes('Email service connection failed')) {
            errorMessage = "Email service is currently unavailable due to hosting restrictions. Please contact me directly at my email.";
        } else if (error.message.includes('socket hang up') || error.message.includes('connect ECONNREFUSED')) {
            errorMessage = "Email service is blocked by hosting provider. Please contact me directly.";
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
