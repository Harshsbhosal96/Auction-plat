# Auction Platform - Vercel Deployment Guide

## 🚀 Deployment Overview

Your auction platform is now configured for deployment on Vercel. This guide covers deploying both the backend API and frontend to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
3. **MongoDB Atlas**: Set up a MongoDB Atlas database (free tier available)

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (replace `<password>` with your actual password)
5. **Important**: Whitelist IP addresses to `0.0.0.0/0` for Vercel serverless functions

## 🚂 Backend Deployment (API)

### Step 1: Deploy Backend to Vercel

1. **Connect Repository**:
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your auction app

2. **Configure Project Settings**:
   - **Framework Preset**: Select "Other"
   - **Root Directory**: `Auction-app/backend`
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty

3. **Environment Variables**:
   In the project settings, add these environment variables:

   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/auctiondb?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_jwt_secret_here
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   SMTP_SERVICE=gmail
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=https://your-frontend-project.vercel.app
   ENABLE_CRON=false
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically detect your Node.js API
   - Your backend will be available at `https://your-project-name.vercel.app`

### Step 2: Verify Backend Deployment

- Check the health endpoint: `https://your-backend-url.vercel.app/api/v1/health`
- Should return: `{"status":"OK","message":"Auction Platform Backend is running on Vercel"}`

## 🎨 Frontend Deployment

### Step 1: Deploy Frontend to Vercel

1. **Create New Project**:
   - Click "New Project" in Vercel dashboard
   - Import the same Git repository
   - Select the repository again

2. **Configure Project Settings**:
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: `Auction-app/frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/v1
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build your React app
   - Your frontend will be available at `https://your-frontend-project.vercel.app`

## 🔗 Connecting Frontend to Backend

1. **Update Frontend Environment**:
   - In your frontend Vercel project settings
   - Set `VITE_API_URL` to your backend Vercel URL
   - Example: `https://auction-backend.vercel.app/api/v1`

2. **Update Backend CORS**:
   - In your backend Vercel project settings
   - Update `FRONTEND_URL` to your frontend Vercel URL
   - Example: `https://auction-frontend.vercel.app`

## 🧪 Testing Your Deployment

1. **Test User Registration/Login**:
   - Visit your frontend URL
   - Try registering a new user
   - Check if emails are being sent

2. **Test Auction Functionality**:
   - Create an auction as an auctioneer
   - Place bids as a bidder
   - Test commission submission and approval

3. **Test Admin Features**:
   - Login as Super Admin
   - Review commission proofs
   - Check dashboard analytics

## 🔧 Vercel-Specific Considerations

### Serverless Functions
- Vercel uses serverless functions, so database connections are established per request
- Cron jobs are disabled by default (set `ENABLE_CRON=true` if needed)
- File uploads are limited to Vercel's constraints

### Environment Variables
- All environment variables must be set in Vercel dashboard
- No `.env` file is used in production
- Variables are automatically available in serverless functions

### Cold Starts
- First requests may be slower due to cold starts
- Subsequent requests are fast
- Database connection is optimized for serverless

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Vercel build logs
   - Ensure Node.js version is >= 18
   - Verify all dependencies are in `package.json`

2. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Ensure IP whitelisting is set to `0.0.0.0/0`
   - Check if database user has correct permissions

3. **CORS Errors**:
   - Update `FRONTEND_URL` in backend environment variables
   - Redeploy both projects
   - Check that URLs match exactly

4. **Email Not Sending**:
   - Verify Gmail app password
   - Check SMTP settings in environment variables
   - Ensure Gmail account allows less secure apps

5. **API Timeouts**:
   - Vercel serverless functions have a 30-second timeout
   - Some operations might need optimization

### Logs and Monitoring:

- **Vercel Logs**: Check function logs in Vercel dashboard
- **Health Check**: Use `/api/v1/health` endpoint
- **Database**: Monitor MongoDB Atlas for connection issues

## 🚀 Post-Deployment Tasks

1. **Custom Domain** (Optional):
   - Connect custom domain in Vercel settings
   - Update environment variables with new URLs

2. **Analytics** (Optional):
   - Enable Vercel Analytics for monitoring
   - Set up error tracking

3. **Backup Strategy**:
   - Set up MongoDB Atlas automated backups
   - Consider regular data exports

## 📞 Support

If you encounter issues:
1. Check Vercel documentation
2. Review deployment logs
3. Verify environment variables
4. Test locally before deploying

## 🔄 Redeployment

When you make changes to your code:
1. Push changes to your Git repository
2. Vercel will automatically redeploy both projects
3. Check deployment status in Vercel dashboard

Your auction platform is now production-ready on Vercel! 🎉

## 📝 Quick Setup Checklist

- [ ] MongoDB Atlas database created
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS URLs updated
- [ ] Test user registration
- [ ] Test auction creation
- [ ] Test admin features
- [ ] Verify email notifications