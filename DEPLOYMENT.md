# Auction Platform - Production Deployment Guide

## 🚀 Vercel Deployment (Full Stack) - RECOMMENDED

### Deploy to Vercel (Frontend + Backend)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `Harshsbhosal96/Auction-plat`
4. Vercel will auto-detect your configuration from `vercel.json`
5. Add Environment Variables (both frontend and backend):

   ```
   # Backend Variables
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
   FRONTEND_URL=https://your-project.vercel.app

   # Frontend Variables
   VITE_API_URL=https://your-project.vercel.app
   ```

6. Click "Deploy"
7. Your full-stack app will be live!

### Alternative: Separate Frontend/Backend Deployment

#### Backend on Vercel, Frontend on Vercel

1. Create two separate Vercel projects
2. One for `backend/` directory
3. One for `frontend/` directory

#### Backend on Railway, Frontend on Vercel

1. Deploy backend to Railway
2. Deploy frontend to Vercel with `VITE_API_URL` pointing to Railway URL

## 🔧 Environment Variables Setup

### Vercel Environment Variables (Single Project)

For full-stack Vercel deployment, add these in your Vercel project settings:

```
# Backend Variables
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
FRONTEND_URL=https://your-project.vercel.app

# Frontend Variables
VITE_API_URL=https://your-project.vercel.app
```

### Separate Deployment Variables

**Backend (Vercel/Railway):**

```
MONGO_URI=mongodb+srv://...
JWT_SECRET_KEY=...
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=...
SMTP_PASSWORD=...
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Frontend (Vercel):**

```
VITE_API_URL=https://your-backend-domain.vercel.app
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
