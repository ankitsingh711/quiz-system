# Resend Email Setup Guide

## Why Resend?

Resend is a modern email API that offers:
- **3,000 emails/month** for free (vs ZohoMail's paid service)
- **100 emails/day** limit on free tier
- Excellent deliverability and developer experience
- Simple API integration
- No credit card required for signup

## Setup Instructions

### Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Go to "API Keys" in the sidebar
3. Click "Create API Key"
4. Name it something like "Quiz App"
5. Copy the API key (it starts with `re_`)

### Step 3: Configure Domain (Optional but Recommended)

For better deliverability, add your own domain:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain" 
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow DNS configuration instructions
5. Once verified, you can use `noreply@yourdomain.com` as sender

**For testing**: You can use the default `onboarding@resend.dev` sender email.

### Step 4: Update Environment Variables

Update your `.env.local` file:

```bash
# Resend Configuration
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev  # or your verified domain email
```

### Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Go to your quiz app and complete a quiz
3. Check if the email is sent successfully
4. Check your Resend dashboard for email logs

## Email Limits

- **Free Tier**: 3,000 emails/month, 100/day
- **Paid Plans**: Start at $20/month for 50,000 emails
- **No expiration** on free tier

## Troubleshooting

### Common Issues:

1. **Invalid API Key**: Make sure you copied the full key starting with `re_`
2. **Domain not verified**: Use `onboarding@resend.dev` for testing
3. **Rate limit**: Free tier allows 100 emails/day

### Check Email Delivery:

1. Go to Resend dashboard
2. Click "Logs" to see all sent emails
3. Check delivery status and any errors

## Migration from ZeptoMail

The code has been updated to use Resend instead of ZeptoMail. Key changes:

- API endpoint: `https://api.resend.com/emails`
- Authorization: `Bearer` token instead of `Zoho-enczapikey`
- Simplified JSON payload structure
- Better error handling and logging

## Alternative Free Services

If Resend doesn't meet your needs:

1. **EmailJS** (200 emails/month) - Client-side sending
2. **Brevo/Sendinblue** (300 emails/day) - Traditional SMTP
3. **Gmail SMTP** - Free but less reliable for production

Resend is recommended for its developer-friendly API and generous free tier.
