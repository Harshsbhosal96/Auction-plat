# Auction Platform - Production Deployment Guide

## 🚀 Deployment Options

### Option 1: Netlify (Frontend) + Vercel (Backend) - RECOMMENDED

#### Step 1: Deploy Backend to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `Harshsbhosal96/Auction-plat`
4. Configure project:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build` (if needed)
   - **Output Directory**: (leave default)
5. Add Environment Variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET_KEY=your_secure_jwt_secret
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SERVICE=gmail
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```
6. Click "Deploy"
7. Copy the deployment URL (e.g., `https://your-project.vercel.app`)

#### Step 2: Deploy Frontend to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository: `Harshsbhosal96/Auction-plat`
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-vercel-backend-url.vercel.app
   ```
6. Click "Deploy site"

### Option 2: Vercel (Full Stack)

#### Deploy Both Frontend and Backend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure as monorepo:
   - Set up two projects or use Vercel's monorepo support
   - Frontend: Root directory `frontend`
   - Backend: Root directory `backend`
5. Add all environment variables for both services

### Option 3: Railway (Full Stack)

#### Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Start a new project"
3. Connect GitHub repository
4. Railway will auto-detect your project structure
5. Add environment variables in Railway dashboard
6. Deploy

## 🔧 Environment Variables Setup

### Backend Environment Variables
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/auction_platform
JWT_SECRET_KEY=your_super_secure_random_string_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend-domain.com
```

## 📧 Email Configuration

For the forgot password functionality, you need:
1. Gmail account with App Password (not regular password)
2. Enable 2FA on Gmail
3. Generate App Password: Google Account → Security → App passwords

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string

## 🔒 Security Checklist

- [ ] Change JWT_SECRET_KEY to a secure random string
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Set up proper CORS policies
- [ ] Use HTTPS in production
- [ ] Validate all environment variables
- [ ] Set up proper error handling

## 🚀 Post-Deployment

1. Test all functionality:
   - User registration/login
   - Forgot password flow
   - Auction creation/viewing
   - File uploads
   - Email sending

2. Update frontend URLs in backend if needed

3. Set up monitoring (optional):
   - Vercel Analytics
   - Error tracking (Sentry)

## 💡 Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS origins in backend
2. **Email not sending**: Check SMTP credentials
3. **File uploads failing**: Verify Cloudinary config
4. **Database connection**: Check MongoDB Atlas whitelist

### Environment Variables Not Working:
- Restart deployment after adding env vars
- Check variable names match exactly
- Some platforms require rebuild for env changes