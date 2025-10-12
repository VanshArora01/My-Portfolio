# Email Service Setup Guide

## Option 1: SMTP2GO (Recommended)

### Quick Setup (5 minutes)

### 1. Create SMTP2GO Account
1. Go to [https://smtp2go.com](https://smtp2go.com)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### 2. Get Your Credentials
1. After login, go to "SMTP Users" in your dashboard
2. Create a new SMTP user or use the default one
3. Copy your:
   - **Username** (usually looks like: `your-username@smtp2go.com`)
   - **Password** (the SMTP password, not your account password)

### 3. Add Environment Variables to Render
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add these variables:
   ```
   SMTP2GO_USERNAME=your-username@smtp2go.com
   SMTP2GO_PASSWORD=your-smtp-password
   ```

### 4. Deploy and Test
1. The code is already updated to use SMTP2GO
2. Deploy your backend
3. Test the contact form

## Alternative: Use Existing Gmail Credentials
If you prefer to use your existing Gmail setup, the code will fallback to:
```
SMTP2GO_USERNAME=your-gmail@gmail.com
SMTP2GO_PASSWORD=your-app-password
```

## Option 2: Formspree (Even Easier!)

### Super Quick Setup (2 minutes)
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for free account (50 submissions/month free)
3. Create a new form
4. Copy your form endpoint URL
5. Add to Render environment variables:
   ```
   FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```

### Benefits of Formspree
- ✅ No SMTP setup required
- ✅ Works with any hosting provider
- ✅ 50 free submissions per month
- ✅ Spam protection included
- ✅ Super easy setup

## Benefits of SMTP2GO
- ✅ Works with Render free tier (uses port 2525)
- ✅ Reliable email delivery
- ✅ 100 free emails per month
- ✅ No SMTP port restrictions
- ✅ Easy setup and configuration

## Which Should You Choose?

**For simplicity:** Use **Formspree** - just add one environment variable and you're done!

**For more control:** Use **SMTP2GO** - you can customize email formatting and delivery options.

## Troubleshooting
- Make sure you're using the SMTP password, not your account password
- Check that environment variables are set correctly in Render
- Verify your SMTP2GO/Formspree account is active
