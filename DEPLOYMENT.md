# Auction Platform - Production Deployment Guide

## 🚀 Deployment Overview

Your auction platform is now ready for production deployment on Railway. This guide will walk you through deploying both the backend and frontend to Railway.

## 📋 Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Git Repository**: Your code should be in a Git repository
3. **MongoDB Atlas**: Set up a MongoDB Atlas database (free tier available)

## 🗄️ Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (replace `<password>` with your actual password)
5. Whitelist IP addresses (0.0.0.0/0 for Railway)

## 🚂 Backend Deployment

### Step 1: Deploy Backend to Railway

1. **Connect Repository**:
   - Go to Railway dashboard
   - Click "New Project" → "Deploy from GitHub repo"
   - Connect your GitHub account and select your auction-app repository

2. **Configure Environment Variables**:
   In Railway project settings, add these environment variables:

   ```
   NODE_ENV=production
   PORT=5000
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
   FRONTEND_URL=https://your-frontend-domain.railway.app
   ```

3. **Deploy**:
   - Railway will automatically detect your Node.js app
   - The build will use your `package.json` scripts
   - Your app will be available at `https://your-project-name.railway.app`

### Step 2: Verify Backend Deployment

- Check the health endpoint: `https://your-backend-url.railway.app/health`
- Should return: `{"status":"OK","message":"Auction Platform Backend is running"}`

## 🎨 Frontend Deployment

### Step 1: Deploy Frontend to Railway

1. **Create New Railway Project**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select the same repository

2. **Configure Build Settings**:
   In Railway project settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm run preview`
   - **Root Directory**: `/frontend`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api/v1
   ```

4. **Deploy**:
   - Railway will build your React app
   - Your frontend will be available at `https://your-frontend-project.railway.app`

## 🔗 Connecting Frontend to Backend

1. **Update Frontend Environment**:
   - In your frontend Railway project, set `VITE_API_URL` to your backend URL
   - Example: `https://auction-backend-production.up.railway.app/api/v1`

2. **Update Backend CORS**:
   - In your backend Railway project, update `FRONTEND_URL` to your frontend URL
   - Example: `https://auction-frontend-production.up.railway.app`

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

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Railway build logs
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database Connection Issues**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelisting (0.0.0.0/0)
   - Ensure database user has correct permissions

3. **Email Not Sending**:
   - Verify Gmail app password
   - Check SMTP settings in environment variables
   - Ensure less secure app access is enabled (if using Gmail)

4. **CORS Errors**:
   - Update `FRONTEND_URL` in backend environment variables
   - Redeploy both frontend and backend

### Logs and Monitoring:

- **Railway Logs**: Check deployment logs in Railway dashboard
- **Health Check**: Use `/health` endpoint to verify backend status
- **Database**: Monitor MongoDB Atlas for connection issues

## 🚀 Post-Deployment Tasks

1. **Domain Setup** (Optional):
   - Connect custom domain in Railway settings
   - Update environment variables with new URLs

2. **SSL Certificate**:
   - Railway provides automatic SSL certificates
   - Your app will be served over HTTPS

3. **Backup Strategy**:
   - Set up MongoDB Atlas automated backups
   - Consider regular data exports

4. **Monitoring**:
   - Monitor Railway usage and costs
   - Set up error tracking if needed

## 📞 Support

If you encounter issues:
1. Check Railway documentation
2. Review deployment logs
3. Verify environment variables
4. Test locally before deploying

Your auction platform is now production-ready! 🎉