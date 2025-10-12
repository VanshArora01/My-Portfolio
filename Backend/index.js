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

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    try {
        // Configure mail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Message from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Error sending message." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
