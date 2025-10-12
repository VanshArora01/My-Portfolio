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

        // Configure mail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

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
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");

        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        
        // Provide more specific error messages
        let errorMessage = "Error sending message.";
        
        if (error.code === 'EAUTH') {
            errorMessage = "Email authentication failed. Please check email credentials.";
        } else if (error.code === 'ECONNECTION') {
            errorMessage = "Unable to connect to email service.";
        } else if (error.message.includes('Invalid login')) {
            errorMessage = "Invalid email credentials.";
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
