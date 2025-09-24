# 🚀 Deployment Guide

This guide will walk you through deploying your Personality Quiz App to popular platforms.

## 🔧 Prerequisites

Before deploying, ensure you have:

1. **MongoDB Database**: Set up a MongoDB Atlas cluster
2. **ZeptoMail Account**: Get API credentials from ZeptoMail
3. **Git Repository**: Push your code to GitHub/GitLab

## 📋 Pre-deployment Checklist

- [ ] Environment variables are ready
- [ ] Code is committed and pushed to Git
- [ ] Dependencies are up to date (`npm install`)
- [ ] Project builds successfully (`npm run build`)

## 🌟 Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option for Next.js apps:

### Method A: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add ZEPTOMAIL_API_KEY  
   vercel env add ZEPTOMAIL_FROM_EMAIL
   ```

5. **Redeploy with env vars**:
   ```bash
   vercel --prod
   ```

### Method B: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Import your project
4. Set environment variables in project settings
5. Deploy automatically

## 🔵 Option 2: Deploy to Netlify

### Method A: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Login and deploy**:
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

### Method B: Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Connect your Git repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Set environment variables
5. Deploy

## ⚙️ Environment Variables Setup

### MongoDB Atlas Setup

1. **Create Account**: Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Choose the free tier
3. **Create Database User**: Set username and password
4. **Whitelist IPs**: Add `0.0.0.0/0` for all IPs (or specific deployment IPs)
5. **Get Connection String**: 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/personality-quiz
   ```

### ZeptoMail Setup

1. **Sign up**: Go to [zeptomail.zoho.com](https://www.zoho.com/zeptomail/)
2. **Verify Domain**: Add and verify your sending domain
3. **Create API Key**: 
   - Go to Settings → Mail Agents
   - Create new mail agent
   - Generate API key
4. **Set From Email**: Use a verified email from your domain

### Platform-Specific Environment Variable Setup

#### Vercel
```bash
# Via CLI
vercel env add MONGODB_URI production
vercel env add ZEPTOMAIL_API_KEY production
vercel env add ZEPTOMAIL_FROM_EMAIL production

# Or via dashboard: Project Settings → Environment Variables
```

#### Netlify
```bash
# Via dashboard: Site Settings → Environment Variables
MONGODB_URI=your_mongodb_uri
ZEPTOMAIL_API_KEY=your_api_key
ZEPTOMAIL_FROM_EMAIL=your_email
```

## 🐛 Troubleshooting

### Common Deployment Issues

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

#### Environment Variable Issues
- Ensure all required env vars are set
- Check for typos in variable names
- Restart deployment after adding variables

#### Database Connection Issues
- Verify MongoDB URI format
- Check IP whitelist settings
- Ensure database user has proper permissions

#### Email Issues
- Verify ZeptoMail API key is active
- Check sender email is verified
- Review API rate limits

### Debug Commands

```bash
# Check build locally
npm run build && npm start

# View deployment logs
vercel logs [deployment-url]
netlify logs

# Test API endpoints
curl -X POST your-domain.com/api/submit-quiz \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to Git
2. **Database Security**: Use specific IP whitelisting when possible
3. **API Keys**: Regularly rotate API keys
4. **CORS**: Configure proper CORS settings for production
5. **Rate Limiting**: Consider adding rate limiting for API routes

## 📈 Post-Deployment

After successful deployment:

1. **Test All Features**: 
   - Complete a quiz end-to-end
   - Verify email delivery
   - Check data saving to MongoDB

2. **Monitor Performance**:
   - Check Vercel/Netlify analytics
   - Monitor API response times
   - Watch for errors in logs

3. **Set Up Monitoring**:
   - Configure uptime monitoring
   - Set up error tracking (Sentry, LogRocket)
   - Monitor database performance

## 🎉 Success! 

Your Personality Quiz App is now live! 🚀

**Next Steps:**
- Share your deployment URL
- Collect user feedback
- Monitor usage and performance
- Plan feature enhancements

---

Need help? Check the main README.md or create an issue in the repository.
