# Auction Platform

A full-stack auction platform built using the MERN stack (MongoDB, Express.js, React, and Node.js). The platform allows users to create, bid on, and manage auctions in real-time with secure authentication and forgot password functionality.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Forgot Password**: Email-based password reset functionality
- **Auction Management**: Create auctions, set prices, and define bidding timelines
- **Real-Time Bidding**: Live updates for seamless bidding experience
- **Dashboard**: Personalized dashboards to track auctions and bids
- **File Uploads**: Cloudinary integration for profile images
- **Email Notifications**: SMTP-based email system
- **Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Cloudinary account
- Gmail account (for email functionality)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshsbhosal96/Auction-plat.git
   cd Auction-plat
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment templates
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

   # Fill in your values in both .env files
   ```

4. **Run the application**
   ```bash
   # Backend (from project root)
   npm run start

   # Frontend (from project root)
   npm run dev
   ```

## 🌐 Production Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects `vercel.json` configuration

2. **Environment Variables**
   Add these in Vercel project settings:
   ```
   # Backend
   MONGO_URI=your_mongodb_atlas_connection
   JWT_SECRET_KEY=your_secure_jwt_secret
   JWT_EXPIRE=7d
   COOKIE_EXPIRE=7
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SERVICE=gmail
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_gmail_app_password
   FRONTEND_URL=https://your-project.vercel.app

   # Frontend
   VITE_API_URL=https://your-project.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project.vercel.app`

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

```
Auction-app/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middlewares
│   ├── utils/          # Utilities (JWT, email)
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── store/      # Redux store & slices
│   │   └── utils/      # Helper functions
│   └── public/         # Static assets
├── vercel.json         # Vercel configuration
└── DEPLOYMENT.md       # Deployment guide
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FRONTEND_URL=https://your-domain.vercel.app
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com
```

## 📧 Email Setup

1. Enable 2FA on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the App Password (not your regular password) in SMTP_PASSWORD

## 🗄️ Database Setup

1. Create account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0`
5. Get connection string and add to MONGO_URI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For issues and questions, please open an issue on GitHub.
